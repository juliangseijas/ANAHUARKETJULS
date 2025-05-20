import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../layout/Header";
import Footer from "../layout/Footer";
import api from "../api/axios";
import perfilStyles from "../assets/styles/perfil.module.css";
import layoutStyles from "../assets/styles/PageLayout.module.css";

function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

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
    <div className={layoutStyles.wrapper}>
      <main className={layoutStyles.mainContent}>
        <section className={perfilStyles.perfilSection}>
          <div className={perfilStyles.perfilName}>
            <h1>{usuario?.nombre}</h1>
          </div>
          <div className={perfilStyles.perfilButtons}>
            <button className={perfilStyles.perfilButton} onClick={() => navigate("/agregar-producto")}>
              AGREGAR PRODUCTO
            </button>
            <button className={perfilStyles.perfilButton} onClick={() => navigate("/editar-perfil")}>
              EDITAR USUARIO
            </button>
          </div>
        </section>

        <section className={perfilStyles.perfilGrid}>
          {productos.map((producto) => (
            <article
              key={producto.idProducto}
              className={perfilStyles.perfilCard}
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/producto-propio/${producto.idProducto}`)}
            >
              <div className={perfilStyles.perfilCardImage}>
                <img
                  src={
                    producto.fotoProducto
                      ? `data:image/jpeg;base64,${producto.fotoProducto}`
                      : "/images/default.jpg"
                  }
                  className="card-img-top"
                  alt={producto.nombreProducto}
                />
              </div>

              <div className={perfilStyles.perfilCardBody}>
                <p className={perfilStyles.perfilCardText}>{producto.descripcion}</p>
                <p className={perfilStyles.perfilCardText}><strong>${parseFloat(producto.precio).toFixed(2)}</strong></p>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Perfil;
