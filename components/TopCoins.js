import Image from 'next/image'
import {useRouter} from 'next/router'
function TopCoins({coins}){
  const router = useRouter();
  
  function viewCoinInfo(ID){
    router.push(`/coininfo/${ID}`)
  }
  const data = coins.map((el)=><div className="max-w-[600px] w-11/12 mx-auto my-4 flex justify-between items-center bg-gray-100 p-3" key={Math.random()} onClick={()=>viewCoinInfo(el._id)}>
      <Image src="/instagram.svg" width={35} height={35}/>
      <span className="flex flex-col -ml-[40%] sm:-ml-[10%] text-[15px]">{el.symbol} <span className="text-sm">{el.name}</span></span>
      <span className="hidden sm:flex">{el.mcap}</span>
      <button className="w-1/5 py-1 border border-green-500 rounded-md text-md bg-green-100"><i className="fa-solid fa-circle-arrow-up"></i>{el.votes}</button>
    </div>)
  return(
    <>
      <h1 className="mt-12 max-w-[600px] text-xl mx-auto w-11/12">Top voted coins</h1>
      {data}
    </>
  )
}

export default TopCoins;