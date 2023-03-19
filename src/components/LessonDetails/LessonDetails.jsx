import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import PropTypes from 'prop-types';

const LessonDetails = ({ lesson, lessonIndex }) => {
  console.log(lesson);

  return (
    <>
      <h3>Lesson {lessonIndex} </h3>
      <p>{lesson.title}</p>
      <VideoPlayer videoSrc={lesson.link} lessonIndex={lessonIndex} />
    </>
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
