// import { useState, useEffect } from 'react';
// import {
//   useParams,
//   useNavigate,
//   Link,
//   useLocation,
//   Outlet,
// } from 'react-router-dom';
// import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
// import * as api from '../../services/api';

// import styles from './LessonDetails.module.css';
// import Spiner from 'components/Spiner';
// import { Button } from '@mui/material';

const LessonDetails = () => {
  //   const [lesson, setLesson] = useState(null);
  // const [loading, setLoading] = useState(false);
  //   const [firstVideoLink, setFirstVideoLink] = useState('');
  //   const { courseId } = useParams();
  // console.log('courseId', courseId);
  // const [searchParams] = useSearchParams();
  // console.log("searchParams", searchParams);
  // const location = useLocation();
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     api.fetchCourseIdDetails(courseId).then(data => {
  //       setCourseDetails(data);
  //       setFirstVideoLink(data.lessons[0].link);
  //     });
  //   }, [courseId]);

  return (
    <>
      <h3>LessonDetails</h3>
      {/* <section className={styles.section}>
        {courseDetails ? (
          <ul className={styles.list}>
            <li className={styles.item}>
              <h2 className={styles.filmTitle}>
                Course: {courseDetails.title}
              </h2>

              <video controls></video>
              <source src={firstVideoLink} type="video/webm" />
            </li>
            <li className={styles.item}>
              <ol className={styles.listLessons}>
                {courseDetails.lessons.map(({ id, title }) => {
                  return (
                    <li className={styles.itemLessons} key={id}>
                              <Link
          state={location.state}
          to={`/courses/${courseId}/${id}`}
          className={styles.link}
        >
         {title}
        </Link>
                    </li>
                  );
                })}
              </ol>
            </li>
            <li className={styles.item}>
              <p className={styles.title}>
                Description: {courseDetails.description}
              </p>
            </li>
          </ul>
        ) : (
          <Spiner />
        )}
      </section> */}
    </>
  );
};

export default LessonDetails;
