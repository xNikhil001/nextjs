import axios from "axios";
import {useState} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import useSWR,{useSWRConfig} from 'swr';
import {useStore} from '../zustand';
import { useSession } from "next-auth/react";
import moment from 'moment';
import converter from '../helpers/converter.js'

const Skeleton = dynamic(()=>import('./Skeleton.js'))
const options = {
  headers: {
    'verify-key': 'check'
  }
}
const fetcher = async (url) => {
    const data = await axios.get(url,options).then((res)=>res.data.result);
    return data;
  };
  
function Promoted(){
  const [perPage,setPerPage] = useState(2);
  const router = useRouter();
  const { data:session } = useSession();
  // url = `https://cp0099.herokuapp.com/api/coins/promoted`;
  const url = `http://localhost:8000/api/coins`;
  const voteURI = `https://cp0099.herokuapp.com/api/coins`
  //const {mutate} = useSWRConfig();
  const setSignInToast = useStore(state => state.setSignInToast)
  const [isBtnActive,setIsBtnActive] = useState(false);
  
  const { data,error,mutate } = useSWR(url,fetcher);
  
  if(!data){
    const skeletonData = [...Array(5)].map((el,index)=><Skeleton key={index} />)
    return skeletonData;
  }
  
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
      const options = {
        rollbackOnError: true
      }
      //mutate(data)
      const res = await axios.patch(voteURI,userData);
      mutate(data)
    }
  }
  
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`);
  };
  
  const arr = (data || [])
  //console.log(arr);
  const displayData = arr.map((el)=><div className="max-w-[800px] w-11/12 mx-auto my-4 flex justify-between items-center bg-gradient-to-r from-[#5b6467] to-[#8b939a] p-3 shadow-3xl rounded-md" key={el._id} onClick={()=>viewCoinInfo(el._id)}>
      <img src={el.logo} width="37px" height="37px" alt="LOGO" className="rounded-sm"/>
      <span className="flex flex-col w-5/12 sm:w-3/12">{el.symbol}<span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex w-2/12">{converter.format(el.marketcap)}</span>
      <span className="hidden sm:flex w-2/12">{moment(el.release.split('/').reverse().join(""), "YYYYMMDD").fromNow()}</span>
      <button className={`w-1/5 sm:w-1/12 py-1 border border-gray-500 rounded-md text-md text-gray-300`} onClick={(e)=>{e.stopPropagation();voteBtn(el._id)}}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      {displayData}
    </>
  )
}

export default Promoted;