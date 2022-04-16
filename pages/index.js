import dynamic from 'next/dynamic';
import {useStore} from '../zustand';
import useSWR, { SWRConfig,useSWRConfig } from 'swr';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

function HomePage(params){
  const signInToast = useStore(state => state.signInToast);
  const {mutate} = useSWRConfig();
  const url = `https://cp0099.herokuapp.com/api/coins/promoted`
  const fetcher = async (url) => {
    const data = await axios.get(url).then((res)=>res.data.result);
    return data;
  };
  const {data} = useSWR('/api/coins/promoted',fetcher)
  const options = {
        rollbackOnError: true
      }
  mutate(url,options);
  return(
    <>
    <div className={`z-10 fixed w-[300px] h-[70px] bg-orange-500 bottom-12 right-5 rounded-sm shadow-3xl text-center ${signInToast? "-translate-x-0" : "translate-x-[200%]"} transition-all duration-300`}><span className="leading-[70px] text-lg">Please sign in to vote!</span></div>
    <Promoted coins={data}/>
    <OtherCoins />
    </>
  )
}

export default function Home({fallback}){
  return (
    <SWRConfig value={{ fallback }}>
      <HomePage />
    </SWRConfig>
  )
}

export async function getStaticProps(){
  const url = `https://cp0099.herokuapp.com/api/coins/promoted`;
  const res = await fetch(url);
  const data = await res.json();
    
  return {
    props:{
      fallback:{
        '/api/coins/promoted': data.result
      }
    }
  }
}