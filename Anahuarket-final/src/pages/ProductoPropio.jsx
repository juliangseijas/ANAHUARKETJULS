import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../assets/styles/producto.css";

function ProductoPropio() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const res = await api.get(`/producto/${id}`);
        setProducto(res.data);
      } catch (err) {
        console.error("Error al obtener producto:", err);
        setError("Error al cargar el producto.");
      }
    };

    fetchProducto();
  }, [id]);

  if (error) return <p>{error}</p>;
  if (!producto) return <p>Cargando producto...</p>;

  return (
    <div className="wrapper">
      <Header />
        <div className="nombreUsuario">
          <h2 className="nombrePerfil">{producto.nombreVendedor}</h2>
        </div>
        <div className="producto">
          <div className="imagenProducto">
            <img
              id="imagenPrincipal"
              src={
                producto.fotoProducto && producto.fotoProducto.length > 50
                  ? `data:image/jpeg;base64,${producto.fotoProducto}`
                  : "/images/default.jpg"
              }
              alt={producto.nombreProducto}
            />
          </div>
          <div className="infoProducto">
            <h2>{producto.nombreProducto}</h2>
            <h5 className="precio">${parseFloat(producto.precio).toFixed(2)}</h5>
            <p className="descripcion">{producto.descripcion}</p>
            <div className="button">
              <button className="btn">Editar</button>
            </div>
            <h5 className="stock">Stock no disponible</h5>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default ProductoPropio;
