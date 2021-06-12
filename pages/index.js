import Image from 'next/image'
import { useState } from 'react'
import Layout from '../components/layout'
import Modal from '../components/modal'
import styles from '../styles/Home.module.css'
import modalStyles from '../components/modal.module.css'

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

const TemplateButton = ({ title, src, alt }) => {
  const [isHover, hover] = useState(false)


  return (
    <button
      onMouseEnter={() => hover(true)}
      onMouseLeave={() => hover(false)}>
      <Image
        src={src}
        alt={alt}
        width={400}
        height={250} />
      <h4>{title}</h4>
      <div className={[
        modalStyles.overlayButton,
        isHover ? modalStyles.hover : ''
      ].join(' ')}>
        <button>미리보기</button>
        <button>선택</button>
      </div>
    </button>
  )
}

const TemplatesModal = ({
  closeModal,
}) => {
  return (
    <>
      <h2>템플릿 선택하기</h2>
      <p>원하는 템플릿을 선택해주세요.</p>
      <div className={modalStyles.templateContents}>
        <TemplateButton
          title="애플 웹사이트"
          src="/assets/images/template1.jpg"
          alt="apple template image" />
        <TemplateButton
          title="Future of FrontEnd"
          src="/assets/images/template2.jpg"
          alt="apple template image" />

        <TemplateButton
          title="Ombia Studio"
          src="/assets/images/template3.jpg"
          alt="apple template image" />




      </div>
      <button
        className={modalStyles.submit}
        onClick={() => {
          closeModal()
        }}>닫기</button>
    </>
  )
}



// Home Component
// description: index.js Page Main Component

export default function Home() {
  const [isShowStartModal, toggleStartModal] = useState(false)

  return (
    <Layout>

      <section className={styles.container}>
        <video
          className={styles.backgroundVideo}
          src="/assets/videos/main-3.mp4"
          muted
          autoPlay />
        <div className={styles.section1Contents}>
          <h1>오직 나만의 브랜딩 웹사이트를 <br />직접 만들어보세요!</h1>

          <button
            onClick={() => { toggleStartModal(true) }}>
            지금 만들어 보기
          </button>
        </div>

      </section>
      <Modal
        className={modalStyles.emailModal}
        isShow={isShowStartModal}
        toggle={toggleStartModal}
        Children={[EmailModal, TemplatesModal]}
      />


    </Layout>
  )
}

