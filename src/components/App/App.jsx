import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import Loader from '../Loader/Loader';
import styles from './App.module.css';

const Home = lazy(() => import('../../pages/Home/Home'));
const Movies = lazy(() => import('../../pages/Movies/Movies'));
const MovieDetails = lazy(() =>
    import('../../pages/MovieDetails/MovieDetails')
);
const Cast = lazy(() => import('../../pages/Cast/Cast'));
const Reviews = lazy(() => import('../../pages/Reviews/Reviews'));

const App = () => {
    return (
        <div className={styles.app}>
            <Navigation />

            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/movies/:movieId" element={<MovieDetails />}>
                        <Route path="cast" element={<Cast />} />
                        <Route path="reviews" element={<Reviews />} />
                    </Route>
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </div>
    );
};

export default App;