import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sketeton";
import Sort from "../components/Sort";

const Home = () => {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true)
        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc',
            sortBy = sortType.sortProperty.replace('-', ''),
            category = categoryId > 0 ? `category=${categoryId}` : ''
        fetch(
            `https://65bd1a6db51f9b29e932ed9f.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`
        )
            .then(data => data.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id) => setCategoryId(id)} />
                <Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
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