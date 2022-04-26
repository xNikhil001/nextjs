export default function Footer(){
    const links = ['Terms & Conditions','Disclaimer']
    return(
      <>
      <footer className="w-full mt-8 h-44 text-center">
        <div className="flex sm:w-4/12 w-9/12 justify-evenly mx-auto p-6">
          <img src="/instagram.svg" alt="img" width="40px" height="40px" />
          <img src="/twitter.svg" alt="img" width="40px" height="40px" />
          <img src="/telegram.svg" alt="img" width="40px" height="40px" />
        </div>
        <ul className="my-4">
        {links.map(el => <li key={el}>{el}</li>)}
        </ul>
        <span className="text-xs p-2">Copyright &copy; 2021 CoinParadise. All rights reserved</span>
      </footer>
      </>
    )
}