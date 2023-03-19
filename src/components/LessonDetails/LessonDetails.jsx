import PropTypes from 'prop-types';

import VideoPlayerForLesson from 'components/VideoPlayerForLesson';
import styles from './LessonDetails.module.css';

const LessonDetails = ({ lesson, lessonIndex, courseId }) => {
  // console.log('courseId', courseId);

  return (
    <div className={styles.section}>
      <h4 className={styles.title}>Lesson {lessonIndex} </h4>
      <ul>
        <li className={styles.item}>
          <p>Lesson title: {lesson.title}</p>
        </li>
        <li className={styles.item}>
          <VideoPlayerForLesson
            videoSrc={lesson.link}
            courseId={courseId}
            lessonId={lesson.id}
          />
        </li>
      </ul>
    </div>
  );
};

export default LessonDetails;

LessonDetails.propTypes = {
  lesson: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }),
};
