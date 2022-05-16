import axios from 'axios';

export default async function handler(req,res){
  const url = `https://cp0099.herokuapp.com/api/coins/ath`;
  const loc = `http://localhost:8000/api/coins/ath`
  try {
    const data = await axios.get(url)
    res.status(200).send(data.data)
  } catch (e) {
    res.status(500).send({msg:"Error: could not fetch data."});
  }
}