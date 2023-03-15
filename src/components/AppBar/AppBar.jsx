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
      <Container>
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};

export default AppBar;
