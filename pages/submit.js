import {useState,useEffect} from 'react';
import Validate from '../services/Validate.js';
import axios from 'axios';
import { useSession,getSession,signIn } from "next-auth/react";

function Submit(){
  const postURI = '/api/coins';
  const [loading,setLoading] = useState(true);
  const { data: session } = useSession();
  useEffect(()=>{
    const checkSession= async ()=>{
      const session = await getSession();
      if(!session){
        signIn();
      }else{
        setLoading(false);
      }
    }
    checkSession();
  },[]);
  const [formData,setFormData] = useState({
    coin_name: "",
    symbol: "",
    logo: "",
    description: "",
    address: "",
    website: "",
    chain: "",
    release: "",
    marketcap: "",
    twitter: "",
    telegram: ""
  });
  const [error,setError] = useState({});
  const [submitStatus,setSubmitStatus] = useState(false);
  
  async function postFormData(){
    const res = await axios.post(postURI,formData);
    if(res.data.success){
      setSubmitStatus(true);
      setTimeout(function() {
        setSubmitStatus(false);
      }, 5000);
    }
    if(res.data.errorStatus){
      setError(res.data.errors);
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
    const validator = new Validate(formData)
    setError(validator.errors);
    if(Object.keys(validator.errors).length == 0){
      postFormData();
    }
  }
  if(loading){
    return (<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <i className="fa-solid fa-circle-notch animate-spin text-[45px]"></i>
    </div>)
  }
  return(
      <>
        <div className={`fixed top-[10%] sm:top-[5%] right-5 w-[350px] h-[50px] bg-gray-100 text-center text-green-800 font-black leading-[50px] rounded-md bg-green-300 shadow-3xl ${submitStatus? "block" : "hidden"}`}>
          Your coin was submitted succesfully!
        </div>
        <form className="max-w-[650px] w-11/12 mx-auto shadow-lg rounded-lg mb-6 p-4">
          <h3 className="w-full mx-auto text-2xl sm:w-11/12">Submit your coin</h3>
            <input className="input" name="coin_name" placeholder="Coin Name" type="text" value={formData.coin_name || ""} onChange={handleForm} />
            {error.nameError && error.nameError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Symbol" name="symbol" type="text" value={formData.symbol || ""} onChange={handleForm}/>
             {error.symbolError && error.symbolError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Logo URL" type="url" name="logo" value={formData.logo || ""} onChange={handleForm} />
             {error.logoError && error.logoError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <textarea className="input" name="description" value={formData.description || ""} onChange={handleForm} cols="40" rows="6" placeholder="Description of your coin..."></textarea>
             {error.descError && error.descError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Address" type="text" name="address" value={formData.address || ""} onChange={handleForm} />
             {error.addressError && error.addressError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Website URL" type="url" name="website" value={formData.website || ""} onChange={handleForm} />
             {error.websiteError && error.websiteError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <select name="chain" value={formData.chain || ""} onChange={handleForm} className="w-full sm:w-11/12 bg-[#2a323c] mx-auto block p-2 my-6 rounded-md outline-0 text-gray-300 hover:bg-[#505762] hover:text-gray-300 shadow-3xl">
              <option value="">Select Block Chain type</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Binance Smart Chain">Binance Smart Chain</option>
              <option value="Polygon">Polygon</option>
              <option value="Bitcoin">Bitcoin</option>
            </select>
             {error.chainError && error.chainError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" type="date" name="release" value={formData.release || ""} onChange={handleForm} />
             {error.releaseError && error.releaseError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Market Capital" type="number" name="marketcap" value={formData.marketcap || ""} onChange={handleForm} />
             {error.marketcapError && error.marketcapError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Twitter link" type="url" name="twitter" value={formData.twitter || ""} onChange={handleForm} />
             {error.twitterError && error.twitterError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Telegram link" type="url" name="telegram" value={formData.telegram || ""} onChange={handleForm} />
            {error.telegramError && error.telegramError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <button className="w-6/12 sm:w-4/12 bg-[aqua] shadow-3xl mx-auto block p-2 my-6 rounded-md hover:bg-[#232931] hover:border hover:border-[aqua] text-black font-black hover:text-gray-100 hover:shadow-none" onClick={submitForm}>Submit</button>
        </form>
      </>
    )
}

export default Submit;