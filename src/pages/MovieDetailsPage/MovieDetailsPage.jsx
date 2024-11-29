import { Suspense, useEffect, useState, useRef } from 'react';
import { Link, Outlet, useParams, useLocation, NavLink } from 'react-router-dom';
import { fetchMovieDetailsByMovieId } from '../../services/api';
import clsx from 'clsx';
import s from './MovieDetailsPage.module.css';
import { FaArrowLeft } from "react-icons/fa";

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    const goBackLink = useRef(location.state ?? '/');

    useEffect(() => {
        const getData = async () => {
            const data = await fetchMovieDetailsByMovieId(movieId);
            setMovie(data);
        };
        getData();
    }, [movieId]);

    if (!movie) {
        return null;
    }

    return (
        <div>
            <div className={clsx('container', s.back_link_container)}>
                <NavLink className={s.back_link} to={goBackLink.current}>
                    <FaArrowLeft />
                    Go Back
                </NavLink>
            </div>
            <div className={clsx('container', s.movie_container)}>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} width="300" height="400" />
                <div className={s.movie_info_container}>
                    <h2 className={s.header}>{`${movie.title} (${ movie.release_date.split('-')[0]})`}</h2>
                    <p>User Score: {movie.vote_count}%</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    <ul className={s.genres_list}>
                        {movie.genres.map((genre) => {
                        return (
                            <li key={genre.id}>{genre.name}</li>
                        )
                    })}

                    </ul>
                </div>
            </div>
            <div className={clsx('container', s.additional_info_container)}>
                <p>Additional information</p>
                <nav className={s.nav}>
                    <ul>
                        <li>
                            <Link to='cast'>Cast</Link>
                        </li>
                        <li>
                            <Link to='reviews'>Reviews</Link>
                        </li>
                    </ul>
                </nav>
                <Suspense fallback='Loading more info...'>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

export default MovieDetailsPage