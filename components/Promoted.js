import Image from 'next/image'
import {useState} from 'react'
function Promoted(){
  const arr = [{
    name: "Bitcoin",
    symbol: "BTC",
    mcap: "$577,567,888",
    votes: "1"
  },{
    name: "Bitcoin",
    symbol: "BTC",
    mcap: "$577,567,888",
    votes: "1"
  },{
    name: "Bitcoin",
    symbol: "BTC",
    mcap: "$577,567,888",
    votes: "699"
  },{
    name: "Bitcoin",
    symbol: "BTC",
    mcap: "$577,567,888",
    votes: "1"
  },{
    name: "Bitcoin",
    symbol: "BTC",
    mcap: "$577,567,888",
    votes: "6999"
  }]
  const data = arr.map((el)=><div className="max-w-[600px] w-11/12 mx-auto my-4 flex justify-between items-center bg-gray-100 p-3" key={Math.random()}>
      <Image src="/instagram.svg" width={35} height={35}/>
      <span className="flex flex-col -ml-[40%] sm:-ml-[10%]">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex">{el.mcap}</span>
      <button className={`w-1/5 py-1 border border-emerald-500 rounded-md text-md text-gray-700`}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      <h1 className="max-w-[600px] mt-12 text-xl mx-auto w-11/12">Promoted coins</h1>
      {data}
    </>
  )
}

export default Promoted;