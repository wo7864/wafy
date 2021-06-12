import { useState } from 'react';
import { useRouter } from 'next/router'
import Layout from '../components/layout'
import styles from '../styles/SignUp.module.css';
import gmStyles from '../styles/glassmorphism.module.css';
import {
    FaRegCheckCircle,
    FaCheckCircle
} from 'react-icons/fa';


export default function SignUp() {
    const router = useRouter()
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [privacy, setPrivacy] = useState(false);
    return (
        <Layout signUp>
            <div className={styles.container}>
                <div className={
                    [gmStyles.container,
                    styles.formContainer]
                        .join(' ')}>

                    <h1>회원가입</h1><br />

                    <div className={styles.inputArea}>
                        <input type="text" id="email" autoComplete="off" required />
                        <label htmlFor="email">이메일</label>
                    </div>
                    <div className={styles.inputArea}>
                        <input type="password" id="pw" required />
                        <label htmlFor="pw">비밀번호</label>
                    </div>
                    <div className={styles.inputArea}>
                        <input type="password" id="pwc" required />
                        <label htmlFor="pwc">비밀번호 확인</label>
                    </div>

                    <div className={styles.submitArea}>

                        <div className={
                            [styles.privacyArea,
                                privacy? styles.isChecked : ''].join(' ')
                        }
                        onClick={(e)=>setPrivacy(!privacy)}>
                            <label className={styles.checkbox}>
                                {privacy ? <FaCheckCircle /> : <FaRegCheckCircle />}
                            </label>
                            <label>개인정보취급에 동의합니다</label>

                        </div>

                        <button className={[styles.submit, gmStyles.button].join(' ')}
                            onClick={()=>router.push('/sign-up-completed')}
                        >
                            가입
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
