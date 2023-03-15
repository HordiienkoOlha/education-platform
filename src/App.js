import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const AppBar = lazy(() => import('components/AppBar/AppBar'));
const CoursesList = lazy(() => import('components/CoursesList'));

const Lesson = lazy(() => import('components/Lesson'));

const NotFoundView = lazy(() => import('views/NotFoundView'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route path="/" element={<CoursesList />} />
        <Route index element={<CoursesList />} />
        <Route path="/lesson" element={<Lesson />} />
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default App;
