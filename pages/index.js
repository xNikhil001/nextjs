import dynamic from 'next/dynamic';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

export default function Home(){
  return(
    <>
    <h1 className="max-w-[1000px] w-11/12 mx-auto text-xl mb-4 flex items-center"><img src="/diamond.svg" width="19px" height="19px" className="mr-1" />Promoted Coins</h1>
    <Promoted />
    <OtherCoins />
    </>
  )
}