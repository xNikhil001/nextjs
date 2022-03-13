import { useRouter } from 'next/router';
import dynamic from 'next/dynamic'

const Promoted = dynamic(()=>import('../components/Promoted'))
const TopCoins = dynamic(()=>import('../components/TopCoins'))
const OtherCoins = dynamic(()=>import('../components/OtherCoins'))
const Counter = dynamic(()=>import('../components/Counter'))

function Home(){
  const router = useRouter()
  return(
    <div>
    <Promoted />
    <TopCoins />
    <OtherCoins />
    <Counter />
    
    </div>
  )
}
export default Home;