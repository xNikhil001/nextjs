import axios from 'axios';

export default async function handler(req,res){
  const url = `https://cp0099.herokuapp.com/api/coins/ath`;
  const loc = `http://localhost:8000/api/coins/ath`
  const token = process.env.TOKEN
    const options = {
      headers: {
        'Content-Type':'application/json',
        referer: 'https://nextjs-dusky-gamma.vercel.app/',
        'verify-key': token
      }
    }
  const data = await axios.get(url,options)
  res.status(200).send(data.data)
}