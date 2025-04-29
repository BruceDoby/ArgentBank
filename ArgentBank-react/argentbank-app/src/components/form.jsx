import { useDispatch } from "react-redux"
import { loginSuccess, loginFailure, userInfoSuccess } from "../redux/userSlice"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

function Form() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null);
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: username, password })
      })

      const data = await response.json()
      if (data.body && data.body.token) {
        localStorage.setItem('authToken', data.body.token);
        dispatch(loginSuccess({ token: data.body.token }))

        // Récupérer les infos du user maintenant qu'on a le token
        const profileRes = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${data.body.token}`
          }
        })     

        const profileData = await profileRes.json()
        dispatch(userInfoSuccess(profileData.body))
        navigate("/user")
      } else {
        setError("Invalid credentials");
        dispatch(loginFailure("Invalid credentials"))
      }
    } catch (err) {
      setError("Network error");
      dispatch(loginFailure("Network error"))
    }
  }

    return(
      <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="input-remember">
        <input type="checkbox" id="remember-me" /><label htmlFor="remember-me">Remember me</label>
      </div>
      {error && <div className="error-message">{error}</div>}
      <button type="submit" className="sign-in-button">Sign In</button>
    </form>
    )
}

export default Form

// Ligne 7 à 11 : on va faire appel à différent hooks react, react-redux ainsi que react-router pour notre fonction, le useState servant
// à gérer l'état local dans un composant, on en fais un pour chaque fonctionnalités futur : le nom d'utilisateur, le mot de passe, et de
// potentielles erreurs, le useDispatch sert lui à envoyer des actions à Redux, ça va donc modifier l'état global du store pour le mettre à
// jour avec les données partagés (donc le nom d'utilisateur, le mdp, etc) et useNavigate va permettre de naviguer entre les pages
// Ligne 13 : début de la fonction handleSubmit qui va se charger de gérer l'envoi des données, notamment première en empêchant le rechargement
// de la page avec prevent.default et en remettant l'erreur locale à null pour éviter d'afficher un message précédent (donc pour pas avoir
// le même message qui reste)
// Ligne 17 on effectue un appel à l'API pour y envoyer des données, le headers va faire comprendre à l'API comment les données doivent
// être interprétés (données au format json) et le body précise ce qui doit être passé : le mdp et l'email en tant que nom d'utilisateur
// Ligne 24 : On stocke ensuite la réponse de l'API (le token) et on la vérifie, pour savoir si l'utilisateur est connecté ou non, on stocke ensuite
// ce token dans le store redux en envoyant l'action loginSuccess avec le token grâce à dispatch
// Ligne 28 : On récupère les infos de l'utilisateur via le token avec la requête GET effectué après l'appel API à un lien différent
// on spécifie l'autorisation que l'on a contenant donc le token, prouvant que l'on est connecté, une fois tout ça récupéré on les envoie
// au store Redux et on redirige l'utilisateur vers sa page
// Et à la fin pour intercepter les potentiels erreurs on a un else et un catch qui renvoie non seulement une erreur au store redux mais
// aussi une erreur au sein du HTML pour indiquer à l'utilisateur l'erreur concernés