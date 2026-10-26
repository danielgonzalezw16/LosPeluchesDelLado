const opcionesIndex = [
  { texto: 'Inicio', href: '/', activo: true },
  { texto: 'Productos', href: '/PeluPages/Principales/PeluDuctos.html' },
  { texto: 'Historial', href: '/PeluPages/Principales/PeluHistorial.html' },
  { texto: 'Sucursales', href: '/PeluPages/Principales/PeluSucursales.html' },
]

export default function NavMenu({ opciones = opcionesIndex }) {
  return (
    <ul className="nav nav-justified rounded-5 shadow p-2 small" id="menuNav"
        style={{ backgroundColor: '#D7C4B7' }}>
      {opciones.map(({ texto, href, activo }) => (
        <li className="nav-item" key={texto}>
          <a
            className={
              'nav-link fs-6 fw-semibold text-uppercase text-pastel-cafe' +
              (activo ? ' active bg-white text-dark rounded-5' : '')
            }
            href={href}
            target={activo ? undefined : '_blank'}
            rel="noreferrer"
          >
            {texto}
          </a>
        </li>
      ))}
    </ul>
  )
}