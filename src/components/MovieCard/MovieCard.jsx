import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { IMAGE_BASE_URL } from '../../services/api';
import styles from './MovieCard.module.css';

const PLACEHOLDER_IMAGE =
    'https://via.placeholder.com/300x450?text=No+Image';

const MovieCard = ({ movie }) => {
    const location = useLocation();

    const { id, title, poster_path, vote_average, release_date } = movie;

    const posterUrl = poster_path
        ? `${IMAGE_BASE_URL}${poster_path}`
        : PLACEHOLDER_IMAGE;

    const year = release_date ? release_date.slice(0, 4) : 'N/A';
    const rating =
        typeof vote_average === 'number' ? vote_average.toFixed(1) : 'N/A';

    return (
        <Link to={`/movies/${id}`} state={{ from: location }} className={styles.card}>
            <img src={posterUrl} alt={title} className={styles.image} />
            <div className={styles.content}>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.meta}>
                    {year} | ⭐ {rating}
                </p>
            </div>
        </Link>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
    }).isRequired,
};

export default MovieCard;