"use strict";
import {useState} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useSession,signIn } from "next-auth/react";
import converter from '../helpers/converter.js'
import checkDate from '../helpers/time.js'

const fetcher = async (url) => {
  const data = await fetch(url).then((data)=>data.json())
  return data.result;
};
  
function Promoted(){
  const router = useRouter();
  const { data:session } = useSession();
  const url = 'https://cp0099.herokuapp.com/api/coins/promoted';
  const voteURI = 'https://cp0099.herokuapp.com/api/coins';
  
  const [isBtnActive,setIsBtnActive] = useState(false);
  
  const { data,error,mutate } = useSWR(url,fetcher);
  
  if(!data){
    return <h1>Loading...</h1>;
  }
  
  const voteBtn = async (ID)=>{
    mutate([...data],false);
    // CHECK IF USER LOGGED IN
    if(!session){
      signIn();
      return;
    }else{
      const uid = session.user.uid;
      const userData = {
        ID: ID,
        uid: uid
      };
      const res = await fetch(voteURI,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(userData)
      }).then((data)=>data.json())
      
      if(!res.success){
        alert("Vote already exists")
      }
      mutate([...data]);
    }
  };
  
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`);
  };
  
  const arr = (data || [])
  const displayData = arr.map((el)=><div className="max-w-[1000px] w-11/12 mx-auto my-0 flex justify-between items-center backdrop-blur-sm bg-[#2a323c]/50 shadow-3xl p-3 rounded-md" key={el._id} onClick={()=>viewCoinInfo(el._id)}>
      <img src={el.logo} width="37px" height="37px" alt="LOGO" className="rounded-sm"/>
      <span className="flex flex-col w-5/12 sm:w-3/12">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex w-2/12">{converter.format(el.marketcap)}</span>
      <span className="hidden sm:flex w-2/12">{checkDate(el.release)}</span>
      <button className={`w-1/5 sm:w-1/12 py-1 border-[1px] border-[#a0dce6] rounded-md text-md text-gray-300`} onClick={(e)=>{e.stopPropagation();voteBtn(el._id)}}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      {displayData}
    </>
  )
}

export default Promoted;