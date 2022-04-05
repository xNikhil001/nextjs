import axios from "axios";
import {useState} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

const Skeleton = dynamic(()=>import('./Skeleton.js'))

function NewCoins(){
  const [perPage,setPerPage] = useState(2);
  const router = useRouter();
  const url = `https://cp0099.herokuapp.com/api/coins/new`;
  const voteURI = `https://cp0099.herokuapp.com/api/coins`
  const fetcher = async (url) => {
    const data = await axios.get(url).then((res)=>res.data.result);
    return data;
  };
  
  const { data } = useSWR('https://cp0099.herokuapp.com/api/coins/new',fetcher);
  
  if(!data){
    const skeletonData = [...Array(5)].map((el,index)=><Skeleton key={index} />)
    return skeletonData;
  }
  
  const voteBtn = async (ID)=>{
    const res = await axios.patch(voteURI,{ID});
  }
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`)
  }
  const len = (data || []).length;
  const arr = (data || []).slice(0,perPage);
  const displayData = arr.map((el)=><div className="max-w-[600px] w-11/12 mx-auto my-4 flex justify-between items-center bg-[#303030] p-3 shadow-3xl rounded-md" key={Math.random()} onClick={()=>viewCoinInfo(el._id)}>
      <img src={el.logo} width="37px" height="37px" alt="LOGO" className="rounded-sm"/>
      <span className="flex flex-col w-5/12">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex">{el.mcap}</span>
      <button className={`w-1/5 py-1 border border-gray-500 rounded-md text-md text-gray-300`} onClick={(e)=>{e.stopPropagation();voteBtn(el._id)}}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      {displayData}
      <i onClick={()=>{setPerPage(perPage += 2)}} className={`w-full text-3xl text-center animate-bounce fa-solid fa-arrow-down ${perPage >= len ? "hidden" : ""}`}></i>
    </>
  )
}

export default NewCoins;