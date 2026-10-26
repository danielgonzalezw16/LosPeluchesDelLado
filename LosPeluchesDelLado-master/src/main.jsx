import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import './PeluPrincipalDesign.css'
import App from './App'
import RegistroPage from './pages/RegistroPage'
import PortafolioPage from './pages/PortafolioPage'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/crear-cuenta" element={<RegistroPage />} />
      <Route path="/portafolio-snoopy" element={<PortafolioPage />} />
    </Routes>
  </BrowserRouter>
)
