import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.tsx'
import AppTheme from './theme/themeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppTheme>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppTheme> 
  </React.StrictMode>,
)
