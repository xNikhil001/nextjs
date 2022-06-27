import {useState} from 'react'
import dynamic from 'next/dynamic';

const NewCoins = dynamic(()=>import('../components/NewCoins.js'))
const AllTimeHigh = dynamic(()=>import('../components/AllTimeHighCoins.js'))

function OtherCoins(){
  const [tab,setTab] = useState("NEW");
  const handleChange = (e)=>{
    setTab(e.target.value)
  }
  return(
    <>
      <div className="flex max-w-[1000px] w-11/12 mx-auto items-center mt-10 mb-8">
        <h1 className="max-w-[1000px] w-11/12 mx-auto text-xl">Other Coins</h1>
        <select value={tab} onChange={handleChange} className="w-4/12 sm:w-2/12 text-center p-2 outline-0 shadow-4xl bg-white rounded-sm">
          <option value="NEW">NEW</option>
          <option value="ATH">ATH</option>
        </select>
      </div>
      {tab == 'NEW'? <NewCoins /> : tab== 'ATH' ? <AllTimeHigh /> : ""}
    </>
  )
}

export default OtherCoins;