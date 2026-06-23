import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import App from './App.tsx'

Aos.init()

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

createRoot(rootElement).render(
    <StrictMode>
        <Analytics />
        <SpeedInsights />
        <App />
    </StrictMode>,
)
