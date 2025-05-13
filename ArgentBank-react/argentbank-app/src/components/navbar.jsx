import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice';

const Navigation = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user)
  const displayName = user?.userName ? user.userName : user?.firstName || "User";

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    dispatch(logout())
    navigate('/');
  };

  return (
    <>
      {isAuthenticated ? (
        <div className='navbar__links'>
          <NavLink to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {displayName}
          </NavLink>
          <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </div>
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