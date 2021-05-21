import {
    useEffect,
    useRef,
    useState,
} from 'react'
import styles from './modal.module.css'

function easeOutExpo(x) {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}




export default function Modal({
    Children,
    firstClassName,
    isShow,
    toggle
}) {
    if (!isShow) return <></>
    const backgroundCoverRef = useRef(null)
    const containerRef = useRef(null)
    const [isClosing, close] = useState(false)
    const [className, setClassName] = useState(firstClassName)
    const [childIndex, setChildIndex] = useState(0)
    const Contents = Children[childIndex]
    const openModal = () => {
        let opacity = 0;
        let transY = 50;
        let start
        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = (timestamp - start) / 600
            const easeProgress = easeOutExpo(progress)

            if (progress < 1) {
                opacity = easeProgress * 2
                transY = 200 - easeProgress * 200
                backgroundCoverRef.current.style.opacity = opacity
                containerRef.current.style.transform = `translateY(${(transY)}%)`
                requestAnimationFrame(step)
            } else {
                backgroundCoverRef.current.style.opacity = 1
                containerRef.current.style.transform = `translateY(0%)`
            }
        }
        requestAnimationFrame(step)
    }

    const closeModal = () => {
        if (isClosing) return;
        close(true)

        let opacity = 1;
        let transY = 0;
        let start
        const step = (timestamp) => {
            if (!start) start = timestamp
            const progress = (timestamp - start) / 600
            const easeProgress = easeOutExpo(progress)

            if (progress < 1) {
                opacity = 1 - (easeProgress)
                transY = easeProgress * 50
                backgroundCoverRef.current.style.opacity = opacity
                containerRef.current.style.transform = `translateY(${(transY)}%)`
                requestAnimationFrame(step)
            } else {
                backgroundCoverRef.current.style.opacity = 0
                containerRef.current.style.transform = `translateY(200%)`
                toggle(false)
            }
        }
        requestAnimationFrame(step)
    }

    useEffect(() => { openModal() }, [])
    return (
        <div
            className={[styles.backgroundCover, className].join(' ')}
            style={{ opacity: 0 }}
            onClick={closeModal}
            ref={backgroundCoverRef}>
            <div
                className={styles.container}
                ref={containerRef}
                onClick={e => e.stopPropagation()}>

                <Contents
                    setClassName={setClassName}
                    setChildIndex={setChildIndex}
                    closeModal={closeModal}/>
            </div>
        </div>
    )
}