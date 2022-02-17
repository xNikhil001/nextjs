import Image from 'next/image'
import {useState} from 'react'
function OtherCoins(){
  const [tab,setTab] = useState("New")
  return(
    <>
      <h1 className="max-w-[600px] w-11/12 mx-auto">Other Coins</h1>
      <div className="flex max-w-[600px] w-11/12 mx-auto">
        <button className="bg-red-100 mr-2" onClick={()=>setTab("New")}>New</button>
        <button className="bg-red-100" onClick={()=>setTab("ATH")}>ATH</button>
      </div>
      {tab == 'New'? (<div>New</div>) : tab== 'ATH' ? (<div>ATH</div>) : ""}
    </>
  )
}

export default OtherCoins;