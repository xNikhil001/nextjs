import Link from "next/link"
import converter from '../../helpers/converter.js';
import moment from 'moment';
import { useState } from 'react';
import { useSession,getSession,signIn } from "next-auth/react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Coininfo({data}){
  const [text,setText] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };
  const handleText = ()=>{
    navigator.clipboard.writeText(data.address);
    setText(true);
    setTimeout(function() {
      setText(false);
    }, 2000);
  };
  const voteInfo = () => toast.info('You can vote once every 24 hours!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
  
  const voteURI = 'https://cp0099.herokuapp.com/api/coins';
  
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
      }
      
      const res = await axios.patch(voteURI,userData);
      if(res.data.success){
        refreshData();
      }
      if(!res.data.success){
        voteInfo();
      }
    }
  }
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
    <div className="max-w-[1000px] mx-auto grid gap-4 my-8">
      <div className="w-11/12 mx-auto backdrop-blur-sm bg-[#2a323c]/50 gap-2 rounded-md shadow-4xl">
        <div className="flex flex-col p-2 items-center mt-4">
          <img src={data.logo} width="100px" height="100px" />
          <div className="mt-8 mb-4 flex flex-col items-center w-full">
            <span className="text-xl my-2">{data.name} <span className="mx-2 bg-gray-600 px-3 rounded-md">{data.symbol}</span></span>
            <span className="">{moment(data.release.split('/').reverse().join(""), "YYYYMMDD").fromNow()}</span>
            <button className="w-6/12 sm:w-4/12 mx-auto p-2 border-[2px] border-[#a0dce6] font-black mt-4 rounded-md" onClick={()=>{voteBtn(data._id)}}>VOTE {data.votes}</button>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto backdrop-blur-sm bg-[#2a323c]/50 h-[50px] grid grid-cols-7 rounded-md shadow-4xl">
        <div className="flex items-center justify-center border-r-[2px] border-[#495869]">
          {data.chain == "BSC" && <img src="/bnb.svg" width="20px" height="20px" />}
          {data.chain == "ETH" && <img src="/eth.svg" width="20px" height="20px" />}
          {data.chain == "SOL" && <img src="/sol.svg" width="20px" height="20px" />}
          {data.chain == "TRX" && <img src="/trx.svg" width="20px" height="20px" />}
        </div>
        <div className="flex items-center col-span-5 px-4 border-r-[2px] border-[#495869]"><span className="no-scrollbar overflow-x-scroll">{text? "copied!" : data.address}</span></div>
        <div className="flex items-center justify-center"><img src="/copy.svg" width="40px" height="40px" onClick={handleText} /></div>
      </div>
      <div className="w-11/12 mx-auto backdrop-blur-sm bg-[#2a323c]/50 py-5 px-7 shadow-4xl rounded-md">
        {data.description}
      </div>
      <div className="flex flex-col w-11/12 mx-auto backdrop-blur-sm bg-[#2a323c]/50 p-2 shadow-4xl rounded-md">
        <Link href={data.website}><a className="border-b-[2px] border-[#495869] p-4 flex"><img src="/int.svg" width="25px" height="25px" /><span className="ml-4">Website</span></a></Link>
        <Link href={data.twitter}><a className="border-b-[2px] border-[#495869] p-4 flex"><img src="/twitter.svg" width="25px" height="25px" /><span className="ml-4">Twitter</span></a></Link>
        <Link href={data.telegram}><a className="p-4 flex"><img src="/telegram.svg" width="25px" height="25px" /><span className="ml-4">Telegram</span></a></Link>
      </div>
      <div className="w-11/12 mx-auto h-16 backdrop-blur-sm bg-[#2a323c]/50 px-7 py-5 shadow-4xl rounded-md">
        <span className="">Market Capital : {converter.format(data.marketcap)}</span>
      </div>
    </div>
    </>
  )
}

export async function getServerSideProps({params}){
  const url = `https://cp0099.herokuapp.com/api/coins/${params.slug}`
  const res = await fetch(url);
  const coin = await res.json()
  return{
    props: {
      data: coin.result
    }
  }
}

export default Coininfo;
