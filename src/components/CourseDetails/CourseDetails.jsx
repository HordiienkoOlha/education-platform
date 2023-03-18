import { useState, useEffect } from 'react';
import {
  useParams,
  useNavigate,
  // Link,
  useLocation,
  Outlet,
} from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import * as api from '../../services/api';

import styles from './CourseDetails.module.css';
import Spiner from 'components/Spiner';
import { Button } from '@mui/material';
import LessonDetails from 'components/LessonDetails';

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [firstVideoLink, setFirstVideoLink] = useState('');
  const [showLesson, setShowLesson] = useState(false);

  const { courseId } = useParams();
  // const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchCourseIdDetails(courseId).then(data => {
      setCourseDetails(data);
      setFirstVideoLink(data.lessons[0].link);
    });
  }, [courseId]);

  // data.lessons.filter(({status})=>{if{status === "locked"}})

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
        {courseDetails ? (
          <>
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
                        <Button
                          variant="text"
                          color="secondary"
                          className={styles.link}
                          onClick={()=>setShowLesson(true)}
                        >
                          {title}
                        </Button>
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
            {showLesson && <LessonDetails />}
          </>
        ) : (
          <Spiner />
        )}
      </section>

      <Outlet />
    </>
  );
};

export default CourseDetails;
