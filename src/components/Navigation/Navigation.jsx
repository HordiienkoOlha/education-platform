import { NavLink, Link } from 'react-router-dom';
// import { IconContext } from 'react-icons';
// import { ImFilm } from 'react-icons/im';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.icon}>
        <Link to="/">
          {/* <IconContext.Provider
            value={{ color: '#1e496d', style: { verticalAlign: 'middle' } }}
          >
            <div>
              <ImFilm size={50}/>
            </div>
          </IconContext.Provider> */}
          Courses
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
