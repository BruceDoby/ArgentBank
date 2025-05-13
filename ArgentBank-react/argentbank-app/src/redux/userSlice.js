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
    updateUserSuccess(state, action) {
      state.user = { ...state.user, ...action.payload }; // fusionne l'ancienne valeure avec la nouvelle pour garder les infos non touchées
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    loginFailure(state, action) {
      state.error = action.payload
    },
    logout(state) {
      state.token = null
      state.user = null
      state.isAuthenticated = false
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }
})

export const { loginSuccess, loginFailure, userInfoSuccess, logout, updateUserSuccess } = userSlice.actions
export default userSlice.reducer

// createSlice s'occupe de générer la création de notre Slice, contenant un name, un état initial et des reducers qui modifient l'état
// en fonction de l'action
// On défini en premier l'état initial, JSON.parse va ârsé la chaine de caractère au format json pour en faire un objet javascript, au
// contre de JSON.stringify par exemple
// logInSuccess : après un connexion réussie, userInfoSuccess : lorsque les infos utilisateur sont récup, updateUserSuccess : lorsque
// les infos utilisateur ont été modifié avec succès, loginFailure : lorsque la connexion échoue et logout : lorsque l'user se déconnecte
// Chacun mets à jour un état spécifique à partir d'une action envoyée, tel que le token ou le user
// Action.payload : envoie les actions reçue