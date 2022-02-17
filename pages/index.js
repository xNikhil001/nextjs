import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

const Promoted = dynamic(()=>import('../components/Promoted'))
const TopCoins = dynamic(()=>import('../components/TopCoins'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))
const Counter = dynamic(()=>import('../components/Counter'))

function Home({data}){
  const router = useRouter()
  function viewInfo(id){
    router.push(`/coininfo/${id}`)
    console.log(id)
  }
  return(
    <div>
    <Promoted />
    <TopCoins />
    <OtherCoins />
    <Counter />
      {data.map(el => <p className="my-4" key={el._id} onClick={()=>viewInfo(el._id)}>{el.name}</p>)}
    </div>
  )
}

export async function getStaticProps(){
  const url = "http://localhost:8000/api/coins"
  const res = await fetch(url)
  const data = await res.json();
  
  return{
    props: {
      data
    }
  }
}

export default Home;