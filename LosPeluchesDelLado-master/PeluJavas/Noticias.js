const { useState, useEffect } = React;

// Componente de una sola noticia
function NoticiaCard({ titulo, fecha, contenido }) {
  return (
    <div className="col-sm-6 mb-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <h6 className="card-subtitle mb-2 text-muted">{fecha}</h6>
          <p className="card-text">{contenido}</p>
          <a href="#" className="btn btn-primary">Leer más</a>
        </div>
      </div>
    </div>
  );
}

// Componente que carga el JSON y muestra la lista
function ListaNoticias() {
  const [noticias, setNoticias] = useState([]);

  useEffect(() => {
    fetch("Noticias.json")
      .then((res) => res.json())
      .then((datos) => setNoticias(datos))
      .catch((error) => console.error("Error cargando noticias:", error));
  }, []);

  return (
    <div className="row tarjeta-noticia">
      {noticias.map((n) => (
        <NoticiaCard
          key={n.id}
          titulo={n.titulo}
          fecha={n.fecha}
          contenido={n.contenido}
        />
      ))}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("noticias-root")).render(<ListaNoticias />);