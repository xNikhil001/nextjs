import axios from "axios";
import {useState} from 'react';
import {useRouter} from 'next/router';
import dynamic from 'next/dynamic';
import useSWR from 'swr';
import { useSession,signIn } from "next-auth/react";
import moment from 'moment';
import converter from '../helpers/converter.js'
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Skeleton = dynamic(()=>import('./Skeleton.js'))

const fetcher = async (url) => {
    const data = await axios.get(url).then((res)=>res.data.result);
    return data;
  };
  
function AllTimeHigh(){
  const [perPage,setPerPage] = useState(50);
  const router = useRouter();
  const { data:session } = useSession();
  const url = 'https://cp0099.herokuapp.com/api/coins/ath';
  const voteURI = 'https://cp0099.herokuapp.com/api/coins';
  const [isBtnActive,setIsBtnActive] = useState(false);
  const voteInfo = () => toast.info('You can vote once 24 hours!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
  const { data,error,mutate } = useSWR(url,fetcher);
  
  if(!data){
    const skeletonData = [...Array(10)].map((el,index)=><Skeleton key={index} />)
    return skeletonData;
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
      const res = await axios.patch(voteURI,userData);
      if(!res.data.success){
        voteInfo();
      }
      //mutate(data)
      mutate([...data]);
    }
  };
  
  const viewCoinInfo = (ID)=>{
    router.push(`/coininfo/${ID}`);
  };
  //const data1 = (data || []);
  const len = (data || []).length;
  const arr = (data || []).slice(0,perPage);
  //console.log(arr);
  const displayData = arr.map((el)=><div className="max-w-[1000px] w-11/12 mx-auto my-0 flex justify-between items-center backdrop-blur-sm bg-[#2a323c]/50 p-3 shadow-3xl rounded-md" key={el._id} onClick={()=>viewCoinInfo(el._id)}>
      <img src={el.logo} width="37px" height="37px" alt="LOGO" className="rounded-sm"/>
      <span className="flex flex-col w-5/12 sm:w-3/12">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex w-2/12">{converter.format(el.marketcap)}</span>
      <span className="hidden sm:flex w-2/12">{moment(el.release.split('/').reverse().join(""), "YYYYMMDD").fromNow()}</span>
      <button className={`w-1/5 sm:w-1/12 py-1 border-[1px] border-[#a0dce6] rounded-md text-md text-gray-300`} onClick={(e)=>{e.stopPropagation();voteBtn(el._id)}}><i className="fa-solid fa-circle-arrow-up mr-1"></i>{el.votes}</button>
    </div>)
  return(
    <>
      <ToastContainer 
        position="top-left"
        autoClose={true}
        newestOnTop
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        limit={5}
        transition={Flip}
      />
      {displayData}
      <i onClick={()=>{setPerPage(perPage += 50)}} className={`w-full text-3xl text-center animate-bounce fa-solid fa-arrow-down ${perPage >= len ? "hidden" : ""}`}></i>
    </>
  )
}

export default AllTimeHigh;