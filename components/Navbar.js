import Image from 'next/image';
import {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/router';

function Navbar(){
  const router = useRouter();
  const [isNavOpen,setIsNavOpen] = useState(false);
  const path = router.pathname;
  const toggleNav = ()=>{
    setIsNavOpen(!isNavOpen);
  }
    return(
      <nav className="flex justify-between w-full h-16 items-center shadow-lg z-50 bg-white fixed top-0">
        <div className="mt-4 ml-3"><Link href="/"><a><Image src="/logo2.png" alt="LOGO" width={220} height={50} /></a></Link></div>
        <ul className="flex justify-evenly w-4/12 hidden md:flex sm:mr-12">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/promote"><a>Promote</a></Link></li>
          <li><Link href="/submit"><a>Submit</a></Link></li>
        </ul>
        <div className={`md:hidden absolute top-4 right-7 flex flex-col`} onClick={toggleNav}>
          <span className="text-3xl text-black">&#x2632;</span>
        </div>
        <ul className={`w-full z-50 fixed top-0 h-screen md:hidden bg-white text-black text-center ${isNavOpen? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
          <li className="absolute top-3 left-2">
            <div><Link href="/"><a><Image src="/logo2.png" alt="LOGO" width={220} height={50} /></a></Link></div>
          </li>
          <li className="absolute top-4 right-7">
            <span className="text-3xl" onClick={toggleNav}>&#x2715;</span>
          </li>
          <li className="mt-[35%] pb-6  font-black" onClick={toggleNav}><Link href="/"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 font-dongle text-xl p-1 ${path == "/" ? "bg-gray-800 text-white" : ""}`}>Home</a></Link></li>
          <li className="py-6 font-black" onClick={toggleNav}><Link href="/promote"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 font-dongle text-xl p-1 ${path == "/promote" ? "bg-gray-800 text-white" : ""}`}>Promote</a></Link></li>
          <li className="py-6 font-black" onClick={toggleNav}><Link href="/submit"><a className={`hover:text-neutral-500 rounded-md hover:transition-all duration-300 font-dongle text-xl p-1 ${path == "/submit" ? "bg-gray-800 text-white" : ""}`}>Submit</a></Link></li>
        </ul>
      </nav>
    )
}

export default Navbar;