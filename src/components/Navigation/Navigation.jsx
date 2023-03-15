import { Link } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';

import styles from './Navigation.module.css';

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Link to="/">
        <div className={styles.content}>
          <div className={styles.icon}>
            <SchoolIcon sx={{ fontSize: 40 }} />
          </div>
          <p className={styles.title}>Education platform</p>
        </div>
      </Link>
    </nav>
  );
};

export default Navigation;
