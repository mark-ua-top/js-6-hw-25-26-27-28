import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../services/api';
import Loader from '../../components/Loader/Loader';
import styles from './Reviews.module.css';

const Reviews = () => {
    const { movieId } = useParams();

    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const getReviews = async () => {
            try {
                setIsLoading(true);
                setError('');
                const data = await fetchMovieReviews(movieId);
                setReviews(data);
            } catch (err) {
                setError('Не вдалося завантажити відгуки.');
            } finally {
                setIsLoading(false);
            }
        };

        getReviews();
    }, [movieId]);

    if (isLoading) {
        return <Loader />;
    }

    if (error) {
        return <p className={styles.message}>{error}</p>;
    }

    if (reviews.length === 0) {
        return <p className={styles.message}>Відгуків поки немає.</p>;
    }

    return (
        <ul className={styles.list}>
            {reviews.map(({ id, author, content }) => (
                <li key={id} className={styles.item}>
                    <h4 className={styles.author}>Author: {author}</h4>
                    <p className={styles.content}>{content}</p>
                </li>
            ))}
        </ul>
    );
};

export default Reviews;