import { Link } from "react-router-dom";

const NotFoundView = () => {
  return (
    <h1>
      Page not found :(, go to
      <Link to="/">Home</Link>
    </h1>
  );
};

export default NotFoundView;