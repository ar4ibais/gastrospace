import { useState } from "react";

const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(0)

    const categories = [
        'Все',
        'Мясные',
        'Морские',
        'Вегетерианские',
        'Острые',
        'Домашние'
    ];

    return (
        <div className="categories">
            <ul>
                {categories.map((title, index) => (
                    <li key={index} onClick={() => setActiveIndex(index)} className={activeIndex == index && "active"}>{title}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;