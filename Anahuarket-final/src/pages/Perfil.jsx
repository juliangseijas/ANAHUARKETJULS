import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // IMPORTANTE
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import api from "../api/axios";
import "../assets/styles/perfil.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate(); // IMPORTANTE

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsuario(parsedUser);

      api.get(`/producto/usuario/${parsedUser.id}`)
        .then((res) => setProductos(res.data))
        .catch((err) => console.error("Error al obtener productos del usuario:", err));
    }
  }, []);

  return (
    <div className="wrapper">
      <Header />

      <section className="Perfil">
        <div className="NombrePerfil">
          <h1>{usuario?.nombre}</h1>
        </div>
        <div className="Botones">
          <button className="AgregarProducto">Agregar Producto</button>
          <button className="EditarUsuario">Editar Usuario</button>
        </div>
      </section>

      <main>
        {productos.map((producto) => (
          <article
            key={producto.idProducto}
            className="card"
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/producto-propio/${producto.idProducto}`)} // <-- cambio aquí
          >
            <img
              src={
                producto.fotoProducto
                  ? `data:image/jpeg;base64,${producto.fotoProducto}`
                  : "/images/default.jpg"
              }
              className="card-img-top"
              alt={producto.nombreProducto}
            />
            <div className="card-body">
              <p className="card-text">{producto.descripcion}</p>
              <p className="card-text"><strong>${parseFloat(producto.precio).toFixed(2)}</strong></p>
            </div>
          </article>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default Perfil;
