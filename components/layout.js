import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  useEffect,
  useState,
  useRef,
  useContext,
} from 'react'
import { useAsync } from 'react-async';

import { MdPerson } from 'react-icons/md'
import { FinAnima } from 'finished-animation'

import { UserContext } from '../store/user'
import {
  authUser,
  signOut as signOutApi
} from '../api/users'
import styles from './layout.module.css'
import Loading from './loading'

export const siteTitle = 'Wafy'

export default function Layout({ children, signUp }) {
  const userData = useContext(UserContext);
  if (!userData.id) {
    const { data: user, error, isLoading } = useAsync({
      promiseFn: authUser
    });
    if (isLoading) return <Loading />;
    if (error) console.error('토큰이 없습니다.');
    if (!user) console.error('적절한 데이터를 전송받지 못했습니다.');
    if(user) userData.setUser(user)
  }

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
        <title>{siteTitle}</title>
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <TopNavigation
        signUp={signUp}
        user={userData} />
      <main>
        {children}

      </main>

      <footer>

      </footer>
    </div>
  )
}


/* 상단 헤더 네비게이션 바 */
const TopNavigation = ({ signUp, user }) => {
  const [isUserDropdown, toggleUserDropdown] = useState(false)

  let userRouter;
  if (user.id && user.id !== 'guest') {
    userRouter = (
      <button className={styles.icons}
        onClick={() => !isUserDropdown ? toggleUserDropdown(!isUserDropdown) : ''}>
        <MdPerson />
      </button>
    )
  } else {
    if (signUp) {
      userRouter = (
        <Link href="/sign-in">
          <a>로그인</a>
        </Link>
      )
    } else {
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
          user={user}
          toggle={toggleUserDropdown} />
        : <></>}

    </header>

  )
}


/* 
*   내 프로젝트
*   로그아웃
*   드롭다운 메뉴
*/
const UserDropdown = ({ user, toggle }) => {
  const router = useRouter()
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
      if (!menuRef) return;
      menuRef.current.style.opacity = 1 - progress
      menuRef.current.style.transform = `translateY(${(progress * -50)}%)`
    },
    after: () => { toggle(false) },
    duration: 0.3,
    easingFunction: 'easeOutExpo'
  })

  const closeEvent = (e) => {
    if (e && e.target.dataset.dropdown) return;
    if (isClosing) return;
    closeAnimation.play();
  }

  useEffect(() => {
    openAnimation.play();
    window.addEventListener('click', closeEvent, false);
    return () => { window.removeEventListener('click', closeEvent, false); }
  }, [])

  const signOut = async () => {
    await signOutApi();
    user.setUser({
      id: 'guest'
    })
    closeEvent()
    router.push('/')
  }


  return (
    <div className={styles.userDropdown}
      ref={menuRef}
      data-dropdown={true}>
      <Link href="/projects">
        <a data-dropdown={true}>내 프로젝트</a>
      </Link>
      <button data-dropdown={true}
        onClick={signOut}
      >
        로그아웃</button>

    </div>
  )
}