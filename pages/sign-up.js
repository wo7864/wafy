import {
    useState,
    useContext,
} from 'react';
import { useRouter } from 'next/router'
import {
    FaRegCheckCircle,
    FaCheckCircle
} from 'react-icons/fa';

import Layout from '../components/layout'
import GlassDecoration from '../components/GlassDecoration';

import styles from '../styles/SignUp.module.css';
import gmStyles from '../styles/glassmorphism.module.css';
import {
    emailValidation,
    pwValidation,
    pwcValidation
} from '../utils/validation';
import { signUp } from '../api/users';
import { UserContext } from '../store/user'


export default function SignUp() {
    const router = useRouter()
    const userData = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');
    const [pwc, setPwc] = useState('');

    const [invalidEmail, setInvalidEmail] = useState('waiting');
    const [invalidPw, setInvalidPw] = useState('waiting');
    const [invalidPwc, setInvalidPwc] = useState('waiting');

    const [privacy, setPrivacy] = useState(false);



    const submit = async () => {

        if (!(invalidEmail === "valid" &&
            invalidPw === "valid" &&
            invalidPwc === "valid" &&
            privacy)) {
            console.error('잘못된 정보입니다!');
            return;
        };

        const res = await signUp({
            email: email,
            password: pw
        })
        if (res.status == 200) {
            userData.setUser(res.data.user)
            router.push('/')
        }


        router.push('/sign-up-completed')
    }

    const emailvalidate = () => {
        if (!emailValidation(email)) setInvalidEmail('invalid');
        else setInvalidEmail("valid");
    }

    const pwvalidate = () => {
        if (!pwValidation(pw)) setInvalidPw('invalid');
        else setInvalidPw("valid");
    }

    const pwcvalidate = () => {
        if (!pwcValidation(pw, pwc)) setInvalidPwc('invalid');
        else setInvalidPwc("valid");
    }

    return (
        <div className={styles.container}>
            <div className={
                [gmStyles.container,
                styles.formContainer]
                    .join(' ')}>
                <GlassDecoration />

                <h1>회원가입</h1><br />

                <div className={
                    [styles.inputArea,
                    invalidEmail === "invalid" ?
                        styles.invalidEmail : ''].join(' ')
                }>
                    <input type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={emailvalidate}
                        autoComplete="off"
                        required />
                    <label htmlFor="email">이메일</label>
                </div>
                <div className={
                    [styles.inputArea,
                    invalidPw === "invalid" ?
                        styles.invalidPw : ''].join(' ')
                }>
                    <input type="password"
                        id="pw"
                        value={pw}
                        onChange={(e) => setPw(e.target.value)}
                        onBlur={() => {
                            pwvalidate();
                            if (invalidPwc !== "waiting")
                                pwcvalidate();
                        }}
                        required />
                    <label htmlFor="pw">비밀번호</label>
                </div>
                <div className={
                    [styles.inputArea,
                    invalidPwc === "invalid" ?
                        styles.invalidPwc : ''].join(' ')
                }>
                    <input type="password"
                        id="pwc"
                        value={pwc}
                        onChange={(e) => setPwc(e.target.value)}
                        onBlur={pwcvalidate}
                        required />
                    <label htmlFor="pwc">비밀번호 확인</label>
                </div>

                <div className={styles.submitArea}>

                    <div className={
                        [styles.privacyArea,
                        privacy ? styles.isChecked : ''].join(' ')
                    }
                        onClick={(e) => setPrivacy(!privacy)}>
                        <label className={styles.checkbox}>
                            {privacy ? <FaCheckCircle /> : <FaRegCheckCircle />}
                        </label>
                        <label>개인정보취급에 동의합니다</label>

                    </div>

                    <button className={[styles.submit, gmStyles.button].join(' ')}
                        onClick={submit}
                    >
                        가입
                    </button>
                </div>
            </div>
        </div>
    )
}
