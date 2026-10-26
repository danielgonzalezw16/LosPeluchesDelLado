import HeaderSimple from '../components/HeaderSimple'
import NavMenu from '../components/NavMenu'
import Noticias from '../components/Noticias'
import Footer from '../components/Footer'
import '../PeluDesigns/BusquedaGeneral.css'
import '../PeluDesigns/portafolio.css'

const opcionesNav = [
  { texto: 'Inicio', href: '/' },
  { texto: 'Productos', href: '/PeluPages/Principales/PeluDuctos.html' },
  { texto: 'Ventas', href: '/PeluPages/Principales/PeluVentas.html' },
  { texto: 'Historial', href: '/PeluPages/Principales/PeluHistorial.html' },
  { texto: 'Sucursales', href: '/PeluPages/Principales/PeluSucursales.html' },
]

const proyectos = [1, 2, 3] // los tres eran idénticos; cámbialos por datos reales cuando quieras

export default function PortafolioPage() {
  const enviar = (e) => {
    e.preventDefault()
    // aquí va lo que hagas con el mensaje
  }

  return (
    <>
      <div className="menu w-100 d-flex flex-column gap-1">
        <HeaderSimple />
        <NavMenu opciones={opcionesNav} />
      </div>

      {/* Introducción */}
      <section id="intro" className="intro-portafolio">
        <div className="container">
          <img src="/PeluAssets/Peluches/snoopy rosa.png" className="rounded-circle foto-perfil" alt="Foto personal" />
          <h1>Snoopy</h1>
          <p className="lead">Estudiante de informática Duoc Uc | Entusiasta de la Tecnología</p>
          <p>https://github.com/pedrohacker20</p>
          <p>
            Bienvenido a mi portafolio personal donde comparto mis proyectos y noticias recientes.
            ¡Explora y conoce más sobre mi trabajo!
          </p>
          <div className="social-icons">
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
            <a href="#"><i className="fab fa-github"></i></a>
          </div>
        </div>
      </section>

      {/* Proyectos */}
      <div className="titulo"><h1>Proyectos</h1></div>
      <div className="contenedor-tarjetas">
        {proyectos.map((n) => (
          <div className="card" style={{ width: '18rem' }} key={n}>
            <img src="/PeluAssets/Peluches/snoopy rosa.png" className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Proyecto snoopys rosas</h5>
              <p className="card-text">
                competencia de quien tiene más snoopys rosas, juntamos muchos snoopys rosas
              </p>
              <a href="#" className="btn btn-primary">ver snoopys</a>
            </div>
          </div>
        ))}
      </div>

      {/* Noticias */}
      <div className="titulo"><h1>Noticias</h1></div>
      <Noticias />

      {/* Contacto */}
      <div className="titulo"><h1>Contacto</h1></div>
      <div className="formulario">
        <section id="contact" className="container-fluid">
          <div className="container">
            <h2 className="section-title">Contacto</h2>
            <form onSubmit={enviar}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="name" required />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                <input type="email" className="form-control" id="email" required />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">Mensaje</label>
                <textarea className="form-control" id="message" rows="3" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar</button>
            </form>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}