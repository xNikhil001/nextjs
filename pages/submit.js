import {useState,useEffect} from 'react';
import Validate from '../services/Validate.js';
import { useSession,getSession,signIn } from "next-auth/react";
  
function Submit(){
  const postURI = 'https://cp0099.herokuapp.com/api/coins';
  const [loading,setLoading] = useState(true);
  const [formLoading,setFormLoading] = useState(false);
  const { data: session } = useSession();
  useEffect(()=>{
    const checkSession = async ()=>{
      const session = await getSession();
      if(!session){
        signIn();
      }else{
        setLoading(false);
      }
    }
    checkSession();
  },[]);
  const days = [...Array(31)]
  const [formData,setFormData] = useState({
    name: "",
    symbol: "",
    logo: "",
    description: "",
    address: "",
    website: "",
    chain: "",
    year: "",
    month: "",
    day: "",
    marketcap: "",
    twitter: "",
    telegram: ""
  });
  const [error,setError] = useState({});
  
  async function postFormData(){
    setFormLoading(true);
    const res = await axios.post(postURI,formData);
    if(res.success){
      setFormLoading(false);
    }
    if(res.errorStatus){
      setError(res.errors);
      setFormLoading(false);
    }
  }
  
  function handleForm(e){
    const target = e.target;
    const name = target.name;
    const value = target.value;
    setFormData({...formData,[name]:value});
  }
  function submitForm(e){
    e.preventDefault();
    const newForm = {
      name: formData.name,
      symbol: formData.symbol,
      logo: formData.logo,
      description: formData.description,
      address: formData.address,
      website: formData.website,
      chain: formData.chain,
      release: {
        year: formData.year,
        month: formData.month,
        day: formData.day,
      },
      marketcap: formData.marketcap,
      twitter: formData.twitter,
      telegram: formData.telegram
    }
    const validator = new Validate(newForm)
    setError(validator.errors);
    if(Object.keys(validator.errors).length == 0){
      postFormData();
    }
  }
  if(loading){
    return (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <img src="/ball-triangle.svg" width="45px" height="45px" alt="" />
    </div>)
  }
  return(
      <>
        <form className="max-w-[700px] w-11/12 mx-auto">
          <h3 className="w-full mx-auto text-2xl">Submit your coin</h3>
            <label className="flex flex-col mt-4">
              Coin Name
            </label>
            <input className="input" name="name" type="text" value={formData.name || ""} onChange={handleForm} />
            {error.nameError && error.nameError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
            
            <label className="flex flex-col mt-4">
              Symbol
            </label>
            <input className="input" name="symbol" type="text" value={formData.symbol || ""} onChange={handleForm}/>
             {error.symbolError && error.symbolError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
              Logo
            </label>
            <input className="input" type="url" name="logo" value={formData.logo || ""} onChange={handleForm} />
             {error.logoError && error.logoError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
              Description
            </label>
            <textarea className="input" name="description" value={formData.description || ""} onChange={handleForm} cols="40" rows="6"></textarea>
             {error.descError && error.descError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
            Contract Address
            </label>
            <input className="input" type="text" name="address" value={formData.address || ""} onChange={handleForm} />
             {error.addressError && error.addressError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
            Website Link
            </label>
            <input className="input" type="url" name="website" value={formData.website || ""} onChange={handleForm} />
             {error.websiteError && error.websiteError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
              Block Chain
            </label>
            <select name="chain" value={formData.chain || ""} onChange={handleForm} className="bg-gray-300 rounded-sm p-2 outline-0 w-full">
              <option value=""></option>
              <option value="ETH">Ethereum</option>
              <option value="BSC">Binance Smart Chain</option>
              <option value="MATIC">Polygon</option>
              <option value="TRX">TRON</option>
              <option value="SOL">SOLANA</option>
            </select>
             {error.chainError && error.chainError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
              Release date
            </label>
            <div className="grid grid-cols-3 gap-1">
            <div className="flex flex-col">
            <span>Day</span>
            <select name="day" className="input" value={formData.day || ""} onChange={handleForm}>
                <option value=""></option>
              {days.map((el,index)=>(<option value={index+1} key={index}>{index+1}</option>))}
            </select>
            </div>
            
            <div className="flex flex-col">
            <span>Month</span>
            <select name="month" className="input" value={formData.month || ""} onChange={handleForm}>
                <option value=""></option>
              {[...Array(12)].map((el,index)=>(<option value={index+1} key={index}>{index+1}</option>))}
            </select>
            </div>
            
            <div className="flex flex-col">
            <span>Year</span>
            <select name="year" className="input" value={formData.year || ""} onChange={handleForm}>
                <option value=""></option>
              {[...Array(15)].map((el,index)=>(<option value={2008+(index+1)} key={index}>{2008+(index+1)}</option>))}
            </select>
            </div>
            </div>
             {error.releaseError && error.releaseError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
              Market Capital
            </label>
            <input className="input" type="number" name="marketcap" value={formData.marketcap || ""} onChange={handleForm} />
             {error.marketcapError && error.marketcapError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
           <label className="flex flex-col mt-4">
             Twitter Link
           </label>
           <input className="input" type="url" name="twitter" value={formData.twitter || ""} onChange={handleForm} />
             {error.twitterError && error.twitterError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
             
            <label className="flex flex-col mt-4">
              Telegram Link
            </label>
            <input className="input" type="url" name="telegram" value={formData.telegram || ""} onChange={handleForm} />
            {error.telegramError && error.telegramError.map((el)=>(<div className="text-red-400 w-11/12 mx-auto" key={Math.random()}>-{el}</div>))}
            
            <button className="w-6/12 sm:w-4/12 bg-[#a0dce6] shadow-3xl mx-auto block p-2 my-6 rounded-md text-black font-black h-[42px]" onClick={submitForm}>{formLoading?(<div className="flex justify-center items-center"><img src="/three-dots.svg" width="45px" height="45px" /></div>) : "Submit"}</button>
        </form>
      </>
    )
}

export default Submit;