import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  return isAuthenticated ? children : <Navigate to="/" />
}

export default PrivateRoute

// useSelector : accède à l'état du store dans un composant
// PrivateRoute protège la page user pour la rendre "secrète"