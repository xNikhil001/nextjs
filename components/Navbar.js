import {useState,useEffect} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useSession,signIn,signOut } from "next-auth/react";
import useSWR from 'swr';

const fetcher = async (url) => {
  const data = await fetch(url).then((data)=>data.json())
  return data.result;
};

function Navbar(){
  const url = 'https://cp0099.herokuapp.com/api/coins';
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen,setIsNavOpen] = useState(false);
  const [isSearchOpen,setIsSearchOpen] = useState(false);
  const [isScroll,setIsScroll] = useState(false);
  const [coinName,setCoinName] = useState("");
  const { data,error } = useSWR(url,fetcher);
  
  useEffect(()=>{
    document.addEventListener("scroll",(e)=>{
      const bgDrop = window.scrollY > 20? true : false;
      setIsScroll(bgDrop);
    });
  },[]);
  
  const mediaLinks = {
    instagram: "https://instagram.com/coin_paradise?igshid=YmMyMTA2M2Y=",
    twitter: "https://twitter.com/_CoinParadise_?t=ZusSCXHemN5n3ga7TboJ5Q&s=08",
    telegram: "https://t.me/coinparadise"
  }
  const path = router.pathname;
  const toggleNav = ()=>{
    setIsNavOpen(!isNavOpen);
    if(isSearchOpen) setIsSearchOpen(false)
  }
  const toggleSearch = ()=>{
    setIsSearchOpen(!isSearchOpen);
    if(isNavOpen) setIsNavOpen(false)
    if(!isSearchOpen) setCoinName("")
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
    setIsSearchOpen(false)
    setCoinName("")
  }
    return(
      <header className={`flex flex-col w-full fixed top-0 items-center z-50 bg-white shadow-6xl`}>
       <nav className="h-12 flex items-center justify-between w-11/12 mx-auto">
         
         <div className="text-2xl">
           <Link href="/"><a>COINPARADISE</a></Link>
         </div>
         
         <div className="flex">
         <div className="mr-8">
           {!isSearchOpen && <img src="/search.svg" width="30px"  height="30px" onClick={toggleSearch}
           />}
           {isSearchOpen && <img src="/x.svg" width="20px"  height="20px" onClick={toggleSearch}
             className="mr-[6px]"
           />}
         </div>
         
         <div className="w-[30px] relative" onClick={toggleNav}>
           <div className={`w-11/12 h-[3px] bg-[#7e0fff] absolute top-1/2 left-1/2 ${isNavOpen ? 'transform -translate-x-1/2 -translate-y-1/2 -rotate-[45deg]' : 'transform -translate-x-1/2 -translate-y-[12px]'} transition-all duration-300`}>
           </div>
           <div className={`w-11/12 h-[3px] bg-[#7e0fff] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isNavOpen? 'w-0' : '' } transition-all duration-300`}>
           </div>
           <div className={`w-11/12 h-[3px] bg-[#7e0fff] absolute top-1/2 left-1/2 ${isNavOpen? 'transform -translate-x-1/2 -translate-y-1/2 rotate-[45deg]' : 'transform -translate-x-1/2 translate-y-[8px]' } transition-all duration-300`}>
           </div>
         </div>
         </div>
       </nav>
       { isNavOpen && (<ul className="w-full h-screen bg-white shadow-4xl text-center text-xl">
         <li className={`p-4 w-4/12 mx-auto mt-[25%] ${path == '/'? 'text-[#7e0fff]' : ''}`}><Link href="/"><a onClick={toggleNav}>Home</a></Link></li>
         <li className={`p-4 w-4/12 mx-auto ${path == '/submit'? 'text-[#7e0fff]' : ''}`}><Link href="/submit"><a onClick={toggleNav}>Submit</a></Link></li>
         <li className={`p-4 w-4/12 mx-auto ${path == '/promote'? 'text-[#7e0fff]' : ''}`}><Link href="/promote"><a onClick={toggleNav}>Promote</a></Link></li>
       </ul>)}
       
       { isSearchOpen && (<div className="w-full h-screen bg-white shadow-4xl text-center text-gray-600">
       <input type="search" placeholder="search coin..." className="bg-zinc-100 p-2 w-11/12 mt-4 rounded-sm outline-0 border border-gray-200" value={coinName} onChange={handleChange}/>
       <div className="max-h-[500px] h-auto w-11/12 bg-zinc-100 mx-auto overflow-scroll rounded-b-sm">
         {items.length !=0 && items.filter((val)=>{
            if(coinName == ""){
              return ""
            }else if(val.name.toLowerCase().includes(coinName.toLowerCase())){
              return val;
            }
          }).map((el)=>(<div key={el._id} className="text-black py-3 px-2 text-left text-gray-600" onClick={()=>viewCoinInfo(el._id)}>{el.name}</div>))}
       </div>
       </div>)}
      </header>
    )
}

export default Navbar;