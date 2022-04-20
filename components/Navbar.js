import {useState} from 'react';
import axios from 'axios';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react";
import useSWR from 'swr';
import Image from 'next/image'

const fetcher = async (url) => {
  const data = await axios.get(url).then((res)=>res.data.result);
  return data;
};

function Navbar(){
  const url = '/api/coins'
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen,setIsNavOpen] = useState(false);
  const [openMenu,setOpenMenu] = useState(false);
  const [openSearch,setOpenSearch] = useState(false);
  const [coinName,setCoinName] = useState("");
  const path = router.pathname;
  const toggleNav = ()=>{
    setIsNavOpen(!isNavOpen);
    setOpenSearch(false)
    setOpenMenu(false)
  }
  
  const { data,error } = useSWR(url,fetcher);
  
  const handleChange = (e)=>{
    setCoinName(e.target.value)
  }
  const items = (data || []);
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`);
    setOpenSearch(false)
    setOpenMenu(false)
  };
  const submitPage = ()=>{
    if(!session){
      return signIn();
    }
    router.push("/submit");
  }
    return(
      <nav className="flex justify-between w-full h-16 items-center shadow-xl z-50 bg-gradient-to-r from-[#28313b] to-[#485461] fixed top-0">
        <div className="absolute t-4 left-3"><Link href="/"><a className="text-3xl text-gray-100">CoinParadise</a></Link></div>
        <div></div>
        <ul className="flex justify-evenly w-4/12 hidden md:flex sm:mr-[20%]">
          <li><Link href="/"><a className="pcLinks">Home</a></Link></li>
          <li><Link href="/promote"><a className="pcLinks">Promote</a></Link></li>
          <li><Link href="/submit"><a className="pcLinks">Submit</a></Link></li>
        </ul>
        <div className={`md:hidden absolute top-4 right-5`} onClick={toggleNav}>
          <span className="text-3xl text-[#BCFD4C]">&#x2632;</span>
        </div>
        
        <div className={`absolute top-[29%] right-16 sm:top-[25%] sm:right-[5%]`}>
          <i className="fa-solid fa-circle-user text-2xl" onClick={()=>{
            setOpenMenu(!openMenu);
            if(openSearch){
              setOpenSearch(!openSearch);
            }
            }
          }></i>
        </div>
        <div className={`w-6/12 h-[10rem] bg-gradient-to-r from-[#677e98] to-[#8a98a8] flex flex-col absolute top-[82%] right-[16%] rounded-sm shadow-3xl transition-all duration-300 ease-in-out ${openMenu ? "block" : "hidden"} items-center justify-center text-white`}>
          {session && (<div className="flex flex-col text-center"><span className="mb-4">Welcome,{session.user.name}!</span><button className="border border-[#BCFD4C] rounded-md w-8/12 mx-auto p-1" onClick={()=>signOut()}>Sign Out</button></div>)}
          {!session && (<button className="border border-[#BCFD4C] rounded-md w-5/12 mx-auto p-1" onClick={()=>signIn()}>Sign In</button>)}
        </div>
       
        <div className={`absolute top-[29%] right-24 sm:top-[25%] sm:right-[10%]`}>
          <Image width={31} height={31} className="text-2xl" src="/icons8-search-30.svg" onClick={()=>{
            setOpenSearch(!openSearch);
            if(openMenu){
              setOpenMenu(!openMenu);
            }
            }
          } />
        </div>
        <div className={`w-8/12 h-auto bg-gradient-to-r from-[#677e98] to-[#8a98a8] flex flex-col absolute top-[82%] right-[16%] rounded-sm shadow-3xl transition-all duration-300 ease-in-out ${openSearch ? "block" : "hidden"}`}>
          <input className="border w-full p-2 rounded-sm placeholder-gray-500 text-gray-500 outline-0 bg-gray-300" type="search" name="search" value={coinName} placeholder="search coin" onChange={handleChange} />
          <div className="overflow-scroll">
          {items.length !=0 && items.filter((val)=>{
            if(coinName == ""){
              return ""
            }else if(val.name.toLowerCase().includes(coinName.toLowerCase())){
              return val;
            }
          }).map((el)=>(<div key={el._id} className="w-11/12 mx-auto my-4 text-lg text-white" onClick={()=>viewCoinInfo(el._id)}>{el.name}</div>))}
          </div>
        </div>
        
        <ul className={`w-full z-50 fixed top-0 h-screen md:hidden bg-gradient-to-r from-[#28313b] to-[#485461] text-white text-center text-2xl ${isNavOpen? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
          <li className="absolute top-4 left-3">
            <Link href="/">
              <a className="text-3xl text-gray-100">
                CoinParadise
              </a>
            </Link>
          </li>
          <li className="absolute top-4 right-5">
            <span className="text-3xl text-[#BCFD4C]" onClick={toggleNav}>&#x2715;</span>
          </li>
          <li className="mt-[40%] mb-8" onClick={toggleNav}><Link href="/"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 ${path == "/" ? "shadow-[0_15px_4px_-15px_#BCFD4C]" : ""}`}>Home</a></Link></li>
          <li className="mb-8" onClick={toggleNav}><a onClick={submitPage} className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 ${path == "/submit" ? "shadow-[0_15px_4px_-15px_#BCFD4C]" : ""}`}>Submit</a></li>
          <li className="mb-8" onClick={toggleNav}><Link href="/promote"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 ${path == "/promote" ? "shadow-[0_15px_4px_-15px_#BCFD4C]" : ""}`}>Promote</a></Link></li>
        </ul>
      </nav>
    )
}

export default Navbar;