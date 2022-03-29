import Image from 'next/image';
import axios from "axios";

function Promoted({coins}){
  const voteBtn = async (ID)=>{
    const url = `https://cp0099.herokuapp.com/api/coins/${ID}`;
    const res = await axios.patch(url,{});
  }
  const data = coins.map((el)=><div className="max-w-[600px] w-11/12 mx-auto my-4 flex justify-between items-center bg-gray-100 p-3" key={Math.random()}>
      <Image src="/instagram.svg" width={35} height={35}/>
      <span className="flex flex-col -ml-[40%] sm:-ml-[10%]">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex">{el.mcap}</span>
      <button className={`w-1/5 py-1 border border-emerald-500 rounded-md text-md text-gray-700`} onClick={()=>voteBtn(el._id)}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      <h1 className="max-w-[600px] mt-12 text-xl mx-auto w-11/12">Promoted coins</h1>
      {data}
    </>
  )
}

export default Promoted;