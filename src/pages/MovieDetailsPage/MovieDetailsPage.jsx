import { Suspense, useEffect, useState, useRef } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import { fetchMovieDetailsByMovieId } from '../../services/api';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
    const location = useLocation();
    console.log(location);
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
            <Link to={goBackLink.current}>Go Back</Link>
            <div>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
                <div>
                    <h2>{`${movie.title} (${ movie.release_date.split('-')[0]})`}</h2>
                    <p>User Score: {movie.vote_count}%</p>
                    <h3>Overview</h3>
                    <p>{movie.overview}</p>
                    <h3>Genres</h3>
                    {movie.genres.map((genre) => {
                        return (
                            <p key={genre.id}>{genre.name}</p>
                        )
                    })}
                </div>
            </div>
            <div>
                <nav>
                    <Link to='cast'>Cast</Link>
                    <Link to='reviews'>Reviews</Link>
                </nav>
                <Suspense fallback='Loading more info...'>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}

export default MovieDetailsPage