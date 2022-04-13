import axios from "axios";
import {useRouter} from 'next/router';

function Promoted({coins}){
  const router = useRouter();
  const voteBtn = async (ID)=>{
    const url = `https://cp0099.herokuapp.com/api/coins`;
    const res = await axios.patch(url,{ID});
  }
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`)
  }
  coins.sort((a, b) => {
    return b.votes - a.votes;
  })

  const data = coins.map((el)=><div className="max-w-[600px] w-11/12 mx-auto my-4 flex justify-between rounded-md items-center bg-[#303030] p-3 shadow-3xl" key={Math.random()} onClick={()=>viewCoinInfo(el._id)}>
      <img src={el.logo} width="37px" height="37px" className="rounded-sm"/>
      <span className="flex flex-col w-5/12">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex">{el.marketcap}</span>
      <button className={`w-1/5 py-1 border border-gray-500 rounded-md text-md text-gray-300`} onClick={(e)=>{e.stopPropagation();voteBtn(el._id)}}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      <h1 className="max-w-[600px] mt-12 text-xl mx-auto w-11/12">Promoted Coins</h1>
      {data}
    </>
  )
}

export default Promoted;