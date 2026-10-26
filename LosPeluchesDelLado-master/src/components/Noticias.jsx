import noticias from '../Noticias.json'

export default function Noticias() {
  return (
    <div className="container">
      {noticias.map((n) => (
        <div className="card mb-3" key={n.id}>
          <div className="card-body">
            <h5 className="card-title">{n.titulo}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{n.fecha}</h6>
            <p className="card-text">{n.contenido}</p>
          </div>
        </div>
      ))}
    </div>
  )
}