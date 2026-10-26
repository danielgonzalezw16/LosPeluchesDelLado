import { useState, useRef, useEffect } from 'react'

const sugerenciasBusqueda = ['Snoopy el piloto-mecanico','Snoopy rosa']

const rutas = {
  snoopyRosa: '/PeluPages/Categorias/Categoria_Snoopys.html',
  snoopyMecanico: '/PeluPages/Categorias/Categoria_Snoopys.html',
}

export default function Buscador({ sufijo = 'Index' }) {
  const [texto, setTexto] = useState('')
  const [abierto, setAbierto] = useState(false)
  const formRef = useRef(null)

  const valor = texto.trim().toLowerCase()
  const coincidencias =
    valor === ''
      ? []
      : sugerenciasBusqueda.filter((t) => t.toLowerCase().includes(valor))

  // Cierra las sugerencias al hacer clic fuera del buscador
  useEffect(() => {
    const fuera = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) setAbierto(false)
    }
    document.addEventListener('click', fuera)
    return () => document.removeEventListener('click', fuera)
  }, [])

  const buscar = (e) => {
    e.preventDefault()
    setAbierto(false)
    if (rutas[valor]) window.open(rutas[valor], '_blank')
  }

  const elegir = (item) => {
    setTexto(item)
    setAbierto(false)
  }

  return (
    <form
      ref={formRef}
      className="busqueda search-box d-flex align-items-center rounded-5 px-3 py-1"
      id={`busqueda${sufijo}`}
      onSubmit={buscar}
    >
      <input
        type="text"
        className="search-input border-0 rounded-5 px-3 py-1 shadow-none"
        placeholder="Buscar..."
        id={`barraBusqueda${sufijo}`}
        value={texto}
        autoComplete="off"
        onChange={(e) => {
          setTexto(e.target.value)
          setAbierto(true)
        }}
      />
      <ul
        className={`sugerencias_busqueda${sufijo}`}
        style={{ display: abierto && coincidencias.length > 0 ? 'block' : 'none' }}
      >
        {coincidencias.map((item) => (
          <li key={item} onClick={() => elegir(item)}>{item}</li>
        ))}
      </ul>

      <div className="separador mx-2"></div>
      <button
        type="submit"
        className="lupita p-0 border-0 bg-transparent text-pastel-cafe d-flex align-items-center"
        aria-label="Buscar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
             viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </button>
    </form>
  )
}