// src/pages/ProductoAjeno.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import layoutStyles from "../assets/styles/pageLayout.module.css";
import productStyles from "../assets/styles/producto.module.css";

export default function ProductoAjeno() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducto() {
      try {
        // Ajusta aquí según tu baseURL en axios: 
        // si baseURL acaba en '/api', usa '/producto', si no, '/api/producto'
        const res = await api.get(`/producto/${id}`);
        console.log("Respuesta API producto:", res.data);
        setProducto(res.data);
      } catch (err) {
        console.error("Error al obtener producto:", err);
        setError("Error al cargar el producto.");
      }
    }
    fetchProducto();
  }, [id]);

  if (error) return <p className={productStyles.error}>{error}</p>;
  if (!producto) return <p className={productStyles.loading}>Cargando producto…</p>;

  return (
    <div className={layoutStyles.wrapper}>
      <main className={layoutStyles.mainContent}>
        <div className={productStyles.productoAjenoSection}>
          <div className={productStyles.productoAjenoContainer}>
            <div className={productStyles.productoAjenoImage}>
              <img
                src={
                  producto.fotoProducto
                    ? `data:image/jpeg;base64,${producto.fotoProducto}`
                    : "/images/default.jpg"
                }
                alt={producto.nombreProducto}
              />
            </div>
            <div className={productStyles.productoAjenoInfo}>
              <h1>{producto.nombreVendedor}</h1>
              <h3 className={productStyles.productoAjenoSubtitle}>
                {producto.telefono ? `Tel: ${producto.telefono}` : "Teléfono no disponible"}
              </h3>
              <h2 className={productStyles.productoAjenoTitle}>
                {producto.nombreProducto}
              </h2>
              <p className={productStyles.productoAjenoPrice}>
                ${parseFloat(producto.precio).toFixed(2)}
              </p>
              <p className={productStyles.productoAjenoDescription}>
                {producto.descripcion}
              </p>
              <span className={productStyles.productoAjenoStock}>
                Stock: {producto.stock}
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
