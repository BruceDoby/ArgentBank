import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

const persistedToken = localStorage.getItem("token")
const persistedUser = localStorage.getItem("user")

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  preloadedState: {
    user: {
      token: persistedToken || null,
      user: persistedUser ? JSON.parse(persistedUser) : null,
      isAuthenticated: !!persistedToken,
      error: null
    }
  }
})

export default store

// Configurestore crée le store
// userReducer gère le changement d'état utilisateur (déclaré plus en bas)
// Récupération du token et des infos utilisateur (pour rester connecté même après un refresh)
// preloadedState donne un état initial