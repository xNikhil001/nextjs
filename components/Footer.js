import React , {Component} from 'react'
import Image from 'next/image'

class Footer extends React.Component{
  render(){
    const links = ['Terms & Conditions','Disclaimer']
    return(
      <>
      <footer className="w-full mt-8 h-44 text-center">
        <div className="flex sm:w-4/12 w-9/12 justify-evenly mx-auto p-6">
          <Image src="/instagram.svg" alt="img" width={40} height={40} />
          <Image src="/twitter.svg" alt="img" width={40} height={40} />
          <Image src="/telegram.svg" alt="img" width={40} height={40} />
        </div>
        <ul className="my-4">
        {links.map(el => <li key={el}>{el}</li>)}
        </ul>
        <span className="text-xs p-2">Copyright &copy; 2021 CoinParadise. All rights reserved</span>
      </footer>
      </>
    )
  }
}

export default Footer;