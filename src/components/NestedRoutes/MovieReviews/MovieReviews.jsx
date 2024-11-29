import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsByMovieId } from '../../../services/api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
    const { movieId } = useParams();
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getDetails = async () => {
            const details = await fetchMovieReviewsByMovieId(movieId);
            console.log(details);
            setReviews(details);
        };
        getDetails();
    }, [movieId]);

    return (
        <ul className={s.reviews_list}>
            {reviews && !reviews.length && <p>We don`t have any reviews for this movie.</p>}
            {reviews?.map((review) => (
                <li className={s.reviews_list_item} key={review.id}>
                    <p className={s.author}> Author: {review.author} </p>
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
  )
}

export default MovieReviews