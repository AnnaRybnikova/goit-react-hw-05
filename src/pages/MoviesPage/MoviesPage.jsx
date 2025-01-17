import { useEffect, useState } from 'react';
import { Formik, Form, Field } from "formik";
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import { fetchMovieByKeyWord } from '../../services/api';
import { useLocation } from 'react-router-dom';
import s from './MoviesPage.module.css';

const MoviesPage = () => {
    const [movies, setMovies] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();

    useEffect(() => {
        const getResults = async () => {
            const data = await fetchMovieByKeyWord(searchParams.get('query'));
            setMovies(data);
        };
        getResults();
    }, [searchParams]);

    const handleSubmit = (newValue) => {
        searchParams.set('query', newValue);
        setSearchParams(searchParams);
    }

    const initialValues = {
        query: '',
    };

    return (
        <div className='container'>
            <Formik onSubmit={({query}) => handleSubmit(query)} initialValues={initialValues}>
                <Form className={s.form}>
                    <Field  name='query' placeholder='Enter movie name' />
                    <button type='submit'>Search</button>
                </Form>
            </Formik>
            <MovieList movies={movies} location={location} />
        </div>
    )
}

export default MoviesPage