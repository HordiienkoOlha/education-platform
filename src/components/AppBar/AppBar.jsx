import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Spinner from 'components/Spiner';
import Navigation from 'components/Navigation/Navigation';

const AppBar = () => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default AppBar;
