import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Aos from 'aos'
import { IconBase } from 'react-icons'
import 'aos/dist/aos.css'
import App from './App.jsx'

Aos.init()
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
