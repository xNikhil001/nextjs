import dynamic from 'next/dynamic';

const Promoted = dynamic(()=>import('../components/Promoted'))
const TopCoins = dynamic(()=>import('../components/TopCoins'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

function Home({data}){
  return(
    <div>
    <Promoted coins={data} />
    <TopCoins coins={data} />
    <OtherCoins />
    </div>
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