import Container from 'components/Container';
import { Link } from 'react-router-dom';

const NotFoundView = () => {
  return (
    <Container>
      <h1>
        Page not found :(, go to
        <Link to="/">Home</Link>
      </h1>
    </Container>
  );
};

export default NotFoundView;
