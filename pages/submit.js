import {useState,useEffect} from 'react';
import Validate from '../services/Validate.js';
import axios from 'axios';
import { useSession,getSession,signIn } from "next-auth/react";
import { ToastContainer, toast , Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  
function Submit(){
  const postURI = '/api/coins';
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
  
  const formFail = () => toast.error('Error submitting your coin!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light"
  });
  const formSuccess = () => toast.success('Your coin was added successfully!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "light",
  });
  
  async function postFormData(){
    setFormLoading(true);
    const res = await axios.post(postURI,formData);
    if(res.data.success){
      formSuccess();
      setFormLoading(false);
    }
    if(res.data.errorStatus){
      formFail();
      setError(res.data.errors);
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
    const validator = new Validate(formData)
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
            <select name="chain" value={formData.chain || ""} onChange={handleForm} className="w-full sm:w-11/12 bg-[#2a323c] mx-auto block p-2 my-6 rounded-md outline-0 text-gray-300 hover:bg-[#3f4b5a] hover:text-gray-300 shadow-3xl">
              <option value="">Select Block Chain type</option>
              <option value="ETH">Ethereum</option>
              <option value="BSC">Binance Smart Chain</option>
              <option value="MATIC">Polygon</option>
              <option value="TRX">TRON</option>
              <option value="SOL">SOLANA</option>
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
            <button className="w-6/12 sm:w-4/12 bg-[#a0dce6] shadow-3xl mx-auto block p-2 my-6 rounded-md text-black font-black h-[42px]" onClick={submitForm}>{formLoading?(<div className="flex justify-center items-center"><img src="/three-dots.svg" width="45px" height="45px" /></div>) : "Submit"}</button>
        </form>
      </>
    )
}

export default Submit;