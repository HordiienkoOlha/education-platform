import { useEffect, useState } from 'react';
import usePagination from 'hooks/usePagination';
import { Button } from '@mui/material';

import * as api from 'services/api';
import Spiner from 'components/Spiner';
import styles from './CoursesList.module.css';
import scrollToTop from 'helpers/scrollToTop';
import { useNavigate } from 'react-router-dom';
import VideoPlayer from 'components/VideoPlayer/VideoPlayer';
import VideoPlayerWithHover from 'components/VideoPlayerWithHover/VideoPlayerWithHover';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    page,
    gaps,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 10,
    count: courses.length,
  });

  useEffect(() => {
    api
      .fetchCourses()
      .then(setCourses)
      .catch(error => {
        if (error.response) {
          // Обробка відповіді з помилкою
          setError(error.response.data.message);
        } else if (error.request) {
          // Обробка помилки мережі

          setError('Помилка мережі');
        } else {
          // Інші помилки
          setError('Помилка: ' + error.message);
        }
      })
      .finally(setLoading(false));
  }, []);
  return (
    <div className="Courses">
      <div className={styles.section}>
        {loading ? (
          <Spiner />
        ) : error ? (
          <h2>Error fetching users</h2>
        ) : (
          <>
            {courses && (
              <div>
                <h1 className={styles.title}>Courses</h1>
                <div className={styles.listWrapper}>
                  <ul className={styles.list}>
                    {courses
                      .slice(firstContentIndex, lastContentIndex)
                      .map(
                        ({
                          id,
                          title,
                          previewImageLink,
                          lessonsCount,
                          meta,
                          rating,
                        }) => {
                          const { skills } = meta;
                          return (
                            <li key={id} className={styles.item}>
                              <img
                                src={`${previewImageLink}/cover.webp`}
                                alt={title}
                                className={styles.image}
                              />

                              <div className={styles.content}>
                                <h2 className={styles.contentTitle}>{title}</h2>
                                <p className={styles.contentText}>
                                  LessonsCount: {lessonsCount}
                                </p>
                                <h3 className={styles.contentText}>Skills:</h3>
                                <ul className={styles.contentText}>
                                  {skills?.map((skill, index) => (
                                    <li key={index}>- {skill}</li>
                                  ))}
                                </ul>
                                <p className={styles.contentText}>
                                  Rating: {rating}
                                </p>
                              </div>
                              <div>
                                <VideoPlayerWithHover
                                  videoSrc={meta.courseVideoPreview.link}
                                />
                                <Button
                                  variant="outlined"
                                  color="warning"
                                  onClick={() => navigate(`/${id}`)}
                                >
                                  Course details
                                </Button>
                              </div>
                            </li>
                          );
                        }
                      )}
                  </ul>
                </div>
                <div className={styles.pagination}>
                  <button
                    onClick={prevPage}
                    className={`page ${page === 1 && 'disabled'}`}
                  >
                    &larr;
                  </button>
                  <button
                    onClick={() => {
                      setPage(1);
                      scrollToTop();
                    }}
                    className={`page ${page === 1 && 'disabled'}`}
                  >
                    1
                  </button>
                  {gaps.before ? '...' : null}
                  {gaps.paginationGroup.map(course => (
                    <button
                      onClick={() => {
                        setPage(course);
                        scrollToTop();
                      }}
                      key={course}
                      className={`page ${page === course ? 'active' : ''}`}
                    >
                      {course}
                    </button>
                  ))}
                  {gaps.after ? '...' : null}
                  <button
                    onClick={() => {
                      setPage(totalPages);
                      scrollToTop();
                    }}
                    className={`page ${page === totalPages && 'disabled'}`}
                  >
                    {totalPages}
                  </button>
                  <button
                    onClick={nextPage}
                    className={`page ${page === totalPages && 'disabled'}`}
                  >
                    &rarr;
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default CoursesList;
