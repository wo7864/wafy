import { useRouter } from 'next/router'
import Layout from '../components/layout'
import styles from '../styles/SignUpCompleted.module.css';
import gmStyles from '../styles/glassmorphism.module.css';


export default function SignUpCompleted() {
    const router = useRouter()
    return (
        <>
            <div className={styles.container}>
                <div className={
                    [gmStyles.container,
                    styles.completedContainer]
                        .join(' ')}>
                    <h2>축하합니다!</h2>
                    <p>회원가입이 완료되었어요.</p>
                    <p>홈으로 돌아가 더 둘러보거나, 내 프로젝트를 선택하여 새로운 프로젝트를 시작해봐요!</p>
                    <button className={
                        [gmStyles.button, styles.button].join(' ')
                    }
                        onClick={() => router.push('/')}
                    >
                        홈으로 돌아가기
                    </button>
                </div>
            </div>
        </>
    )
}


/*
    aws SMTP 서비스 구축 이슈로 이메일 인증은 추후로 연기
*/
    // return (
    //     <Layout signUp>
    //         <div className={styles.container}>
    //             <div className={
    //                 [gmStyles.container,
    //                 styles.completedContainer]
    //                     .join(' ')}>
    //                 <h2>거의 다 됐어요!</h2>
    //                 <p>입력한 메일로 인증을 위한 메일을 발송했어요. </p>
    //                 <p>해당 메일에서 링크를 클릭하면, 가입이 완료됩니다!</p>
    //                 <button className={
    //                     [gmStyles.button, styles.button].join(' ')
    //                 }
    //                     onClick={() => router.push('/')}
    //                 >
    //                     홈으로 돌아가기
    //                 </button>
    //             </div>
    //         </div>
    //     </Layout>
    // )
