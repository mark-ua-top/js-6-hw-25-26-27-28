import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import styles from './Home.module.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getMovies = async () => {
            try {
                setIsLoading(true);
                setError('');
                const data = await fetchTrendingMovies();
                setMovies(data);
            } catch (err) {
                setError('Не вдалося завантажити популярні фільми.');
            } finally {
                setIsLoading(false);
            }
        };

        getMovies();
    }, []);

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>Trending today</h1>

            {isLoading && <Loader />}
            {error && <p className={styles.message}>{error}</p>}
            {!isLoading && !error && <MovieList movies={movies} />}
        </main>
    );
};

export default Home;