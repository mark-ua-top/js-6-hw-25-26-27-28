import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

const token = process.env.REACT_APP_TMDB_TOKEN;

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
    },
    params: {
        language: 'uk-UA',
    },
});

export const fetchTrendingMovies = async () => {
    const { data } = await axiosInstance.get('/trending/movie/day');
    return data.results;
};

export const searchMovies = async query => {
    const { data } = await axiosInstance.get('/search/movie', {
        params: { query },
    });
    return data.results;
};

export const fetchMovieDetails = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}`);
    return data;
};

export const fetchMovieCredits = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/credits`);
    return data.cast;
};

export const fetchMovieReviews = async movieId => {
    const { data } = await axiosInstance.get(`/movie/${movieId}/reviews`);
    return data.results;
};

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';