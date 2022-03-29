function coininfo({data}){
  return(
    <div>
      {data._id}
        <hr />
      {data.name}
    </div>
  )
}

export async function getServerSideProps({params}){
  const url = `https://cp0099.herokuapp.com/api/coins/${params.slug}`
  const res = await fetch(url)
  const data = await res.json();
  return{
    props: {
      data: data.result
    }
  }
}

export default coininfo;