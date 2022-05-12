import axios from 'axios';

export default async function handler(req,res){
  const token = process.env.TOKEN
  const url = `https://cp0099.herokuapp.com/api/coins/ath?verify=${token}`;
  const loc = `http://localhost:8000/api/coins/ath?verify=${token}`
  const options = {
    headers: {
      'Content-Type':'application/json',
      referer: 'https://nextjs-dusky-gamma.vercel.app/',
    }
  }
  try {
    const data = await axios.get(url,options)
    res.status(200).send(data.data)
  } catch (e) {
    res.status(500).send({msg:"Error: could not fetch data."});
  }
}