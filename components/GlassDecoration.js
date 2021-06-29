import styles from './GlassDecoration.module.css'
import gmStyles from '../styles/glassmorphism.module.css'

export default function GlassDecoration() {
    
    return (
        <>
            <div className={
                [gmStyles.container, styles.decoration].join(' ')
            }></div>
            <div className={
                [gmStyles.container, styles.decoration].join(' ')
            }></div>
        </>
    )
}
