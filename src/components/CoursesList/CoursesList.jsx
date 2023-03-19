import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import * as api from 'services/api';
import usePagination from 'hooks/usePagination';
import scrollToTop from 'helpers/scrollToTop';
import Spiner from 'components/Spiner';
import VideoPlayerWithHover from 'components/VideoPlayerWithHover/VideoPlayerWithHover';
import styles from './CoursesList.module.css';

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
    <section className={styles.section}>
      {error && <p>{error}</p>}
      {loading ? (
        <Spiner />
      ) : error ? (
        <h2>Error fetching users</h2>
      ) : (
        <>
          {courses.length > 1 && (
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
                              <ul>
                                <li>
                                  <p className={styles.contentText}>
                                    Lessons count: {lessonsCount}
                                  </p>
                                </li>
                                <li>
                                  {skills && (
                                    <div>
                                      <h3 className={styles.contentText}>
                                        Skills:
                                      </h3>
                                      <ul className={styles.contentText}>
                                        {skills?.map((skill, index) => (
                                          <li key={index}>- {skill}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                </li>
                                <li>
                                  <p className={styles.contentText}>
                                    Rating: {rating}
                                  </p>
                                </li>
                                <li>
                                  {meta?.courseVideoPreview?.link ? (
                                    <div className={styles.videoWrapper}>
                                      <VideoPlayerWithHover
                                        videoSrc={meta.courseVideoPreview.link}
                                      />
                                    </div>
                                  ) : (
                                    <p>
                                      The video is not available for viewing
                                    </p>
                                  )}
                                </li>
                                <li>
                                  <Button
                                    variant="outlined"
                                    color="warning"
                                    onClick={() => navigate(`/${id}`)}
                                    className={styles.button}
                                  >
                                    Course details
                                  </Button>
                                </li>
                              </ul>
                            </div>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
              {courses.length > 10 && (
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
              )}
            </div>
          )}
        </>
      )}
    </section>
  );
};
export default CoursesList;
