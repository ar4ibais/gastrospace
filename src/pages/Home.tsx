import React, { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import QueryString from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Sketeton';
import SortComponent, { sortList } from '../components/Sort';
import Pagination from '../components/Pagination';

import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import { fetchFoods, selectFoods } from '../redux/slices/foodsSlice';
import { useAppDispatch } from '../redux/store';

import f1 from '../../public/foods/bolonese.png';
import f2 from '../../public/foods/cesar.png';
import f3 from '../../public/foods/burger.png';
import f4 from '../../public/foods/carbonara.png';
import f5 from '../../public/foods/molluski.png';
import f6 from '../../public/foods/mushroom-soup.png';
import f7 from '../../public/foods/rostbeef.png';
import f8 from '../../public/foods/sushi.png';
import f9 from '../../public/foods/grek-salad.png';

console.log(f1, f2, f3, f4, f5, f6, f7, f8, f9);

const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const isSearch = useRef(false);
	const isMounted = useRef(false);

	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const { items, status } = useSelector(selectFoods);

	const onChangeCategory = useCallback((id: number) => {
		dispatch(setCategoryId(id));
	}, []);

	const onChangePage = (num: number) => {
		dispatch(setCurrentPage(num));
	};

	const getFoods = async () => {
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc',
			sortBy = sort.sortProperty.replace('-', ''),
			category = categoryId > 0 ? `category=${categoryId}` : '',
			search = searchValue && `&search=${searchValue}`;

		dispatch(
			fetchFoods({
				order,
				sortBy,
				category,
				search,
				currentPage: String(currentPage),
			}),
		);
	};

	useEffect(() => {
		if (isMounted.current) {
			const queryString = QueryString.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});

			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage, navigate]);

	useEffect(() => {
		if (window.location.search) {
			const params = QueryString.parse(window.location.search.substring(1));

			const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				}),
			);
			isSearch.current = true;
		}
	}, []);

	useEffect(() => {
		if (!isSearch.current) {
			getFoods();
		}

		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);

	const foods = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
	const skeletons = [...new Array(4)].map((_, i) => <Skeleton key={i} />);

	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={onChangeCategory} />
				<SortComponent value={sort} />
			</div>
			<h2 className="content__title">Все блюда</h2>
			{status === 'error' ? (
				<div className="content__info-error">
					<h2>Произошла ошибка 😕</h2>
					<p>
						К сожалению, не удалось получить блюда
						<br />
						Попробуйте, повторить попытку позже
					</p>
				</div>
			) : (
				<div className="content__items">{status === 'loading' ? skeletons : foods}</div>
			)}
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</div>
	);
};

export default Home;
