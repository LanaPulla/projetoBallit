import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './global.css';
import { Header } from './components/HomePages/header/header.jsx';
import { Inicialize } from './components/HomePages/inicialize/inicialize.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
