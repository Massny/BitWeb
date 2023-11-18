import ReactDOM from 'react-dom/client'
import React from 'react'
import './index.css'
import App from './App.tsx'
import AppTheme from './theme/themeProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { NobelDataContextProvider } from './assets/components/Context/NobelDataContextProvider.tsx'





ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppTheme>
      <NobelDataContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NobelDataContextProvider>
    </AppTheme> 
  </React.StrictMode>,
)
