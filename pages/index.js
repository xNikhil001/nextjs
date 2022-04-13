import dynamic from 'next/dynamic';

const Promoted = dynamic(()=>import('../components/Promoted'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))

function Home({data}){
  return(
    <>
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