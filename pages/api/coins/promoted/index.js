export default async function handler(req,res){
  const url = `https://cp0099.herokuapp.com/api/coins/promoted`;
  const getData = await fetch(url)
  const data = await getData.json();
  return res.status(200).send(data)
}