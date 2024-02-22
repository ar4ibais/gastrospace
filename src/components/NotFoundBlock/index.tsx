import { Link } from 'react-router-dom';
import styles from './NotFoundBlock.module.scss'

const NotFoundBlock = () => {
    return (
        <>
            <div className={styles.root}>
                <h1>Not Found... </h1>
                <Link to='/'>
                    <button style={{ fontSize: 22 }}> Вернуться на главную</button>
                </Link>
            </div>
        </>
    )
}

export default NotFoundBlock;