function Skeleton(){
  return(
    <>
      <div className="max-w-[800px] w-11/12 mx-auto my-4 flex justify-between items-center bg-[#393E46] p-3 shadow-3xl rounded-md" >
      <span className="w-[35px] h-[35px] bg-[#505762] animate-pulse"></span>
      <span className="flex flex-col w-5/12 p-2 bg-[#505762] animate-pulse"><span className="p-2 bg-[#505762] animate-pulse"></span></span>
      <span className="hidden sm:flex w-2/12 p-4 bg-[#505762] animate-pulse"></span>
      <button className={`w-1/5 p-4 bg-[#505762] animate-pulse`}></button>
    </div>
    </>
  )
}

export default Skeleton;