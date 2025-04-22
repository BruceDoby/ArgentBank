import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  const isUserPage = location.pathname === '/user';

  return (
    <>
      {token && isUserPage ? (
        <>
          <NavLink to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Tony
          </NavLink>
          <NavLink to="/sign-in" className="main-nav-item">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </>
      ) : (
        <NavLink to="/sign-in" className="main-nav-item">
          <i className="fa fa-user-circle"></i>
          Sign In
        </NavLink>
      )}
    </>
  );
};

export default Navigation;

/*
      <NavLink to="/sign-in" className="main-nav-item">
      <i className="fa fa-user-circle"></i>
      Sign In
      </NavLink>

      enlever token && pour montrer que ça marche
*/