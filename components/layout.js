import Head from 'next/head'
import styles from './layout.module.css'
import {MdPerson} from 'react-icons/md'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'

export const siteTitle = 'Wafy'

export default function Layout({ children, home }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="The best tool to create a beautiful homepage, Wafy"
        />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />
          <link href="https://fonts.googleapis.com/css2?family=Aclonica&display=swap" rel="stylesheet"/>          
          <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
      </Head>
        <header className={styles.header}>
          
          <Link href="/">
            <a className={styles.home}>
              Wafy
            </a>
          </Link>

          <nav>
            <Link href="/">
              <a>Templates</a>
            </Link>
            <Link href="/">
              <a>Contact</a>
            </Link>
            <Link href="/">
              <a className={styles.icons}><MdPerson/></a>
            </Link>

          </nav>
        </header>
        <main>{children}</main>

        <footer>

        </footer>
    </div>
  )
}