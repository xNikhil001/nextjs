function Skeleton(){
  return(
    <>
      <div className="max-w-[1000px] w-11/12 mx-auto my-0 flex justify-between items-center backdrop-blur-sm bg-[#2a323c]/50 p-3 shadow-3xl rounded-md" >
      <span className="w-[35px] h-[35px] backdrop-blur-sm bg-[#2a323c]/70 animate-pulse"></span>
      <span className="flex flex-col w-5/12 p-2 backdrop-blur-sm bg-[#2a323c]/70 animate-pulse"><span className="p-2 backdrop-blur-sm bg-[#2a323c]/70 animate-pulse"></span></span>
      <span className="hidden sm:flex w-2/12 p-4 backdrop-blur-sm bg-[#2a323c]/70 animate-pulse"></span>
      <button className="w-1/5 p-4 backdrop-blur-sm bg-[#2a323c]/70 animate-pulse"></button>
    </div>
    </>
  )
}

export default Skeleton;