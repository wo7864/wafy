import {
	useState,
	useContext
} from 'react'
import { useAsync } from 'react-async';

import Image from 'next/image'

import {
	createTemplateProject,
	getSimpleProjects
} from '../api/projects';

import { UserContext } from '../store/user'

import modalStyles from './modal.module.css'
import styles from './TemplateComponent.module.css'

import { 
	STATIC_THUMBNAIL_URL,
	EDITOR_URL
 } from '../utils/constant';


const TemplateButton = ({
	template,
	idx,
	selectedProject,
	select,
	closeModal
}) => {
	const { title, _id, thumbnail } = template;
	const [isHover, hover] = useState(false)
	const selected = (selectedProject === idx)
	const userData = useContext(UserContext);
	if(!userData) return console.error("not defined userData")

	const start = async () => {
		const res = await createTemplateProject(userData.id, template._id);
		if(res.status !== 201) return console.error("wrong response")
		window.open(`${EDITOR_URL}/${res.data.project_id}`)
		closeModal();
	}

	return (
		<div
			className={[
				styles.templateContainer,
				selectedProject !== -1 ?
					(selected ? styles.selected : styles.nonSelected)
					: ""
			].join(' ')
			}
			onMouseEnter={() => !selected ? hover(true) : ""}
			onMouseLeave={() => !selected ? hover(false) : ""}>
			<Image
				src={`${STATIC_THUMBNAIL_URL}/${thumbnail}`}
				alt="Template Thumbnail"
				width={400}
				height={250} />
			<h4>{title}</h4>

			{selected ?
				<>
					<p>
						정말 이 프로젝트로 시작하시겠어요?
					</p>
					<div className={styles.finalButtonContainer}>
						<button className={styles.cancle}
							onClick={() => select(-1)}>
							취소
						</button>
						<button className={styles.start}
							onClick={start}>
							시작
						</button>
					</div>

				</>
				: <></>

			}


			<div className={[
				styles.overlayButton,
				(isHover && !selected) ? styles.hover : ''
			].join(' ')}>
				<button>미리보기</button>
				<button onClick={() => { select(idx); hover(false); }}>선택</button>
			</div>
		</div>
	)
}

export default function TemplatesComponent({ closeModal }) {

	const [selectedProject, select] = useState(-1);

	const { data, error, isLoading } = useAsync({ promiseFn: getSimpleProjects });
	if (isLoading) {
		return <div></div>
	}
	return (
		<>
			<h2>템플릿 선택하기</h2>
			<p>원하는 템플릿을 선택해주세요.</p>
			<div className={
				styles.templateContents
			}>
				{data.data.map((template, idx) => {
					return (
						<TemplateButton
							key={"key-" + template.title + idx}
							template={template}
							idx={idx}
							selectedProject={selectedProject}
							select={select}
							closeModal={closeModal} />
					)
				})}

			</div>
			<button
				className={modalStyles.submit}
				onClick={() => {
					closeModal()
				}}>닫기</button>
		</>
	)
}

