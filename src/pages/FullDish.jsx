import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FullDish = () => {
    const { id } = useParams()
    const [dish, setDish] = useState()


    useEffect(() => {
        async function fetchDish() {
            try {
                const { data } = await axios.get(`https://65bd1a6db51f9b29e932ed9f.mockapi.io/items/${id}`)
                setDish(data)
            } catch (error) {
                alert(`Error! Couldn't to get dish :(`)
            }
        }

        fetchDish()
    }, [])

    if (!dish) {
        return <h2>Загрузка...</h2>
    }
    return (
        <>
            <img src={`../${dish.imageUrl}`} alt="image" />
            <h2>{dish.title}</h2>
            <p>{dish.price} руб.</p>
        </>
    );
}

export default FullDish;