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

// Le provider va permettre de rendre le store redux accessible à tout les composants react, store qui lui sert à centraliser toutee les
// données de l'application, il contient l'état global de l'app, les fonctions qui vont modifier cet état (reducers) et les outils servant
// à interragir avec le state (dispatch ou getState)