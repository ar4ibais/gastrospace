import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sketeton";
import Sort from "../components/Sort";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch("https://65bd1a6db51f9b29e932ed9f.mockapi.io/items")
            .then(data => data.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="container">
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все блюда</h2>
            <div className="content__items">
                {
                    isLoading ?
                        [...new Array(6)].map((_, i) => <Skeleton key={i} />)
                        :
                        items.map(obj => (
                            <PizzaBlock key={obj.id} {...obj} />
                        ))
                }
            </div>
        </div>
    );
}

export default Home;