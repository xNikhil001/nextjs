import Image from 'next/image'
import React,{Component} from 'react'
import Link from 'next/link'

class Navbar extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isNavOpen: false
    }
  }
  toggleNav = ()=>{
    this.setState({
      isNavOpen: !this.state.isNavOpen
    })
  }
  render(){
    return(
      <nav className="flex justify-between w-full h-16 items-center shadow-lg z-50">
        <div className="ml-4 text-3xl font-ceviche sm:ml-12"><Link href="/"><a>CoinParadise</a></Link></div>
        <ul className="flex justify-evenly w-4/12 hidden md:flex sm:mr-12">
          <li><Link href="/"><a>Home</a></Link></li>
          <li><Link href="/promote"><a>Promote</a></Link></li>
          <li><Link href="/submit"><a>Submit</a></Link></li>
        </ul>
        <div className="md:hidden absolute top-5 right-4" onClick={this.toggleNav}><Image src="/menu.svg" alt="img" width={25} height={25} /></div>
        <ul className={`w-7/12 z-50 bg-black shadow-inner text-white fixed top-0 h-screen md:hidden ${this.state.isNavOpen? "translate-x-0" : "-translate-x-full"} transition-all duration-300`}>
          <li className="absolute text-2xl font-black top-[1.7%] right-4" onClick={this.toggleNav}><span>&#10007;</span></li>
          <li className="py-[17px] px-6 font-black" onClick={this.toggleNav}><Link href="/"><a className="p-2 hover:text-neutral-500 rounded-md hover:transition-all duration-300 font-dongle text-xl">Home</a></Link></li>
          <li className="py-5 px-6 font-black" onClick={this.toggleNav}><Link href="/promote"><a className="p-2 hover:text-neutral-500 rounded-md hover:transition-all duration-300 font-dongle text-xl">Promote</a></Link></li>
          <li className="py-5 px-6 font-black" onClick={this.toggleNav}><Link href="/submit"><a className="p-2 hover:text-neutral-500 rounded-md hover:transition-all duration-300 font-dongle text-xl">Submit</a></Link></li>
        </ul>
      </nav>
    )
  }
}

export default Navbar;