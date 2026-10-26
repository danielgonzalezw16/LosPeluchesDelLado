import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <p>Grupo 8 de Jovenes Vendedores</p>
      <p>&copy; 2026 Pastel Plushes, Te lo Vendo. Todos los Derechos Reservados</p>
      <Link style={{ color: 'rgb(255, 255, 255)' }} to="/portafolio-snoopy">portafolio</Link>
    </footer>
  )
}