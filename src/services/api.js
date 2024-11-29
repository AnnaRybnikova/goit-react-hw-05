import axios from 'axios';

const TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZDBiZDU4YjkxZTdjMDdiYzVmMGZmNWM0Y2Q4OGE3ZiIsIm5iZiI6MTczMjgzNTEzMS44MTQ3NDQyLCJzdWIiOiI2NzQ4ZjJhNDNlNTljNDUyZTJhMWY1NTAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Y8giGqRlb0wXQdQcTL04UkOxGsqu2GWU8h4ysePdEjI';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers = {
    Authorization: `Bearer ${TOKEN}`,
    Accept: 'application/json',
};
axios.defaults.params = {
    language: 'en-US',
};

export const fetchTrendingMovies = async () => {
    const { data } = await axios.get('/trending/movie/day');
    return data.results;
};

export const fetchMovieByKeyWord = async (query) => {
    const { data } = await axios.get('/search/movie', {
        params: {
            query,
        }
    });
    return data.results;
};

export const fetchMovieDetailsByMovieId = async (movieId) => {
    const { data } = await axios.get(`/movie/${movieId}`);
    return data;

};

export const fetchMovieCastByMovieId = async (movieId) => {
    const { data } = await axios.get(`/movie/${movieId}/credits`);
    return data.cast;
};

export const fetchMovieReviewsByMovieId = async (movieId) => {
    const { data } = await axios.get(`/movie/${movieId}/reviews`);
    return data.results;
};