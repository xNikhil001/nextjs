import '../styles/globals.css'
import dynamic from 'next/dynamic';
import {store} from '../redux/store.js'
import {Provider} from 'react-redux'

const Layout = dynamic(()=>import('../components/Layout.js'))

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
