import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoute

// On importe useSelector qui permet d'accéder à l'état du store dans un composant, on établir ensuite notre fonction avec children qui
// va permettre de passer des composant à privateroute, la const va permettre d'accéder à l'état global du store et précisèment à la valeure
// de isAuthenticated (donc pour vérifier si l'on est connecté ou non) et la vérification renvoyé avec return permet de décider si oui ou non
// notre fonction décide d'afficher la page User, sinon on est renvoyé à l'accueil
// La PrivateRoute va permettre de protéger la page d'User pour empêcher les individus non authentifiés d'y accéder, ça en fais une page privée