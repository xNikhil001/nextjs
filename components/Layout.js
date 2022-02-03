import dynamic from 'next/dynamic';

const Navbar = dynamic(()=>import('../components/Navbar.js'))

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  )
}