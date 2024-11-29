import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import s from './MovieList.module.css';

const MovieList = ({ movies, location }) => {
    return (
        <div>
            <ul className={s.movie_list}>
                {movies.map(movie => {
                    return (<li key={movie.id}>
                        <Link to={`/movies/${movie.id.toString()}`} state={location}>
                            <p>{movie.title}</p>
                        </Link>
                    </li>)
                })}
            </ul>
        </div>
    )
}

MovieList.propTypes = {
    movies: PropTypes.array.isRequired,
    location: PropTypes.object.isRequired,
}

export default MovieList