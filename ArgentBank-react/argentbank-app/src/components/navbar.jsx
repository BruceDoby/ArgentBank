import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const token = localStorage.getItem('authToken');
  const location = useLocation();
  const navigate = useNavigate();

  const isUserPage = location.pathname === '/user';

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <>
      {token && isUserPage ? (
        <>
          <NavLink to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Tony
          </NavLink>
          <NavLink to="/sign-in" className="main-nav-item" onClick={handleLogout}>
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