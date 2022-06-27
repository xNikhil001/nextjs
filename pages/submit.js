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
  const [formData,setFormData] = useState({
    name: "",
    symbol: "",
    logo: "",
    description: "",
    address: "",
    website: "",
    chain: "",
    release: {
      year: "",
      month: "",
      day: ""
    },
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
        <form className="max-w-[700px] w-11/12 mx-auto shadow-lg">
          <h3 className="w-full mx-auto text-2xl sm:w-11/12">Submit your coin</h3>
            <label for="" class="flex flex-col my-4">
            Coin Name
            <input className="input" name="coin_name" type="text" value={formData.name || ""} onChange={handleForm} />
            {error.nameError && error.nameError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            <label for="" class="flex flex-col my-4">
            Symbol
            <input className="input" name="symbol" type="text" value={formData.symbol || ""} onChange={handleForm}/>
             {error.symbolError && error.symbolError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
             </label>
             
            <label for="" class="flex flex-col my-4">
            Logo
            <input className="input" type="url" name="logo" value={formData.logo || ""} onChange={handleForm} />
             {error.logoError && error.logoError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <label for="" class="flex flex-col my-4">
            Description
            <textarea className="input" name="description" value={formData.description || ""} onChange={handleForm} cols="40" rows="6"></textarea>
             {error.descError && error.descError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
             </label>
             
            <label for="" class="flex flex-col my-4">
            Contract Address
            <input className="input" type="text" name="address" value={formData.address || ""} onChange={handleForm} />
             {error.addressError && error.addressError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
             
            <label for="" class="flex flex-col my-4">
            Website Link
            <input className="input" type="url" name="website" value={formData.website || ""} onChange={handleForm} />
             {error.websiteError && error.websiteError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <label for="" className="flex flex-col my-4">
            Block Chain
            <select name="chain" value={formData.chain || ""} onChange={handleForm} className="bg-[#262c40] shadow-4xl rounded-sm p-2 outline-0 hover:bg-gray-500">
              <option value="">Select Block Chain type</option>
              <option value="ETH">Ethereum</option>
              <option value="BSC">Binance Smart Chain</option>
              <option value="MATIC">Polygon</option>
              <option value="TRX">TRON</option>
              <option value="SOL">SOLANA</option>
            </select>
             {error.chainError && error.chainError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <label for="" class="flex flex-col my-4">
            Release date
            <input className="input bg-white" type="date" name="release" value={formData.release || ""} onChange={handleForm} />
             {error.releaseError && error.releaseError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <label for="" class="flex flex-col my-4">
            Market Capital
            <input className="input" type="number" name="marketcap" value={formData.marketcap || ""} onChange={handleForm} />
             {error.marketcapError && error.marketcapError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <label for="" class="flex flex-col my-4">
            Twitter Link
            <input className="input" type="url" name="twitter" value={formData.twitter || ""} onChange={handleForm} />
             {error.twitterError && error.twitterError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <label for="" class="flex flex-col my-4">
            Telegram Link
            <input className="input" type="url" name="telegram" value={formData.telegram || ""} onChange={handleForm} />
            {error.telegramError && error.telegramError.map((el)=>(<div className="text-red-400 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            </label>
            
            <button className="w-6/12 sm:w-4/12 bg-[#a0dce6] shadow-3xl mx-auto block p-2 my-6 rounded-md text-black font-black h-[42px]" onClick={submitForm}>{formLoading?(<div className="flex justify-center items-center"><img src="/three-dots.svg" width="45px" height="45px" /></div>) : "Submit"}</button>
        </form>
      </>
    )
}

export default Submit;