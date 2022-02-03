import dynamic from 'next/dynamic';

const Navbar = dynamic(()=>import('../components/Navbar.js'))
const Footer = dynamic(()=>import('../components/Footer.js'))

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh_-_15rem)]">{children}</main>
      <Footer />
    </>
  )
}