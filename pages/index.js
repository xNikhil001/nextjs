import dynamic from 'next/dynamic';
import useStore from '../zustand';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

function Home({data}){
  const setCoins = useStore(state => state.setCoins)
  setCoins(data);
  return(
    <>
    <Promoted/>
    <OtherCoins />
    </>
  )
}
export default Home;

export async function getStaticProps(){
  const url = "https://cp0099.herokuapp.com/api/coins";
  const res = await fetch(url);
  const data = await res.json();
    
  return {
    props:{
      data: data.result
    }
  }
}