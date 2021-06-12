import Head from 'next/head'
import styles from './layout.module.css'
import { MdPerson } from 'react-icons/md'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import {
  useEffect,
  useState,
  useRef,
} from 'react'
import { FinAnima } from 'finished-animation'

export const siteTitle = 'Wafy'


export default function Layout({ children, signUp }) {
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
        <link href="https://fonts.googleapis.com/css2?family=Aclonica&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <TopNavigation signUp={signUp} />
      <main>{children}</main>

      <footer>

      </footer>
    </div>
  )
}

const TopNavigation = ({  signUp }) => {
  const user = 1;
  const [isUserDropdown, toggleUserDropdown] = useState(false)

  let userRouter;
  if (user) {
    userRouter = (
      <button className={styles.icons}
        onClick={() => !isUserDropdown ? toggleUserDropdown(!isUserDropdown) : ''}>
        <MdPerson />
      </button>
    )
  } else {
    if(signUp){
      userRouter = (
        <Link href="/sign-in">
        <a>로그인</a>
      </Link>
      )
    }else{
      userRouter = (
        <Link href="/sign-up">
        <a>회원가입</a>
      </Link>
      )
    }

  }

  return (
    <header className={styles.header}>

      <Link href="/">
        <a className={styles.home}>
          Wafy
        </a>
      </Link>

      <nav>

        <Link href="/">
          <a>가이드</a>
        </Link>
        <Link href="/">
          <a>템플릿</a>
        </Link>
        <Link href="/">
          <a>문의하기</a>
        </Link>
        {userRouter}

      </nav>


      {isUserDropdown ?
        <UserDropdown
          toggle={toggleUserDropdown} />
        : <></>}

    </header>

  )
}


const UserDropdown = ({ toggle }) => {
  const menuRef = useRef(null)
  const [isClosing, close] = useState(false)

  const openAnimation = new FinAnima({
    func: (progress) => {
      menuRef.current.style.opacity = progress
      menuRef.current.style.transform = `translateY(${(-50 + progress * 50)}%)`
    },
    duration: 0.3,
    easingFunction: 'easeOutExpo'
  })

  const closeAnimation = new FinAnima({
    before: () => { close(true) },
    func: (progress) => {
      menuRef.current.style.opacity = 1 - progress
      menuRef.current.style.transform = `translateY(${(progress * -50)}%)`
    },
    after: () => { toggle(false) },
    duration: 0.3,
    easingFunction: 'easeOutExpo'
  })


  useEffect(() => {
    openAnimation.play();
    const close = (e) => {
      if (e.target.dataset.dropdown) return;
      if (isClosing) return;
      closeAnimation.play();
    }

    window.addEventListener('click', close, false);
    return () => { window.removeEventListener('click', close, false); }
  }, [])


  return (
    <div className={styles.userDropdown}
      ref={menuRef}
      data-dropdown={true}>
      <Link href="/projects">
        <a data-dropdown={true}>내 프로젝트</a>
      </Link>
      <Link href="/projects">
        <a data-dropdown={true}>로그아웃</a>
      </Link>

    </div>
  )
}