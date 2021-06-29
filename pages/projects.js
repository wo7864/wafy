import { useState } from 'react'

import Image from 'next/image'

import { UserContext } from '../store/user'


import Layout from '../components/layout'
import Modal from '../components/modal'
import TemplatesComponent from '../components/TemplateComponent'

import styles from '../styles/Projects.module.css';
import gmStyles from '../styles/glassmorphism.module.css';
import modalStyles from '../components/modal.module.css'

import {
    SERVER_URL,
    EDITOR_URL,
} from '../utils/constant';
import { stringDateFormat } from '../utils/utils'
// Projects Component
// description: index.js Page Main Component

const thumbnailURL = `${SERVER_URL}/projects/thumbnail`

const Item = ({ data }) => {
    const { id, title, thumbnail, updatedAt } = data;

    const start = () => {
        window.open(`${EDITOR_URL}/${id}`)
    }

    return (
        <div className={styles.itemContainer}>
            <div className={styles.imageContainer}>
                {thumbnail ?
                    <Image src={`${thumbnailURL}/${thumbnail}`}
                        layout="fill" />
                    :
                    <span>No Image</span>
                }
            </div>

            <h2>{title}</h2>
            <div className={styles.buttonContainer}>
                <button onClick={start}>
                    편집하기
                </button>
                <a href="#">환경설정</a>
            </div>

            <p className={styles.updateDate}>최종 수정일: <span>{stringDateFormat(updatedAt)}</span></p>
        </div>
    )
}

export default function Projects() {

    const [isShowModal, toggleModal] = useState(false)


    const CreateProject = () => {
        return (
            <div className={styles.NoProjectContainer}>
                <h2>이런! 아직 프로젝트가 생성되지 않았네요.</h2>
                <h3>아래의 버튼을 눌러 새로운 프로젝트를 시작해봐요!</h3>
                <button className={
                    [gmStyles.button, styles.newProject].join(' ')}
                    onClick={() => { toggleModal(true) }}>
                    +
                </button>
            </div>
        )
    }

    return (
        <>
            <UserContext.Consumer>
                {({ projects }) => {
                    return (
                        projects.length ?
                            <div className={styles.container}>
                                <div className={styles.flexContainer}>
                                    {projects.map(data => <Item key={data.id} data={data} />)}
                                </div>
                            </div>
                            :
                            <CreateProject />
                    )
                }}

            </UserContext.Consumer>

            <Modal
                firstClassName={modalStyles.templatesModal}
                isShow={isShowModal}
                toggle={toggleModal}
                Children={[TemplatesComponent]}
            />
        </>
    )
}

