import {
    useEffect,
    useRef,
    useState,
} from 'react'
import finAnima, { FinAnima } from 'finished-animation'
import styles from './modal.module.css'


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

    const openAnimation = new FinAnima({
        func:(progress)=>{
            backgroundCoverRef.current.style.opacity = progress * 2
            containerRef.current.style.transform = `translateY(${ 200 - (progress * 200)}%)`
        },
        duration:0.7,
        easingFunction:'easeOutExpo'
    })
    const closeAnimation = new FinAnima({
        func:(progress) => {
            backgroundCoverRef.current.style.opacity = 1 - progress
            containerRef.current.style.transform = `translateY(${(progress * 50)}%)`
        },
        after:()=>{toggle(false)},
        duration:0.7,
        easingFunction:'easeOutExpo'
    })

    const closeModal = () => {
        if (isClosing) return;
        close(true)
        closeAnimation.play();
    }

    useEffect(() => { openAnimation.play(); }, [])
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
                    closeModal={closeModal} />
            </div>
        </div>
    )
}