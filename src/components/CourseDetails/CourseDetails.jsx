import { useState, useEffect } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router-dom';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';

import * as api from '../../services/api';

import styles from './CourseDetails.module.css';
import Spiner from 'components/Spiner';
import { Button } from '@mui/material';
import LessonDetails from 'components/LessonDetails';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';

const CourseDetails = () => {
  const [courseDetails, setCourseDetails] = useState(null);
  const [firstVideoLink, setFirstVideoLink] = useState('');
  const [showToggle, setShowToggle] = useState(false);
  const [showLesson, setShowLesson] = useState(false);
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
    <section className={styles.section}>
      <div className={styles.buttonWrapper}>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => navigate('/')}
        >
          <ArrowBackOutlinedIcon />
          &nbsp;Go back
        </Button>
      </div>
      <div>
        {courseDetails ? (
          <>
            {/* <li className={styles.item}> */}
            <h2 className={styles.title}>
              <span className={styles.titleDetails}>Course: </span>
              {courseDetails.title}
            </h2>
            {/* </li> */}
            <ul className={styles.list}>
              <li className={styles.item}>
                <VideoPlayer videoSrc={firstVideoLink} />
              </li>
              <li className={styles.item}>
                <p className={styles.description}>
                  <span className={styles.titleDetails}>Description: </span>
                  {courseDetails.description}
                </p>
              </li>
              <li className={styles.item}>
                <h3 className={styles.titleLessons}>Lessons:</h3>
                <ol className={styles.listLessons}>
                  {courseDetails.lessons.map((lesson, index) => {
                    const { id, title } = lesson;
                    return (
                      <li className={styles.itemLessons} key={id}>
                        <button
                          // variant="text"
                          // color="secondary"
                          className={styles.button}
                          onClick={() => {
                            console.log('lesson.status', lesson.status);
                            setLesson(lesson);
                            setLessonIndex(index + 1);
                            setShowLesson(true);
                            if (lesson.status === 'locked') {
                              setShowToggle(false);
                            }
                            if (lesson.status === 'unlocked') {
                              setShowToggle(true);
                            }
                          }}
                        >
                          {title}
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </li>
              <div className={styles.item}>
                {showLesson &&
                  (showToggle ? (
                    <LessonDetails lesson={lesson} lessonIndex={lessonIndex} />
                  ) : (
                    <p>Lesson {lessonIndex} is locked</p>
                  ))}
              </div>
            </ul>
          </>
        ) : (
          <Spiner />
        )}
      </div>

      <Outlet />
    </section>
  );
};

export default CourseDetails;
