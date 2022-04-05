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
      <nav className="flex justify-between w-full h-16 items-center shadow-3xl z-50 bg-[#6E6E6E] fixed top-0">
        <div className="absolute t-4 left-3"><Link href="/"><a className="text-3xl text-[#BCFD4C]">CoinParadise</a></Link></div>
        <div></div>
        <ul className="flex justify-evenly w-4/12 hidden md:flex sm:mr-12">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/promote"><a>Promote</a></Link></li>
          <li><Link href="/submit"><a>Submit</a></Link></li>
        </ul>
        <div className={`md:hidden absolute top-4 right-5 flex flex-col`} onClick={toggleNav}>
          <span className="text-3xl text-[#BCFD4C]">&#x2632;</span>
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