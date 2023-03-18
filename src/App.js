import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spiner from 'components/Spiner';

const AppBar = lazy(() => import('components/AppBar/AppBar'));
const HomeView = lazy(() => import('views/HomeView'));
const CourseDetailsView = lazy(() => import('views/CourseDetailsView'));
const NotFoundView = lazy(() => import('views/NotFoundView'));

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={<Spiner />}>
            <AppBar />
          </Suspense>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Spiner />}>
              <HomeView />
            </Suspense>
          }
        />
        <Route
          path="/:courseId"
          element={
            <Suspense fallback={<Spiner />}>
              <CourseDetailsView />
            </Suspense>
          }
        />
      </Route>
      <Route
        path="*"
        element={
          <Suspense fallback={<Spiner />}>
            <NotFoundView />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default App;
