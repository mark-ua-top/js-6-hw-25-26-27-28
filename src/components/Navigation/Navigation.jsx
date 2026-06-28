import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

const Navigation = () => {
    const getLinkClass = ({ isActive }) =>
        isActive ? `${styles.link} ${styles.active}` : styles.link;

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <NavLink to="/" className={styles.logo}>
                    🎬 КіноПошук
                </NavLink>

                <div className={styles.links}>
                    <NavLink to="/" end className={getLinkClass}>
                        Home
                    </NavLink>
                    <NavLink to="/movies" className={getLinkClass}>
                        Movies
                    </NavLink>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;