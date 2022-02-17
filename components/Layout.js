import dynamic from 'next/dynamic';

const Navbar = dynamic(()=>import('../components/Navbar.js'))
const Footer = dynamic(()=>import('../components/Footer.js'))

export default function Layout({ children }) {
  return (
    <>
    <head>
    <title>CoinParadise</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"/>
    </head>
      <Navbar />
      <main className="min-h-[calc(100vh_-_15rem)]">{children}</main>
      <Footer />
    </>
  )
}