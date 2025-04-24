import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice';

const Navigation = () => {
  // const token = localStorage.getItem('authToken');
  // const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  // const isUserPage = location.pathname === '/user';

  const isAuthenticated = useSelector(state => state.user.isAuthenticated);
  const user = useSelector(state => state.user.user)
  const firstName = user?.firstName || "User"

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('authToken');
    dispatch(logout())
    navigate('/');
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <NavLink to="/user" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {firstName}
          </NavLink>
          <NavLink to="/" className="main-nav-item" onClick={handleLogout}>
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

// && isUserPage
// La const isAuthenticated va permettre de vérifier si l'utilisateur est connecté ou non depuis le store redux, la const user va récupérer
// les infos de l'utilisateur et la const firstName va contenir le prénom de l'utilisateur ou "user" si le prénom n'est pas disponible
// La const handleLogOut va déconnecter l'utilisateur lorsque celui ci cliquera sur le bouton sign out en supprimant le token, en évitant
// de recharger automatiquement la page, en envoyant l'action au store et en renvoyant l'utilisateur à l'accueil après coup