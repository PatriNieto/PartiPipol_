import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { BrowserRouter } from 'react-router-dom';
import { AuthWrapper } from './context/auth.context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  //aqui envoltorios anidados, por fuera los contextos que menos cambios tengan, si metemos temas por ejemplo se usario menos que Browser pero mas que Authorizator

  <AuthWrapper>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </AuthWrapper>

)