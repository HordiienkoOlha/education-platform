import { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import * as api from '../../services/api';

import styles from './CourseDetails.module.css';
import Spiner from 'components/Spiner';
import { Button } from '@mui/material';
import LessonDetails from 'components/LessonDetails';

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [firstVideoLink, setFirstVideoLink] = useState('');
  const [showToggle, setShowToggle] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [lessonIndex, setLessonIndex] = useState();

  const { courseId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    api.fetchCourseIdDetails(courseId).then(data => {
      setCourseDetails(data);
      setFirstVideoLink(data.lessons[0].link);
    });
  }, [courseId]);

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

                <video controls>
                  <source src={firstVideoLink} type="video/webm" />
                </video>
              </li>
              <li className={styles.item}>
                <p className={styles.title}>
                  Description: {courseDetails.description}
                </p>
              </li>
              <li className={styles.item}>
                <ol className={styles.listLessons}>
                  {courseDetails.lessons.map((lesson, index) => {
                    const { id, title } = lesson;
                    return (
                      <li className={styles.itemLessons} key={id}>
                        <Button
                          variant="text"
                          color="secondary"
                          className={styles.link}
                          onClick={() => {
                            console.log('lesson.status', lesson.status);
                            setLesson(lesson);
                            setLessonIndex(index + 1);
                            if (lesson.status === 'locked') {
                              setShowToggle(false);
                            }
                            if (lesson.status === 'unlocked') {
                              setShowToggle(true);
                            }
                          }}
                        >
                          {title}
                        </Button>
                      </li>
                    );
                  })}
                </ol>
              </li>
            </ul>
            {showToggle ? (
              <LessonDetails lesson={lesson} lessonIndex={lessonIndex} />
            ) : (
              <p>This lesson is blocked</p>
            )}
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
