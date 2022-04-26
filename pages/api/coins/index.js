import axios from 'axios';

export default async function handler(req,res){
  const loc = `http://localhost:8000/api/coins`
  const token = process.env.TOKEN
  const options = {
      headers: {
        'Content-Type':'application/json',
        referer: 'https://nextjs-dusky-gamma.vercel.app/',
      }
    }
  const url = `https://cp0099.herokuapp.com/api/coins?verify=${token}`;
  if(req.method == 'PATCH'){
    const userData = {
      ID: req.body.ID,
      uid: req.body.uid
    }
    try {
      const data = await axios.patch(url,userData,options);
      res.status(200).send(data.data)
    } catch (err) {
      res.status(500).send({msg:"An error occurred"})
    }
  }else if(req.method == 'POST'){
    try {
      const response = await axios.post(url,req.body,options)
      res.status(200).send(response.data);
    } catch (err) {
      res.status(500).send({msg:"An error occurred!!"});
    }
  }
  else{
    try {
      const data = await axios.get(url,options)
      res.status(200).send(data.data)
    } catch (e) {
      res.status(500).send({msg:"Error: could not fetch data."});
    }
  }
}