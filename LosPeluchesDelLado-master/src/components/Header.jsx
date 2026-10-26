import { Link } from 'react-router-dom'
import Buscador from './Buscador'

export default function Header() {
  return (
    <div className="borde_inicial d-flex align-items-center rounded-5 shadow p-2"
         style={{ backgroundColor: '#D7C4B7' }}>
      <div className="col-4 justify-content-left align-items-center" style={{ paddingLeft: '40px' }}>
        <Buscador />
      </div>

      <div className="logo_co col-4 d-flex justify-content-center align-items-center">
        <img id="logo" className="logo" src="/PeluAssets/Iconos/Logo.png" alt="logo"
             style={{ cursor: 'pointer' }}
             onClick={() => window.open('/', '_blank')} />
      </div>

      <div className="col-4 d-flex ms-auto" style={{ justifyContent: 'end' }}>
        {/* Campana */}
        <button type="button"
                className="campana border-0 bg-transparent position-relative p-1 text-pastel-cafe align-items-row"
                style={{ pointerEvents: 'auto' }}
                onClick={() => window.open('/PeluPages/Principales/PeluNotificaciones.html', '_blank')}
                aria-label="Campana">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="2000 0 500 500" width="52" height="52">
            <g transform="translate(2000, 0)">
              <circle className="fondo-circulo" cx="250" cy="250" r="210" />
              <path className="fondo-circulo mitad-superior" d="M 101.4 398.6 A 210 210 0 0 1 398.6 101.4 Z" />
              <path className="campana-linea"
                    d="M 170,335 C 170,335 155,335 155,320 C 155,305 180,290 180,200 A 70,70 0 0,1 320,200 C 320,290 345,305 345,320 C 345,335 330,335 330,335 Z" />
              <rect className="campana-badajo" x="210" y="365" width="80" height="24" rx="16" />
            </g>
          </svg>
          <span className="num-notis badge-notificacion">3</span>
        </button>

        {/* Carrito */}
        <button type="button"
                className="carrito d-flex p-0 border-0 bg-transparent text-pastel-cafe"
                style={{ pointerEvents: 'none' }}
                onClick={() => window.open('/PeluPages/Principales/PeluVentas.html', '_blank')}
                aria-label="Carro">
          <svg xmlns="http://www.w3.org/2000/svg" width="75" height="41"
               viewBox="460 0 50 45" fill="none"
               style={{ pointerEvents: 'none' }}
               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Formación del carrito */}
            <polygon className="carro-svg" points="450,18 495,18 489,43 456,43" fill="transparent" />
            <line className="carro-svg" x1="460" y1="10" x2="485" y2="10" />
            <line className="carro-svg" x1="455" y1="18" x2="460" y2="10" />
            <line className="carro-svg" x1="490" y1="18" x2="485" y2="10" />
            <circle className="carro-svg" cx="480" cy="30" r="5" fill="rgb(228, 234, 240)" />
            <circle className="carro-svg" cx="465" cy="30" r="5" fill="rgb(228, 234, 240)" />
            <rect className="carro-svg" x="465" y="7" width="15" height="6" rx="2" ry="2"
                  fill="#ffe2c7"
                  style={{ transformOrigin: '472px 25px', zIndex: 20 }} />
            {/* Sonrisa */}
            <path className="carro-svg" d="M 467 35 Q 472.5 42 478 35" />
            {/* Ojos y mejillas */}
            <circle className="carro-svg" cx="485" cy="36" r="2" fill="rgb(255, 199, 199)" />
            <circle className="carro-svg" cx="460" cy="36" r="2" fill="rgb(255, 199, 199)" />
            <circle className="carro-svg" cx="480" cy="30" r="1" fill="rgb(213, 174, 125)"
                    style={{ color: 'rgb(98, 47, 14)' }} />
            <circle className="carro-svg" cx="465" cy="30" r="1" fill="rgb(213, 174, 125)"
                    style={{ color: 'rgb(98, 47, 14)' }} />
          </svg>
        </button>

        {/* Botones de sesión */}
        <div className="init_button btn-group d-flex align-items-center">
          <a href="/PeluPages/Principales/PeluIniciar.html" className="btn btn-cafe-claro fs-5"
             target="_blank" rel="noreferrer">Iniciar Sesión</a>
          <Link to="/crear-cuenta" className="btn btn-cafe-claro fs-5">Crear Cuenta</Link>
        </div>
      </div>
    </div>
  )
}