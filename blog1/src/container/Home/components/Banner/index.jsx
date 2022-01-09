import styles from './style.module.scss'

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.person}>
                <div className={styles.title}>title</div>
                <div className={styles.description}>description area</div>
            </div>
        </div>
    )
}

export default Banner