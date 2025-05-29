import { Link } from "react-router-dom";
import image404 from "/404.png";
import styles from "./NotFoundBlock.module.scss";

const NotFoundBlock = () => {
    return (
        <>
            <div className={styles.root}>
                <img
                    className={styles.image404}
                    src={image404}
                    alt="404 image"
                />
                <Link to="/">
                    <button className="button"> Вернуться на главную</button>
                </Link>
            </div>
        </>
    );
};

export default NotFoundBlock;
