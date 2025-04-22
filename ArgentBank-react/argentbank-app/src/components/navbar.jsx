import { NavLink } from 'react-router-dom';

const Navigation = () => {
  return (
    <>
    <nav>
      <i className="fa fa-user-circle"></i>
      <NavLink to="/sign-in" className="main-nav-item">Sign In</NavLink>
    </nav>
    </>
  );
};

export default Navigation;