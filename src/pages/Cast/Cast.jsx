import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits, IMAGE_BASE_URL } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import styles from './Cast.module.css';

const PLACEHOLDER_PHOTO =
    'https://via.placeholder.com/200x300?text=No+Photo';

const Cast = () => {
    const { movieId } = useParams();

    const [cast, setCast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getCast = async () => {
            try {
                setIsLoading(true);
                setError('');
                const data = await fetchMovieCredits(movieId);
                setCast(data);
            } catch (err) {
                setError('Не вдалося завантажити акторський склад.');
            } finally {
                setIsLoading(false);
            }
        };

        getCast();
    }, [movieId]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className={styles.message}>{error}</p>;
    }

    if (cast.length === 0) {
        return <p className={styles.message}>Інформація про акторів відсутня.</p>;
    }

    return (
        <ul className={styles.list}>
            {cast.map(({ id, name, character, profile_path }) => {
                const image = profile_path
                    ? `${IMAGE_BASE_URL}${profile_path}`
                    : PLACEHOLDER_PHOTO;

                return (
                    <li key={id} className={styles.item}>
                        <img src={image} alt={name} className={styles.image} />
                        <p className={styles.name}>{name}</p>
                        <p className={styles.character}>Character: {character || 'Unknown'}</p>
                    </li>
                );
            })}
        </ul>
    );
};

export default Cast;