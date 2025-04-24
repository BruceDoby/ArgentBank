import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
  isAuthenticated: !!localStorage.getItem("token"),
  error: null
}
  

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token
      state.isAuthenticated = true
      state.error = null
      localStorage.setItem("token", action.payload.token)
    },
    userInfoSuccess(state, action) {
      state.user = action.payload
      localStorage.setItem("user", JSON.stringify(action.payload))
    },
    loginFailure(state, action) {
      state.error = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("token") // 🧹 Nettoyage
      localStorage.removeItem("user")
    }
  }
})

export const { loginSuccess, loginFailure, userInfoSuccess, logout } = userSlice.actions
export default userSlice.reducer

// On définie d'abord l'état initial, en récupérant le token si un est trouvé, en récupérant les infos utilisateur si jamais il y en a,
// JSON.parse va parsé la chaine de caractère au format json pour en faire un objet javascript, étant unpeu le contraire de JSON.stringify 
// en vérifiant que l'utilisateur est connecté et en établissement une erreur potentielle d'abord initialisé en null, on crée ensuite notre
// slice avec la fonctionnalités createSlice importé depuis le redux toolkit, qui sert donc à créer un slice (partie spécifique de l'état
// globale redux contenant un name, un état initial et des reducers qui modifient l'état en fonction de l'action) les reducers sont donc ici
// loginSuccess, userInfoSucces, loginFailure et logout loginSuccess est déclenché après une connexion réussie, userInfoSuccess 
// lorsque les infos utilisateurs sont récupéré, loginFailure lorsque la connexion échoue et logout lorsque l'utilisateur se déconnecte
// chacun de ces reducers va donc mettre à jour un état spécifique, comme le token ou le user avec action.payload qui sert à envoyer les actions
// reçue au store redux, et le localstorage dans les 2 premiers reducer va permettre d'enregistrer ces infos dans celui-ci, parfois même
// en format de chaîne json avec json.stringify, et ensuite tout ça est exporté avec les deux export à la fin