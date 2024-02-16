import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import QueryString from "qs";
import { Link, useNavigate } from "react-router-dom";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Sketeton";
import Sort, { sortList } from "../components/Sort";
import Pagination from "../components/Pagination";

import { selectFilter, setCategoryId, setCurrentPage, setFilters } from "../redux/slices/filterSlice";
import { fetchFoods, selectFoods } from "../redux/slices/foodsSlice";

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const isSearch = useRef(false)
    const isMounted = useRef(false)

    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter)
    const { items, status } = useSelector(selectFoods)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (num) => {
        dispatch(setCurrentPage(num))
    }

    const getFoods = async () => {
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc',
            sortBy = sort.sortProperty.replace('-', ''),
            category = categoryId > 0 ? `category=${categoryId}` : '',
            search = searchValue && `&search=${searchValue}`

        dispatch(fetchFoods({
            order,
            sortBy,
            category,
            search,
            currentPage
        }))
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
            getFoods()
        }

        isSearch.current = false;
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    const foods = items.map(obj => (
        <Link key={obj.od} to={`/dish/${obj.id}`}>
            <PizzaBlock {...obj} />
        </Link >
    ))
    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />)

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={onChangeCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все блюда</h2>
            {
                status === 'error' ? (
                    <div className="content__info-error">
                        <h2>Произошла ошибка 😕</h2>
                        <p>
                            К сожалению, не удалось получить блюда<br />
                            Попробуйте, повторить попытку позже
                        </p>
                    </div>
                ) : (
                    <div className="content__items">
                        {status === 'loading' ? skeletons : foods}
                    </div>
                )
            }
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    );
}

export default Home;