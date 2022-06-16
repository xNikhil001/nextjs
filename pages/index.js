import dynamic from 'next/dynamic';
import {useRouter} from 'next/router';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

export default function Home({data}){
  const router = useRouter();
  const refreshData = ()=>{
    router.replace(router.asPath);
  };
  return(
    <>
    <h1 className="max-w-[1000px] w-11/12 mx-auto text-xl mb-4 flex items-center"><img src="/diamond.svg" width="19px" height="19px" alt="" className="mr-1" />Promoted Coins</h1>
    <Promoted arr={data} fn={refreshData} />
    <OtherCoins />
    </>
  )
}

export async function getStaticProps(){
  const url = 'https://cp0099.herokuapp.com/api/coins/promoted';
  
  const res = await fetch(url).then((data)=>data.json())
  
  return{
    props:{
      data: res.result
    }
  }
}