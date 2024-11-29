import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { fetchTrendingMovies } from '../../services/api';
import { useLocation } from 'react-router-dom';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const location = useLocation();
    console.log(location);

    useEffect(() => {
        const getResults = async () => {
            const data = await fetchTrendingMovies();
            setMovies(data);
        };
        getResults();
    }, []);


    return (
        <div className='container'>
            <h1>Trending today</h1>
            <MovieList movies={movies} location={location} />
        </div>
    )
}

export default HomePage