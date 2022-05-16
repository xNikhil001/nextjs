import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useSession,signIn,signOut } from "next-auth/react";
import axios from 'axios';
import useSWR from 'swr';

const fetcher = async (url) => {
  const data = await axios.get(url).then((res)=>res.data.result);
  return data;
};

function Navbar(){
  const url = '/api/coins';
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen,setIsNavOpen] = useState(false);
  const [coinName,setCoinName] = useState("");
  const { data,error } = useSWR(url,fetcher);
  const mediaLinks = {
    instagram: "https://instagram.com/coin_paradise?igshid=YmMyMTA2M2Y=",
    twitter: "https://twitter.com/_CoinParadise_?t=ZusSCXHemN5n3ga7TboJ5Q&s=08",
    telegram: "https://t.me/coinparadise"
  }
  const path = router.pathname;
  const toggleNav = ()=>{
    setIsNavOpen(!isNavOpen);
  }
  const handleChange = (e)=>{
    setCoinName(e.target.value)
  }
  const items = (data || []);
  const submitPage = ()=>{
    if(!session){
      return signIn();
    }
    router.push("/submit");
  }
  const viewCoinInfo = (ID) =>{
    router.push(`/coininfo/${ID}`)
    setIsNavOpen(!isNavOpen)
    setCoinName("")
  }
    return(
      <nav className="flex justify-between w-full h-16 items-center shadow-xl z-50 bg-[#232931] fixed top-0">
        <div className="absolute top-2 left-2 xl:left-[10%]"><Link href="/"><a><img src="/final.png" width="220px" height="35px" alt="LOGO" /></a></Link></div>
        <div></div>
        <ul className="flex items-center hidden md:flex sm:mr-[5%]">
          <li className="absolute top-3 right-[30%]">
            <input type="search" placeholder="search coin..." className="w-6/12 block outline-0 rounded-md p-2" value={coinName} onChange={handleChange}/>
            <div className="max-h-[150px] overflow-scroll bg-[#2a323c] rounded-md w-6/12">
          {items.length !=0 && items.filter((val)=>{
            if(coinName == ""){
              return ""
            }else if(val.name.toLowerCase().includes(coinName.toLowerCase())){
              return val;
            }
          }).map((el)=>(<div key={el._id} className="w-11/12 mx-auto my-4 text-lg text-white" onClick={()=>viewCoinInfo(el._id)}>{el.name}</div>))}
          </div>
          </li>
          <li><Link href="/submit"><a className={`pcLinks ${path == "/" ? 'text-[#a0dce6]':''} transition ease-in duration-150`}>Home</a></Link></li>
          <li><Link href="/promote"><a className={`pcLinks ${path == "/promote" ? 'text-[#a0dce6]':''} transition ease-in duration-150`}>Promote</a></Link></li>
          <li><Link href="/submit"><a className={`pcLinks ${path == "/submit" ? 'text-[#a0dce6]':''} transition ease-in duration-150`} onClick={submitPage}>Submit</a></Link></li>
          <li>{session? (<a className="pcLinks p-1 rounded-md font-black bg-[#a0dce6] text-black hover:bg-[#232931] hover:border-[2px] hover:border-[#a0dce6] hover:text-gray-300 transition ease-in duration-150" onClick={()=>signOut()}>Sign Out</a>) : (<a className="pcLinks p-1 rounded-md font-black bg-[#a0dce6] text-black hover:bg-[#232931] hover:border-[2px] hover:border-[#a0dce6] hover:text-gray-300 transition ease-in duration-150" onClick={()=>signIn()}>Sign In</a>)}</li>
        </ul>
        <div className={`md:hidden absolute top-4 right-5`} onClick={toggleNav}>
          <span className="text-3xl text-[#a0dce6]">&#x2632;</span>
        </div>
        
        <ul className={`w-[70%] shadow-3xl z-50 fixed top-0 h-screen md:hidden bg-[#232931] text-gray-300 text-xl ${isNavOpen? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
          <li className="absolute top-4 right-5">
            <span className="text-3xl text-[#a0dce6]" onClick={toggleNav}>&#x2715;</span>
          </li>
          <li className="mt-[40%] mb-8 pb-4 border-b border-gray-500 w-11/12 mx-auto">
            <input type="search" placeholder="search coin..." className="w-full outline-0 mx-auto rounded-md p-2 block" value={coinName} onChange={handleChange}/>
            <div className="max-h-[150px] overflow-scroll bg-[#2a323c] rounded-md">
          {items.length !=0 && items.filter((val)=>{
            if(coinName == ""){
              return ""
            }else if(val.name.toLowerCase().includes(coinName.toLowerCase())){
              return val;
            }
          }).map((el)=>(<div key={el._id} className="w-11/12 mx-auto my-4 text-lg text-white" onClick={()=>viewCoinInfo(el._id)}>{el.name}</div>))}
          </div>
          </li>
          <li className="mb-8 pb-4 border-b border-gray-500 w-11/12 mx-auto" onClick={toggleNav}><Link href="/"><a className={`hover:transition-all duration-300 px-1 ${path == "/" ? 'text-[#a0dce6]':''}`}>Home</a></Link></li>
          <li className="mb-8 pb-4 border-b border-gray-500 w-11/12 mx-auto" onClick={toggleNav}><a onClick={submitPage} className={`hover:transition-all duration-300 px-1 ${path == "/submit" ? 'text-[#a0dce6]':''}`}>Submit</a></li>
          <li className="mb-8 pb-4 border-b border-gray-500 w-11/12 mx-auto" onClick={toggleNav}><Link href="/promote"><a className={`hover:transition-all duration-300 px-1 ${path == "/promote" ? 'text-[#a0dce6]':''}`}>Promote</a></Link></li>
          <li>{session? (<a className="pcLinks p-2 font-black block w-11/12 text-center mx-auto rounded-md transition ease-in duration-150 text-md bg-[#a0dce6] text-black hover:bg-[#232931] hover:border-[2px] hover:border-[#a0dce6] hover:text-gray-300" onClick={()=>signOut()}>Sign Out</a>) : (<a className="pcLinks p-2 block w-11/12 font-black text-center mx-auto rounded-md transition ease-in duration-150 text-md bg-[#a0dce6] text-black hover:bg-[#232931] hover:border-[2px] hover:border-[#a0dce6] hover:text-gray-300" onClick={()=>signIn()}>Sign In</a>)}</li>
          <li className="flex justify-between mt-[15%] w-6/12 ml-[14px]">
            <Link href={mediaLinks.instagram}><a><img src="/instagram.svg" alt="img" width="35px" height="35px" /></a></Link>
            <Link href={mediaLinks.twitter}><a><img src="/twitter.svg" alt="img" width="35px" height="35px" /></a></Link>
            <Link href={mediaLinks.telegram}><a><img src="/telegram.svg" alt="img" width="35px" height="35px" /></a></Link>
          </li>
        </ul>
      </nav>
    )
}

export default Navbar;