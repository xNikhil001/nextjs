import dynamic from 'next/dynamic';
import {useStore} from '../zustand';
import 'animate.css';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

function Home({data}){
  const signInToast = useStore(state => state.signInToast);
  return(
    <>
    {signInToast? (<div className="animate__animated animate__slideInLeft absolute top-[10%] left-[4%]  max-w-[600px] w-11/12 p-3 bg-red-600 rounded-md">Please Sign in to vote!</div>):""}
    <Promoted coins={data}/>
    <OtherCoins />
    </>
  )
}
export default Home;

export async function getStaticProps(){
  const url = "https://cp0099.herokuapp.com/api/coins/promoted";
  const res = await fetch(url);
  const data = await res.json();
    
  return {
    props:{
      data: data.result
    }
  }
}