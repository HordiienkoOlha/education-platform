import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';

const AppBar = lazy(() => import('components/AppBar/AppBar'));
const HomeView = lazy(() => import('views/HomeView'));

const CourseDetailsView = lazy(() => import('views/CourseDetailsView'));

const NotFoundView = lazy(() => import('views/NotFoundView'));

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<AppBar />}>
        <Route index element={<HomeView />} />
        {/* <Route index element={<CoursesList />} /> */}
        <Route path="/course/:courseId" element={<CourseDetailsView />}></Route>
      </Route>
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default App;
