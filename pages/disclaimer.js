import Link from 'next/link'
export default function Disclaimer(){
  return(
    <>
    <h1 className="text-center max-w-[600px] w-11/12 mx-auto text-2xl tracking-[1px]">DISCLAIMER</h1>
    
    <div className="max-w-[600px] w-11/12 mx-auto bg-[#2a323c] p-4 shadow-xl rounded-md mt-8">
      <h3 className="mb-3 tracking-[1px] text-lg">EXTERNAL LINKS</h3>
      <p className="">The Site contains links to other websites or content belonging to or originating from third parties or links to websites and features in banners or other advertising. Such external links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability or completeness by us. 
      </p>
    </div>
    <div className="max-w-[600px] w-11/12 mx-auto bg-[#2a323c] p-4 shadow-xl rounded-md mt-8">
      <h3 className="mb-3 tracking-[1px] text-lg">NOT FINANCIAL ADVICE</h3>
      <p className="">Our content is intended to be used and must be used for informational purposes only. It is very important to do your own analysis before making any investment based on your own personal circumstances. You should take independent financial advice from a professional in connection with, or independently research and verify, any information that you find on our Website and wish to rely upon, whether for the purpose of making an investment decision or otherwise.
      </p>
    </div>
    </>
  )
}