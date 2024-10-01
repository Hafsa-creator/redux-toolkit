import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// redux store provider
import {Provider} from 'react-redux'
import store from './app/store.js'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)