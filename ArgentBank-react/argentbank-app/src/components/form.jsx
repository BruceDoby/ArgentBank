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

// Appel à différent hook react-redux : useState, useNavigate et useDispatch (s'occupe d'envoyer des actions au store)
// Requête post établissant le nom d'utilisateur pour se connecter en tant qu'email
// Requête get pour récup les infos utilisateur une fois connecté