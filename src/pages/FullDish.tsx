import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styles from "./FullDish.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemById } from "../redux/slices/cart/selectors";
import { CartItem } from "../redux/slices/cart/types";
import { addItem } from "../redux/slices/cart/slice";
import { PizzaBlockProps } from "../components/PizzaBlock";

const typesName = ["специальное", "традиционное"];

const FullDish: React.FC = () => {
    const { id } = useParams();
    const [dish, setDish] = useState<PizzaBlockProps>();
    const dispatch = useDispatch();
    const cartItem = useSelector(selectCartItemById(id!));
    const addedCount = cartItem ? cartItem.count : 0;

    const [activeType, setActiveType] = useState(0);
    const [activeSize, setActiveSize] = useState(0);

    const onClickAdd = () => {
        const item: CartItem = {
            id: dish?.id!,
            title: dish?.title!,
            price: dish?.price!,
            imageUrl: dish?.imageUrl!,
            type: typesName[activeType],
            size: dish?.sizes[activeSize]!,
            count: 0,
        };
        dispatch(addItem(item));
    };

    useEffect(() => {
        async function fetchDish() {
            try {
                const { data } = await axios.get(
                    `https://65bd1a6db51f9b29e932ed9f.mockapi.io/items/${id}`
                );
                setDish(data);
            } catch (error) {
                alert(`Error! Couldn't to get dish :(`);
            }
        }

        fetchDish();
    }, []);

    if (!dish) {
        return <h2>Загрузка...</h2>;
    }
    return (
        <div className={styles.inner}>
            <img src={dish.imageUrl} style={{ maxWidth: 300 }} alt="image" />
            <div className={styles.info}>
                <h2>{dish.title}</h2>
                <p className={styles.price}>{dish.price} руб.</p>
                <p>{dish.description}</p>
                <div
                    className={`pizza-block__selector ${styles.selectors_block}`}
                >
                    <ul>
                        {dish.types.map((typeId) => (
                            <li
                                key={typeId}
                                onClick={() => setActiveType(typeId)}
                                className={
                                    activeType === typeId ? "active" : ""
                                }
                            >
                                {typesName[typeId]}
                            </li>
                        ))}
                    </ul>
                    <ul>
                        {dish.sizes.map((size, index) => (
                            <li
                                key={index}
                                onClick={() => setActiveSize(index)}
                                className={activeSize === index ? "active" : ""}
                            >
                                {size} г.
                            </li>
                        ))}
                    </ul>
                </div>
                <div
                    onClick={onClickAdd}
                    className={`button button--outline button--add ${styles.button}`}
                >
                    <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="white"
                        />
                    </svg>
                    <span>Добавить в корзину</span>
                    {addedCount > 0 && <i>{addedCount}</i>}
                </div>
            </div>
        </div>
    );
};

export default FullDish;
