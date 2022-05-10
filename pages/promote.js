
function Promote(){
  const pricing = [
    {days: "1 day",bnb: 0.40,usd: "$150"},
    {days: "3 days",bnb: 0.92,usd: "$350"},
    {days: "7 days",bnb: 1.70,usd: "$650"}
    ]
  return(
    <>
      <div className="max-w-[600px] w-11/12 mx-auto text-center">
        <h1 className="text-2xl">Promote Coin</h1>
        <h3 className="text-lg mt-2">Promote your coin with us to get instant visibility on top</h3>
        <h3 className="mt-12 text-lg">Promoted coins section</h3>
        
        <div className="max-w-[600px] w-11/12 mx-auto shadow-xl grid grid-cols-3 my-4 h-[200px] bg-[#2a323c] rounded-md">
          <div className="mt-4"></div>
          <div className="mt-4">BNB</div>
          <div className="mt-4">USD</div>
          
          <div>1 day</div>
          <div>0.40</div>
          <div>$150</div>
          
          <div>3 days</div>
          <div>0.90</div>
          <div>$350</div>
          
          <div>7 days</div>
          <div>1.70</div>
          <div>$650</div>
        </div>
        
       <h3 className="mt-12 text-lg">Advertising banners (420x60)</h3>
        
        <div className="max-w-[600px] w-11/12 mx-auto shadow-xl grid grid-cols-3 my-4 h-[200px] bg-[#2a323c] rounded-md">
          <div className="mt-4"></div>
          <div className="mt-4">BNB</div>
          <div className="mt-4">USD</div>
          
          <div>1 day</div>
          <div>0.30</div>
          <div>$100</div>
          
          <div>3 days</div>
          <div>0.70</div>
          <div>$250</div>
          
          <div>7 days</div>
          <div>1.20</div>
          <div>$450</div>
        </div>
        
        <p className="mt-8">Mail us at <a className="text-green-400 cursor-pointer" href="mailto:naikn8113@gmail.com?subject=coin promotion">promote@coinparadise.com</a> for promotion</p>
      </div>
    </>
  )
}

export default Promote;