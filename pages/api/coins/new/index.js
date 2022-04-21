import axios from 'axios';
import jwt from 'jsonwebtoken';

export default async function handler(req,res){
  const url = `https://cp0099.herokuapp.com/api/coins/new`;
  const loc = `http://localhost:8000/api/coins/new`
  const SECRET_KEY="rJGNX+ehxRvcsNEFERwU0lUbzOXsb9fXgjEIbCh5f8xh3UdYlKQ4JrLCKW0NEIFkP/aUpx6pUs6h6N98Hgu/lEfqo7BDs3EcQ1Dfu8rYr19mWzaVmOWdhSLX7PxGJFKO3hyafrw0yLOJoOZljcsyftwwWq7UafhNyhwF6PKKwk6POAUPdqZP41ux7eCSvhWTt5fWXmvldcgYemPqdY7j1FisGJq8zmP68jJ4WUUNYQy5jtYfyp0MFYrQzhHiNmX48ZkkcdeMXbybLvLBWUyK1P9+vzfotB4SNKQk5OsusI0c8sgmkOHm4G0yOv69/wwkqYmnmLtkiKjz9jjZoFLOyw=="
    const token = jwt.sign({type:'verification'},SECRET_KEY,{algorithm:'HS256'})
    const options = {
      headers: {
        'Content-Type':'application/json',
        referer: 'https://nextjs-dusky-gamma.vercel.app/',
        'verify-key': token
      }
    }
  const data = await axios.get(url,options)
  return res.status(200).send(data.data)
}