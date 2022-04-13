import '../styles/globals.css';
import dynamic from 'next/dynamic';
import { SessionProvider } from "next-auth/react";

const Layout = dynamic(()=>import('../components/Layout.js'))

function MyApp({ Component, pageProps:{session,...pageProps} }) {
  return(
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
export default MyApp;
