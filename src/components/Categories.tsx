import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
};

const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
	const categories = ['Все', 'Мясные', 'Морские', 'Вегетерианские', 'Острые', 'Домашние'];

	return (
		<div className="categories">
			<ul>
				{categories.map((categoryName, index) => (
					<li
						key={index}
						onClick={() => onChangeCategory(index)}
						className={value == index ? 'active' : null}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
});

export default Categories;
