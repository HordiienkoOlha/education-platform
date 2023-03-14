import { NavLink, Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
// import { ImFilm } from 'react-icons/im';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.icon}>
        <Link to="/">
          <SchoolIcon sx={{ fontSize: 30 }}/>
        </Link>
      </div>
      <ul className={styles.list}>
        <li>
          <NavLink
            exact="true"
            to="/"
            className={({ isActive }) =>
              isActive ? styles['active-link'] : styles.link
            }
          >
            Courses
          </NavLink>
        </li>
        <li className={styles.movie}>
          <NavLink
            to="/lesson"
            className={({ isActive }) =>
              isActive ? styles['active-link'] : styles.link
            }
          >
            Lesson
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
