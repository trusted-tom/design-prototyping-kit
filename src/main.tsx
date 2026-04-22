import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { PasswordGate } from './components/PasswordGate/PasswordGate'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PasswordGate>
      <HashRouter>
        <App />
      </HashRouter>
    </PasswordGate>
  </StrictMode>,
)
