import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import "../assets/styles/producto.css";

function ProductoAjeno() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducto = async () => {
      console.log("ID del producto desde useParams():", id);
      console.log("URL solicitada a la API:", `/producto/${id}`);

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
          <h2>{producto.nombreVendedor}</h2>
          <h3>Teléfono no disponible aún</h3>
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
            <h3>
              {producto.nombreProducto} - ${parseFloat(producto.precio).toFixed(2)}
            </h3>
            <p className="descripcion">{producto.descripcion}</p>
            <h5 className="stock">Stock no disponible</h5>
          </div>
        </div>
      <Footer />
    </div>
  );
}

export default ProductoAjeno;
