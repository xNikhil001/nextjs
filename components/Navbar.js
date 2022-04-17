import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar(){
  const { data: session } = useSession();
  const router = useRouter();
  const [isNavOpen,setIsNavOpen] = useState(false);
  const [openMenu,setOpenMenu] = useState(false);
  const path = router.pathname;
  const toggleNav = ()=>{
    setIsNavOpen(!isNavOpen);
  }
    return(
      <nav className="flex justify-between w-full h-16 items-center shadow-3xl z-50 bg-[#6E6E6E] fixed top-0">
        <div className="absolute t-4 left-3"><Link href="/"><a className="text-3xl text-[#BCFD4C]">CoinParadise</a></Link></div>
        <div></div>
        <ul className="flex justify-evenly w-4/12 hidden md:flex sm:mr-12">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/promote"><a>Promote</a></Link></li>
          <li><Link href="/submit"><a>Submit</a></Link></li>
        </ul>
        <div className={`md:hidden absolute top-4 right-5`} onClick={toggleNav}>
          <span className="text-3xl text-[#BCFD4C]">&#x2632;</span>
        </div>
        <div className={`md:hidden absolute top-[26%] right-16`}>
          <i className="fa-solid fa-circle-user text-3xl" onClick={()=>setOpenMenu(!openMenu)}></i>
        </div>
        <div className={`w-6/12 h-[10rem] bg-[#999999] flex flex-col absolute top-[82%] right-[16%] rounded-sm shadow-3xl ${openMenu ? "block" : "hidden"} items-center justify-center`}>
          {session && (<div className="flex flex-col text-center"><span className="mb-4">Welcome,{session.user.name}!</span><button className="border border-[#BCFD4C] rounded-md w-8/12 mx-auto" onClick={()=>signOut()}>Sign Out</button></div>)}
          {!session && (<button className="border border-[#BCFD4C] rounded-md w-5/12 mx-auto" onClick={()=>signIn()}>Sign In</button>)}
        </div>
        <ul className={`w-full z-50 fixed top-0 h-screen md:hidden bg-black text-white text-center text-2xl ${isNavOpen? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
          <li className="absolute top-4 left-5">
            <Link href="/">
              <a className="text-3xl text-[#97F049]">
                CoinParadise
              </a>
            </Link>
          </li>
          <li className="absolute top-4 right-7">
            <span className="text-3xl text-[#97F049]" onClick={toggleNav}>&#x2715;</span>
          </li>
          <li className="mt-[40%] mb-8" onClick={toggleNav}><Link href="/"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 ${path == "/" ? "shadow-[0_15px_4px_-15px_#97F049]" : ""}`}>Home</a></Link></li>
          <li className="mb-8" onClick={toggleNav}><Link href="/submit"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 ${path == "/submit" ? "shadow-[0_15px_4px_-15px_#97F049]" : ""}`}>Submit</a></Link></li>
          <li className="mb-8" onClick={toggleNav}><Link href="/promote"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 ${path == "/promote" ? "shadow-[0_15px_4px_-15px_#97F049]" : ""}`}>Promote</a></Link></li>
        </ul>
      </nav>
    )
}

export default Navbar;