"use strict";
import {useState} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import { useSession,signIn } from "next-auth/react";
import converter from '../helpers/converter.js'
import checkDate from '../helpers/time.js'
  
function Promoted({arr}){
  const router = useRouter();
  const { data:session } = useSession();
  const url = 'https://cp0099.herokuapp.com/api/coins/promoted';
  const voteURI = 'https://cp0099.herokuapp.com/api/coins';
  //const voteURI = 'http://localhost:8000/api/coins'; 
 
  const voteBtn = async (ID)=>{
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
      fn()
    }
  };
  
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`);
  };
  
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