import React,{Component} from 'react';
import Link from 'next/link'

class Promote extends React.Component{
  render(){
    return(
      <div className="max-w-screen-sm w-11/12 mx-auto my-6">
        <h1 className="sm:text-4xl text-3xl text-center p-2">Contact Us</h1>
        <p className="w-10/12 mx-auto p-2 text-center sm:text-xl text-lg">For queries and promotion check below</p>
        <div className="max-w-[400px] mx-auto">
          <div className="w-full mx-auto bg-[#303030] my-8 p-4 rounded-sm h-[240px] shadow-3xl">
          <h3 className="w-10/12 mx-auto p-2 text-xl">Promote</h3>
          <p className="w-10/12 mx-auto p-2">To list your coin in promoted section or to advertise through banner please contact us on email provided below</p>
          <Link href="mailto:naikn8113@gmail.com?subject=Promote Coin"><a className="shadow-3xl bg-[#BCFD4C] w-10/12 mx-auto block text-center p-2 rounded-md hover:bg-gray-400 text-black hover:text-black cursor-pointer">Promote</a></Link>
        </div>
          <div className="w-full bg-[#303030] my-12 p-4 rounded-sm shadow-3xl h-[240px]">
          <h3 className="w-10/12 mx-auto p-2 text-xl">Support</h3>
          <p className="w-10/12 mx-auto p-2">If you have any queries regarding this site please click below and mail us your questions</p>
          <Link href="mailto:naikn8113@gmail.com"><a className="shadow-3xl bg-[#BCFD4C] w-10/12 mx-auto block text-center p-2 rounded-md sm:mt-6 hover:bg-gray-400 text-black hover:text-black cursor-pointer">Contact support</a></Link>
        </div>
        </div>
      </div>
    )
  }
}

export default Promote;