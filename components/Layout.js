import dynamic from 'next/dynamic';
import Head from 'next/head';

const Navbar = dynamic(()=>import('../components/Navbar.js'))
const Footer = dynamic(()=>import('../components/Footer.js'))

export default function Layout({ children }) {
  return (
    <>
    <Head>
    <title>CoinParadise</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
      <Navbar />
      <main className="min-h-[calc(100vh_-_17rem)] mt-[20%] sm:mt-[15%]">
        {children}
      </main>
      <Footer />
    </>
  )
}