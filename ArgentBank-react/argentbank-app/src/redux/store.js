import { configureStore } from "@reduxjs/toolkit"
import userReducer from "./userSlice"

// 🧠 Étape 1 : On récupère les données du localStorage
const persistedToken = localStorage.getItem("token")
const persistedUser = localStorage.getItem("user")

// ⚙️ Étape 2 : On configure le store avec cet état préchargé
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

// Configurestore va permettre de créer le store, le userReducer va permettre de gérer comment l'état utilisateur change, on va ensuite
// récupérer les infos stocké dans le localstorage (dispo dans le navigateur donc) comme le token et l'utilisateur actuel pour que l'utilisateur
// puisse rester connecté même après un refresh, on déclare ensuite que l'état user sera géré par le userReducer et preloadstate permet de
// donner un état initial, contenant le token ou rien si rien n'est stocké dans le localstorage, on utilise null pour être sûr qu'il n'y ait
// rien et pas undefined, contenant le user, qui sera converti à partir d'une chaine de caractère json en un objet js avec json.parse si
// si une valeure est trouvée, vérifie si l'utilisateur est connecté en vérifiant la valeur de persistedToken avec le !! qui permet de renvoyer
// true ou false si quelque chose est trouvé ou non, on établi une erreur à null pour les potentielles erreurs par la suite car l'erreur
// est actuellement vide