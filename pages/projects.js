import Image from 'next/image'
import Layout from '../components/layout'
import styles from '../styles/Projects.module.css';
import gmStyles from '../styles/glassmorphism.module.css';
import { getDateString } from '../utils/utils';


// Projects Component
// description: index.js Page Main Component
const datas = [{
    _id: '1234567',
    data: {},
    title: "새로운 웹사이트",
    thumbnail: "",
    assets: {},
    create_date: getDateString(new Date(), '/'),
    update_date: getDateString(new Date(), '/')
},
{
    _id: '1234567',
    data: {},
    title: "새로운 웹사이트",
    thumbnail: "",
    assets: {},
    create_date: getDateString(new Date(), '/'),
    update_date: getDateString(new Date(), '/')
},

]

const Item = ({ data }) => {
    const { title, thumbnail, update_date } = data;
    return (
        <div className={styles.itemContainer}>
            <div className={styles.imageContainer}>
                {thumbnail ?
                    <Image src={thumbnail} />
                    :
                    <span>No Image</span>
                }
            </div>

            <h2>{title}</h2>
            <div className={styles.buttonContainer}>
                <a className={gmStyles.button} href="#">편집하기</a>
                <a className={gmStyles.button} href="#">환경설정</a>
            </div>

            <p className={styles.updateDate}>최종 수정일: <span>{update_date}</span></p>
        </div>
    )
}

export default function Projects() {

    return (
        <Layout>
            <div className={styles.container}>
                {datas.map(data => <Item key={data._id} data={data} />)}
            </div>
        </Layout>
    )
}

