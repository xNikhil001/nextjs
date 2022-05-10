import Link from "next/link"

function coininfo({data}){
  return(
    <div className="max-w-[700px] w-11/12 mx-auto bg-[#2a323c] rounded-md p-4 shadow-3xl">
      <div className="flex justify-between items-center">
        <img src={data.logo} width="100px" height="100px" className="rounded-md"/>
        <div className="flex flex-col w-6/12">
          <span>{data.symbol}</span>
          <span>{data.name}</span>
          <span>votes: {data.votes}</span>
        </div>
      </div>
      <div className="flex flex-col p-2 rounded-sm my-4"><span>Contract address :</span><span>{data.address}</span></div>
      <div className="flex flex-col p-2 rounded-sm"><span>About Coin :</span>{data.description}</div>
            <div className="my-6">
        <h1>Official links</h1>
        <div className="flex flex-col">
          <Link href={data.website}><a className="links"> Website </a></Link>
          <Link href={data.twitter}><a className="links"> Twitter </a></Link>
          <Link href={data.telegram}><a className="links"> Telegram </a></Link>
        </div>
      </div>
    </div>
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

export default coininfo;