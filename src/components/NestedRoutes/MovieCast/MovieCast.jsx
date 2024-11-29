import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCastByMovieId } from '../../../services/api';
import s from './MovieCast.module.css';

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
        <ul className={s.actor_list}>
            {cast && !cast.length && <p>We don`t have any cast list for this movie.</p>}
            {cast?.map((actor) => (
                <li className={s.actor_list_item} key={actor.id}>
                    <img src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`} width="90" height="120"/>
                    <p>{actor.name}</p>
                    <p>Character: {actor.character}</p>
                </li>
            ))}
        </ul>
  )
}

export default MovieCast