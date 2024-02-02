import styles from './NotFoundBlock.module.scss'
import { Link } from 'react-router-dom';

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