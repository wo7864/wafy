import { useState } from 'react'
import Layout from '../components/layout'
import Modal from '../components/modal'
import GlassDecoration from '../components/GlassDecoration'

import styles from '../styles/Home.module.css'
import modalStyles from '../components/modal.module.css'
import TemplatesComponent from '../components/TemplateComponent'
const EmailModal = ({
  setClassName,
  setChildIndex
}) => {
  return (
    <>

      <h2>이메일 입력하기</h2>
      <p>이메일만 입력하면 나만의 웹사이트를 만들어 볼 수 있어요!</p>
      <input type="text" />
      <button
        className={modalStyles.submit}
        onClick={() => {
          setClassName(modalStyles.templatesModal)
          setChildIndex(1)
        }}>확인</button>
    </>
  )
}



// Home Component
// description: index.js Page Main Component

export default function Home() {
  const [isShowStartModal, toggleStartModal] = useState(false)

  return (
    <>
      <section className={styles.container}>
        <video
          className={styles.backgroundVideo}
          src="/assets/videos/main-3.mp4"
          muted
          autoPlay />
        <div className={styles.section1Contents}>
          <GlassDecoration/>
          <h1>오직 나만의 브랜딩 웹사이트를 <br />직접 만들어보세요!</h1>
          <button
            onClick={() => { toggleStartModal(true) }}>
            지금 만들어 보기
          </button>
        </div>

      </section>
      <Modal
        firstClassName={modalStyles.emailModal}
        isShow={isShowStartModal}
        toggle={toggleStartModal}
        Children={[EmailModal, TemplatesComponent]}
      />
      </>
  )
}

