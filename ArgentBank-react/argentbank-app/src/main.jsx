import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRooter from './AppRooter'
import { Provider } from "react-redux"
import store from "./redux/store"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AppRooter />
    </Provider>
  </StrictMode>,
)

// Provider store : permets de rendre accessible le store redux à tout les composant de l'app, store servant lui même à centraliser
// toutes les données de l'app