import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import Spinner from 'components/Spiner';
import Navigation from 'components/Navigation/Navigation';
import Container from 'components/Container';

const AppBar = () => {
  return (
    <>
      <header>
        <Container>
          <Navigation />
        </Container>
      </header>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default AppBar;
