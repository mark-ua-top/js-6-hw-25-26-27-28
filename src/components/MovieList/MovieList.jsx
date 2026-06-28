import PropTypes from 'prop-types';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

const MovieList = ({ movies }) => {
    return (
        <ul className={styles.list}>
            {movies.map(movie => (
                <li key={movie.id} className={styles.item}>
                    <MovieCard movie={movie} />
                </li>
            ))}
        </ul>
    );
};

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            poster_path: PropTypes.string,
            vote_average: PropTypes.number,
            release_date: PropTypes.string,
        })
    ).isRequired,
};

export default MovieList;