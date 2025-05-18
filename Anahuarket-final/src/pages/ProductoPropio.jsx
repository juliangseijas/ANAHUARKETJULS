import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import layoutStyles from "../assets/styles/pageLayout.module.css";
import productStyles from "../assets/styles/producto.module.css";

function ProductoPropio() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className={layoutStyles.wrapper}>
      <Header />

      <main className={layoutStyles.mainContent}>
        <section className={productStyles.productoAjenoSection}>
          <div className={productStyles.productoAjenoContainer}>
            {/* columna de imagen */}
            <div className={productStyles.productoAjenoImage}>
              <img src={
                producto.fotoProducto && producto.fotoProducto.length > 50
                  ? `data:image/jpeg;base64,${producto.fotoProducto}`
                  : "/images/default.jpg"
              }
                alt={producto.nombreProducto} />
            </div>

            {/* columna de info */}
            <div className={productStyles.productoAjenoInfo}>
              <h3>{producto.nombreProducto}</h3>
              <h4 className={productStyles.productoAjenoPrice}>
                ${parseFloat(producto.precio).toFixed(2)}
              </h4>
              <p className={productStyles.productoAjenoDescription}>
                {producto.descripcion}
              </p>
              <span className={productStyles.productoAjenoStock}>
                Stock: {producto.stock}
              </span>

              {/* NUEVO BOTÓN para editar */}
              <button
                className={productStyles.productoAjenoEditButton}
                onClick={() => navigate(`/editar-producto/${producto.idProducto}`)}
              >
                EDITAR PRODUCTO
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductoPropio;