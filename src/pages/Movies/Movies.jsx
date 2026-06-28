import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import styles from './Movies.module.css';

const Movies = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const queryFromUrl = searchParams.get('query') ?? '';

    const [inputValue, setInputValue] = useState(queryFromUrl);
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setInputValue(queryFromUrl);
    }, [queryFromUrl]);

    useEffect(() => {
        if (!queryFromUrl.trim()) {
            setMovies([]);
            return;
        }

        const getMovies = async () => {
            try {
                setIsLoading(true);
                setError('');
                const data = await searchMovies(queryFromUrl);
                setMovies(data);
            } catch (err) {
                setError('Помилка під час пошуку фільмів.');
            } finally {
                setIsLoading(false);
            }
        };

        getMovies();
    }, [queryFromUrl]);

    const handleSubmit = event => {
        event.preventDefault();

        const normalizedQuery = inputValue.trim();

        if (!normalizedQuery) {
            alert('Введіть назву фільму');
            return;
        }

        setSearchParams({ query: normalizedQuery });
    };

    return (
        <main className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    className={styles.input}
                    placeholder="Search movies"
                />
                <button type="submit" className={styles.button}>
                    Search
                </button>
            </form>

            {isLoading && <Loader />}
            {error && <p className={styles.message}>{error}</p>}

            {!isLoading && !error && queryFromUrl && movies.length === 0 && (
                <p className={styles.message}>Нічого не знайдено.</p>
            )}

            {!isLoading && !error && movies.length > 0 && (
                <MovieList movies={movies} />
            )}
        </main>
    );
};

export default Movies;