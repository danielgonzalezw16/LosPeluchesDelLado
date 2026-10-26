import Buscador from './Buscador'

export default function HeaderSimple() {
  return (
    <div className="borde_inicial d-flex align-items-center rounded-5 shadow p-2"
         style={{ backgroundColor: '#D7C4B7' }}>
      <div className="col-4 justify-content-left align-items-center" style={{ paddingLeft: '40px' }}>
        <Buscador sufijo="" />
      </div>
      <div className="logo_co col-4 d-flex justify-content-center align-items-center">
        <a href="/"><img id="logo" className="logo" src="/PeluAssets/Iconos/Logo.png" alt="logo" /></a>
      </div>
      <div className="col-4"></div>
    </div>
  )
}