import axios from "axios";
import {useRouter} from 'next/router';
import {useStore} from '../zustand';
import {useState} from 'react';
import useSWR from 'swr';
import { useSession } from "next-auth/react";

function Promoted({coins}){
  const url = "https://cp0099.herokuapp.com/api/coins/promoted";
  const voteURI = `http://localhost:8000/api/coins`;
  const {data:session} = useSession();
  const router = useRouter();
  const [isBtnActive,setIsBtnActive] = useState(false);
  const setSignInToast = useStore(state => state.setSignInToast)
  // VOTE FUNCTION
  const voteBtn = async (ID)=>{
    // DISABLE BUTTON
    setIsBtnActive(true);
    setTimeout(function() {
      setIsBtnActive(false)
    }, 1000);
    // CHECK IF USER LOGGED IN
    if(!session){
      setSignInToast();
      return;
    }else{
      const uid = session.user.uid;
      const userData = {
        ID: ID,
        uid: uid
      }
      const res = await axios.patch(voteURI,userData);
    }
  }
  // COININFO PAGE NAVIGATION
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`)
  }

  const renderData = coins.map((el)=><div className="max-w-[600px] w-11/12 mx-auto my-4 flex justify-between rounded-md items-center bg-[#303030] p-3 shadow-3xl" key={el._id} onClick={()=>viewCoinInfo(el._id)}>
      <img src={el.logo} width="37px" height="37px" className="rounded-sm"/>
      <span className="flex flex-col w-5/12">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex">{el.marketcap}</span>
      <button disabled={isBtnActive} className={`w-1/5 py-1 border border-gray-500 rounded-md text-md text-gray-300`} onClick={(e)=>{e.stopPropagation();voteBtn(el._id)}}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      <h1 className="max-w-[600px] mt-12 text-xl mx-auto w-11/12">Promoted Coins</h1>
      {renderData}
    </>
  )
}

export default Promoted;