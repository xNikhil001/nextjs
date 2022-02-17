function coininfo({data}){
  return(
    <div>
      {data._id}
        <hr />
      {data.test}
    </div>
  )
}

export async function getStaticPaths(){
  const url = "http://localhost:8000/api/coins"
  const res = await fetch(url)
  const data = await res.json();
  const paths = data.map((item) => ({
    params: { slug: item._id },
  }))
  return{
    paths,
    fallback: false
  }
}

export async function getStaticProps({params}){
  const url = `http://localhost:8000/api/coins/${params.slug}`
  const res = await fetch(url)
  const data = await res.json();
  return{
    props: {
      data
    }
  }
}

export default coininfo;