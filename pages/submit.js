import {useState} from 'react';
import Validate from '../services/Validate.js';
import axios from 'axios';

function Submit (){
  const postURI = "http://localhost:8000/api/coins"
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
    const result = await fetch(postURI,{
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
      }
    });
    const res = await result.json();
    
    if(res.success){
      setSubmitStatus(true);
      setTimeout(function() {
        setSubmitStatus(false);
      }, 5000);
    }
    if(res.errorStatus){
      setError(res.errors);
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
  return(
      <>
      {submitStatus && (<div>Form Submitted</div>)}
        <h3 className="max-w-screen-sm w-11/12 mx-auto mt-8 text-2xl mb-2">Submit your coin</h3>
        <form className="max-w-screen-sm w-11/12 mx-auto shadow-lg rounded-lg mb-6 p-4">
            <input className="input" name="coin_name" placeholder="Coin Name" type="text" value={formData.coin_name || ""} onChange={handleForm} />
            {error.nameError && error.nameError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Symbol" name="symbol" type="text" value={formData.symbol || ""} onChange={handleForm}/>
             {error.symbolError && error.symbolError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Logo URL" type="url" name="logo" value={formData.logo || ""} onChange={handleForm} />
             {error.logoError && error.logoError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <textarea className="input" name="description" value={formData.description || ""} onChange={handleForm} cols="40" rows="6" placeholder="Description of your coin..."></textarea>
             {error.descError && error.descError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Address" type="text" name="address" value={formData.address || ""} onChange={handleForm} />
             {error.addressError && error.addressError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Website URL" type="url" name="website" value={formData.website || ""} onChange={handleForm} />
             {error.websiteError && error.websiteError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <select name="chain" value={formData.chain || ""} onChange={handleForm} className="w-full sm:w-11/12 bg-[#303030] mx-auto block p-2 my-6 rounded-md outline-0 text-gray-300 hover:bg-[#3f3f3f] hover:text-gray-300 shadow-3xl">
              <option value="">Select Block Chain type</option>
              <option value="Ethereum">Ethereum</option>
              <option value="Binance Smart Chain">Binance Smart Chain</option>
              <option value="Polygon">Polygon</option>
              <option value="Bitcoin">Bitcoin</option>
            </select>
             {error.chainError && error.chainError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" type="date" name="release" value={formData.release || ""} onChange={handleForm} />
             {error.releaseError && error.releaseError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Market Capital" type="number" name="marketcap" value={formData.marketcap || ""} onChange={handleForm} />
             {error.marketcapError && error.marketcapError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Twitter link" type="url" name="twitter" value={formData.twitter || ""} onChange={handleForm} />
             {error.twitterError && error.twitterError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <input className="input" placeholder="Telegram link" type="url" name="telegram" value={formData.telegram || ""} onChange={handleForm} />
            {error.telegramError && error.telegramError.map((el)=>(<div className="text-red-800 w-11/12 sm:w-10/12 mx-auto" key={Math.random()}>-{el}</div>))}
            <button className="w-6/12 bg-[#BCFD4C] text-black shadow-3xl mx-auto block p-2 my-6 rounded-md hover:bg-[#3f3f3f] hover:text-gray-300" onClick={submitForm}>Submit</button>
        </form>
      </>
    )
}

export default Submit;