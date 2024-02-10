import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import QueryString from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sketeton";
import Sort, { sortList } from "../components/Sort";
import Pagination from "../components/Pagination";
import { setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";

const Home = ({ searchValue }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { categoryId, sort, currentPage } = useSelector(state => state.filter)

    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const fetchFoods = () => {
        setIsLoading(true)
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc',
            sortBy = sort.sortProperty.replace('-', ''),
            category = categoryId > 0 ? `category=${categoryId}` : '',
            search = searchValue && `&search=${searchValue}`

        axios.get(`https://65bd1a6db51f9b29e932ed9f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
            .then(({ data }) => {
                setItems(data)
                setIsLoading(false)
            })
    }

    useEffect(() => {
        if (isMounted.current) {
            const queryString = QueryString.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })

            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage, navigate])

    useEffect(() => {
        if (window.location.search) {
            const params = QueryString.parse(window.location.search.substring(1))

            const sort = sortList.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            fetchFoods()
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const foods = items.map(obj => (
        <PizzaBlock key={obj.id} {...obj} />
    ))
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

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
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
}

export default Home;