import {
    useState,
    useContext,
} from 'react';
import { useRouter } from 'next/router'
import GlassDecoration from '../components/GlassDecoration';

import styles from '../styles/SignUp.module.css';
import gmStyles from '../styles/glassmorphism.module.css';
import { signIn } from '../api/users';
import { UserContext } from '../store/user'




function SignIn() {
    const router = useRouter()
    const userData = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');


    const submit = async () => {

        if (!(email && pw)) {
            console.error('입력되지 않은 항목이 존재합니다.');
            return;
        };

        const res = await signIn({
            email: email,
            password: pw
        })
        if (res.status == 200) {
            userData.setUser(res.data.user)
            router.push('/')
        } else {
            alert('로그인에 실패했습니다.')
        }
    }

    return (
            <div className={styles.container}>
                <div className={
                    [gmStyles.container,
                    styles.formContainer]
                        .join(' ')}>
                    <GlassDecoration />

                    <h1>로그인</h1><br />

                    <div className={styles.inputArea}>
                        <input type="text"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="off"
                            required />
                        <label htmlFor="email">이메일</label>
                    </div>
                    <div className={styles.inputArea}>

                        <input type="password"
                            id="pw"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                            onKeyPress={(e) => {if(e.key === "Enter") submit();}}
                            required />
                        <label htmlFor="pw">비밀번호</label>
                    </div>


                    <div className={styles.submitArea}>

                        <div className={styles.resetPw}>
                            비밀번호를 잊으셨나요?
                        </div>

                        <button className={[styles.submit, gmStyles.button].join(' ')}
                            onClick={submit}
                        >
                            로그인
                        </button>
                    </div>
                </div>
            </div>
    )
}

export default SignIn