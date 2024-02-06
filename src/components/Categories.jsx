const Categories = ({ value, onChangeCategory }) => {
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
                {categories.map((categoryName, index) => (
                    <li key={index} onClick={() => onChangeCategory(index)} className={value == index ? "active" : null}>{categoryName}</li>
                ))}
            </ul>
        </div>
    )
}

export default Categories;