import Layout from '../components/layout'
import { user, UserContext } from '../store/user'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={user}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  )
}

export default MyApp