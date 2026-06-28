import { useEffect, useRef, useState } from 'react';
import {
    Link,
    NavLink,
    Outlet,
    useLocation,
    useParams,
} from 'react-router-dom';
import { fetchMovieDetails, IMAGE_BASE_URL } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import styles from './MovieDetails.module.css';

const PLACEHOLDER_IMAGE =
    'https://via.placeholder.com/300x450?text=No+Image';

const MovieDetails = () => {
    const { movieId } = useParams();
    const location = useLocation();
    const backLinkRef = useRef(location.state?.from ?? '/');

    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getMovie = async () => {
            try {
                setIsLoading(true);
                setError('');
                const data = await fetchMovieDetails(movieId);
                setMovie(data);
            } catch (err) {
                setError('Не вдалося завантажити інформацію про фільм.');
            } finally {
                setIsLoading(false);
            }
        };

        getMovie();
    }, [movieId]);

    const getLinkClass = ({ isActive }) =>
        isActive ? `${styles.subLink} ${styles.active}` : styles.subLink;

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className={styles.message}>{error}</p>;
    }

    if (!movie) {
        return null;
    }

    const {
        title,
        overview,
        genres,
        poster_path,
        vote_average,
        release_date,
    } = movie;

    const posterUrl = poster_path
        ? `${IMAGE_BASE_URL}${poster_path}`
        : PLACEHOLDER_IMAGE;

    const userScore =
        typeof vote_average === 'number' ? Math.round(vote_average * 10) : 'N/A';

    const year = release_date ? release_date.slice(0, 4) : 'N/A';

    return (
        <main className={styles.container}>
            <Link to={backLinkRef.current} className={styles.backLink}>
                ← Go back
            </Link>

            <div className={styles.card}>
                <img src={posterUrl} alt={title} className={styles.image} />

                <div className={styles.info}>
                    <h1 className={styles.title}>
                        {title} ({year})
                    </h1>

                    <p className={styles.text}>
                        <strong>User score:</strong> {userScore}%
                    </p>

                    <h2 className={styles.subtitle}>Overview</h2>
                    <p className={styles.text}>{overview || 'Опис відсутній.'}</p>

                    <h2 className={styles.subtitle}>Genres</h2>
                    <p className={styles.text}>
                        {genres?.map(genre => genre.name).join(', ') || 'Немає жанрів'}
                    </p>
                </div>
            </div>

            <div className={styles.extra}>
                <h3 className={styles.extraTitle}>Additional information</h3>
                <ul className={styles.subList}>
                    <li>
                        <NavLink to="cast" className={getLinkClass}>
                            Cast
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="reviews" className={getLinkClass}>
                            Reviews
                        </NavLink>
                    </li>
                </ul>

                <Outlet />
            </div>
        </main>
    );
};

export default MovieDetails;