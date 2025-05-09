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
  // const firstName = user?.firstName || "User"
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

// && isUserPage
// La const isAuthenticated va permettre de vérifier si l'utilisateur est connecté ou non depuis le store redux, la const user va récupérer
// les infos de l'utilisateur et la const firstName va contenir le prénom de l'utilisateur ou "user" si le prénom n'est pas disponible
// La const handleLogOut va déconnecter l'utilisateur lorsque celui ci cliquera sur le bouton sign out en supprimant le token, en évitant
// de recharger automatiquement la page, en envoyant l'action au store et en renvoyant l'utilisateur à l'accueil après coup
// Modification effectuée le 07/05 : on a remplace la const firstName qui vérifiait si le prénom était disponible pour l'affiche dans
// la barre de connexion par la const displayName, qui vérifie maintenant d'abord si le userName existe, si oui c'est lui qui est affiché
// sinon c'est le firstName et si l'on a aucun des deux on affiche juste le mot "user" au cas où