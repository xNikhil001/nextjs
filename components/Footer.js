import Link from 'next/link'
export default function Footer(){
  const mediaLinks = {
    instagram: "https://instagram.com/coin_paradise?igshid=YmMyMTA2M2Y=",
    twitter: "https://twitter.com/_CoinParadise_?t=ZusSCXHemN5n3ga7TboJ5Q&s=08",
    telegram: "https://t.me/coinparadise"
  }
  return(
    <>
    <footer className="w-full mt-8 h-44 text-center">
      <div className="flex sm:w-3/12 w-9/12 justify-evenly mx-auto p-6">
        <Link href={mediaLinks.instagram}><a><img src="/instagram.svg" alt="img" width="35px" height="35px" /></a></Link>
        <Link href={mediaLinks.twitter}><a><img src="/twitter.svg" alt="img" width="35px" height="35px" /></a></Link>
        <Link href={mediaLinks.telegram}><a className="hover:bg-[#7e0fff] rounded-[50%]"><img src="/telegram.svg" alt="img" width="35px" height="35px"/></a></Link>
      </div>
      <ul className="my-4">
        <li><Link href="/disclaimer"><a>Disclaimer</a></Link></li>
      </ul>
      <span className="text-xs p-2">Copyright &copy; {new Date().getFullYear()} CoinParadise. All rights reserved
      </span>
    </footer>
    </>
  )
}