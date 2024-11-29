import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsByMovieId } from '../../services/api';

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
        <ul>
            {reviews && !reviews.length && <h2>Movie has no reviews</h2>}
            {reviews?.map((review) => (
                <li key={review.id}>
                    Author: {review.author}
                    <p>{review.content}</p>
                </li>
            ))}
        </ul>
  )
}

export default MovieReviews