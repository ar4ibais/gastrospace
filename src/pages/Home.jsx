import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sketeton";
import Sort from "../components/Sort";
import Pagination from "../components/Pagination";
import { setCategoryId } from "../redux/slices/filterSlice";

const Home = ({ searchValue }) => {
    const dispatch = useDispatch()
    const { categoryId, sort } = useSelector(state => state.filter)

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1)

    const foods = items.map(obj => (
        <PizzaBlock key={obj.id} {...obj} />
    ))
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    useEffect(() => {
        setIsLoading(true)
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc',
            sortBy = sort.sortProperty.replace('-', ''),
            category = categoryId > 0 ? `category=${categoryId}` : '',
            search = searchValue && `&search=${searchValue}`
        fetch(
            `https://65bd1a6db51f9b29e932ed9f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        )
            .then(data => data.json())
            .then(json => {
                setItems(json)
                setIsLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sort, searchValue, currentPage])

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все блюда</h2>
            <div className="content__items">
                {isLoading ? skeletons : foods}
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)} />
        </div>
    );
}

export default Home;