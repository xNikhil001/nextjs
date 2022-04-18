import dynamic from 'next/dynamic';
import {useStore} from '../zustand';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

function HomePage(){
  const signInToast = useStore(state => state.signInToast);
  
  return(
    <>
      <div className={`z-10 fixed w-[300px] h-[70px] bg-orange-500 bottom-12 right-5 rounded-sm shadow-3xl text-center ${signInToast? "-translate-x-0" : "translate-x-[200%]"} transition-all duration-300`}><span className="leading-[70px] text-lg">Please sign in to vote!</span></div>
    <h1 className="max-w-[800px] w-11/12 mx-auto text-xl">Promoted Coins</h1>
    <Promoted />
    <OtherCoins />
    </>
  )
}

export default function Home(){
  return (
    <HomePage />
  )
}