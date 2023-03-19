import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import PropTypes from 'prop-types';

import styles from './LessonDetails.module.css';

const LessonDetails = ({ lesson, lessonIndex }) => {
  // console.log(lesson);

  return (
    <div className={styles.section}>
      <h4 className={styles.title}>Lesson {lessonIndex} </h4>
      <ul>
        <li className={styles.item}>
          <p>Lesson title: {lesson.title}</p>
        </li>
        <li className={styles.item}>
          <VideoPlayer videoSrc={lesson.link} lessonIndex={lessonIndex} />
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
