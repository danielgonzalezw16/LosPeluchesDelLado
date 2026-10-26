import Header from './components/Header'
import NavMenu from './components/NavMenu'
import Carrusel from './components/Carrusel'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <div className="menu w-100 d-flex flex-column gap-1">
        <Header />
        <NavMenu />
      </div>

      <Carrusel />

      <div>
        <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#333' }}>
          Este emprendimiento esta enfocado en la Compra y Venta de Peluches,
          úbicado en Santiago de Chile. Puedes comprar nuestros productos de
          forma online como tambien de manera presencial.
          ¡Asi que no esperes más y compra tu peluche aqui!
        </p>
      </div>

      <Footer />
    </>
  )
}