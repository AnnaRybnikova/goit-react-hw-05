import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCastByMovieId } from '../../services/api';

const MovieCast = () => {
    const { movieId } = useParams();
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const getCast = async () => {
            const details = await fetchMovieCastByMovieId(movieId);
            console.log(details);
            setCast(details);
        };
        getCast();
    }, [movieId]);

    return (
        <ul>
            {cast && !cast.length && <h2>Movie has no reviews</h2>}
            {cast?.map((actor) => (
                <li key={actor.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}/>
                    <p>{actor.name}</p>
                    <p>Character: {actor.character}</p>
                </li>
            ))}
        </ul>
  )
}

export default MovieCast