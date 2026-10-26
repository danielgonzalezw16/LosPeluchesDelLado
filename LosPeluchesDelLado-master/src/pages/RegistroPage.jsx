import { useRef, useState } from 'react'
import HeaderSimple from '../components/HeaderSimple'
import NavMenu from '../components/NavMenu'
import Footer from '../components/Footer'
import '../PeluDesigns/BusquedaGeneral.css'

const vLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/
const vCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const orden = ['nombre', 'contrasena', 'contrasenaConf', 'correo']
const reglas = {
  nombre: (v) => v !== '' && vLetras.test(v),
  contrasena: (v) => v !== '',
  contrasenaConf: (v, d) => v !== '' && v === d.contrasena.trim(),
  correo: (v) => v !== '' && vCorreo.test(v),
}

const opcionesNav = [
  { texto: 'Inicio', href: '/' },
  { texto: 'Productos', href: '/PeluPages/Principales/PeluDuctos.html' },
  { texto: 'Ventas', href: '/PeluPages/Principales/PeluVentas.html' },
  { texto: 'Historial', href: '/PeluPages/Principales/PeluHistorial.html' },
  { texto: 'Sucursales', href: '/PeluPages/Principales/PeluSucursales.html' },
]

const IconoUsuario = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(255, 255, 255)" className="bi bi-person-circle" viewBox="0 0 16 16">
    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
  </svg>
)

const IconoCandado = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="rgb(255, 255, 255)" className="bi bi-lock-fill" viewBox="0 0 16 16">
    <path fillRule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3" />
  </svg>
)

// Campo reutilizable (nombre y contraseñas tienen la misma estructura)
function Campo({ id, label, tipo = 'text', placeholder, icono, valor, onChange, estado, inputRef, mensaje }) {
  const clase =
    'form-control' + (estado === 'valido' ? ' is-valid' : estado === 'invalido' ? ' is-invalid' : '')
  return (
    <div className="col-12">
      <label htmlFor={id} className="form-label" style={{ color: 'rgb(255, 255, 255)' }}>{label}</label>
      <div className="input-box">
        <input type={tipo} className={clase} placeholder={placeholder} id={id}
               value={valor} onChange={onChange} ref={inputRef} required />
        {icono}
      </div>
      <div className={'invalid-feedback' + (estado === 'invalido' ? ' d-block' : '')}>{mensaje}</div>
    </div>
  )
}

export default function RegistroPage() {
  const [datos, setDatos] = useState({ nombre: '', contrasena: '', contrasenaConf: '', correo: '' })
  const [estados, setEstados] = useState({}) // 'valido' | 'invalido' | undefined
  const refs = {
    nombre: useRef(null),
    contrasena: useRef(null),
    contrasenaConf: useRef(null),
    correo: useRef(null),
  }

  const cambiar = (e) => setDatos({ ...datos, [e.target.id]: e.target.value })

  // se detiene en el primer error y hace focus
  const enviar = (e) => {
    e.preventDefault()
    const nuevos = { ...estados }
    for (const campo of orden) {
      const ok = reglas[campo](datos[campo].trim(), datos)
      nuevos[campo] = ok ? 'valido' : 'invalido'
      if (!ok) {
        setEstados(nuevos)
        refs[campo].current.focus()
        return false
      }
    }
    setEstados(nuevos)
    // Todo válido: aquí va lo que hagas con los datos (fetch, guardar en JSON, etc.)
    return true
  }

  const claseCorreo =
    'form-control' + (estados.correo === 'valido' ? ' is-valid' : estados.correo === 'invalido' ? ' is-invalid' : '')

  return (
    <>
      <div className="menu w-100 d-flex flex-column gap-1">
        <HeaderSimple />
        <NavMenu opciones={opcionesNav} />
      </div>

      <div className="formulario">
        <form className="row g-3 needs-validation" noValidate onSubmit={enviar}>
          <Campo id="nombre" label="nombre de usuario" placeholder="ejemplo: snoopy"
                 icono={<IconoUsuario />} valor={datos.nombre} onChange={cambiar}
                 estado={estados.nombre} inputRef={refs.nombre}
                 mensaje="ingrese un nombre de usuario valido" />

          <Campo id="contrasena" label="contraseña" tipo="password" placeholder="ingrese una contraseña"
                 icono={<IconoCandado />} valor={datos.contrasena} onChange={cambiar}
                 estado={estados.contrasena} inputRef={refs.contrasena}
                 mensaje="ingrese una contraseña" />

          <Campo id="contrasenaConf" label="confirme su contraseña" tipo="password" placeholder="confirme su contraseña"
                 icono={<IconoCandado />} valor={datos.contrasenaConf} onChange={cambiar}
                 estado={estados.contrasenaConf} inputRef={refs.contrasenaConf}
                 mensaje="las contraseñas no coinciden" />

          <div className="col-12">
            <label htmlFor="correo" className="form-label" style={{ color: 'rgb(255, 255, 255)' }}>correo</label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">@</span>
              <div className="input-box">
                <input type="text" className={claseCorreo} placeholder="correo@ejemplo.cl" id="correo"
                       aria-describedby="inputGroupPrepend" value={datos.correo}
                       onChange={cambiar} ref={refs.correo} required />
              </div>
              <div className={'invalid-feedback' + (estados.correo === 'invalido' ? ' d-block' : '')}>
                ingrese un correo valido
              </div>
            </div>
          </div>

          <div className="col-12">
            <button className="btn bg-white" type="submit">crear cuenta</button>
          </div>
        </form>
      </div>

      <Footer />
    </>
  )
}