import React,{Component} from 'react';
import Link from 'next/link'

class Promote extends React.Component{
  render(){
    return(
      <div className="max-w-screen-sm w-11/12 mx-auto my-6">
        <h1 className="sm:text-4xl text-3xl text-center p-2">Contact Us</h1>
        <p className="w-10/12 mx-auto p-2 text-center sm:text-xl text-md">For queries and promotion check below</p>
        <div className="w-full mx-auto bg-gray-200 my-8 p-4">
          <h3 className="w-10/12 mx-auto p-2 text-xl">Promote</h3>
          <p className="w-10/12 mx-auto p-2">To list your coin in promoted section or to advertise through banner please contact us on email provided below</p>
          <Link href="mailto:naikn8113@gmail.com?subject=Promote Coin"><a className="bg-gray-400 w-10/12 mx-auto block text-center p-2">Click here to promote</a></Link>
        </div>
        <div className="w-full bg-gray-200 my-12 p-4">
          <h3 className="w-10/12 mx-auto p-2 text-xl">Support</h3>
          <p className="w-10/12 mx-auto p-2">If you have any queries please click below and mail us your questions</p>
          <Link href="mailto:naikn8113@gmail.com"><a className="bg-gray-400 w-10/12 mx-auto block text-center p-2">Contact support</a></Link>
        </div>
      </div>
    )
  }
}

export default Promote;