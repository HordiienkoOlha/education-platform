import { useState, useEffect } from 'react';
import {
  // NavLink,
  // Outlet,
  useParams,
  // useLocation,
  useNavigate,
} from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
// import { BiArrowBack } from 'react-icons/bi';
import * as api from '../../services/api';

// import { IMG_URL, ANOTHER_IMG } from 'constants/constants';
// import Spiner from 'components/Spiner';
// import Container from 'components/Container';
import styles from './CourseDetails.module.css';
import Spiner from 'components/Spiner';
import { Button } from '@mui/material';

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const { courseId } = useParams();
  const navigate = useNavigate();
  console.log(courseDetails);

  useEffect(() => {
    setLoading(true);
    api
      .fetchCourseIdDetails(courseId)
      .then(setCourseDetails)
      .finally(setLoading(false));
  }, [courseId]);

  const { title } = courseDetails;

  // const poster = IMG_URL + poster_path;

  // const releaseTranform = () => {
  //   if (release_date === null) {
  //     return;
  //   }
  //   const releaseDate = String(release_date).slice(0, 4);
  //   const releaseYear = '(' + releaseDate + ')';
  //   return releaseYear;
  // };
  // const voteAverageTransform = () => {
  //   if (vote_average === null) {
  //     return;
  //   }
  //   const voteAverage = parseInt(vote_average * 10);
  //   const votePercentage = String(voteAverage) + '%';
  //   return votePercentage;
  // };
  return (
    <>
      <div>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate('/')}
        >
          <ArrowBackOutlinedIcon />
          &nbsp;Go back
        </Button>
      </div>
      <section className={styles.section}>
        {loading && <Spiner />}
        <p>{courseId}</p>

        <ul className={styles.list}>
          <li className={styles.item}>
            <h2 className={styles.filmTitle}>{title}</h2>
            <p>Vote average: </p>
          </li>
          <li className={styles.item}>
            <h3 className={styles.title}>Overviews</h3>
          </li>
          <li className={styles.item}>
            <h3 className={styles.title}>Genres</h3>
          </li>
        </ul>
      </section>
    </>
  );
};

export default CourseDetails;
