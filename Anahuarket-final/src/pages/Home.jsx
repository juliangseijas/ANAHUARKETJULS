// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import homeStyles from "../assets/styles/home.module.css";
import layoutStyles from "../assets/styles/PageLayout.module.css";

export default function Home() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [loadingP, setLoadingP] = useState(true);
  const [loadingC, setLoadingC] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    // Carga productos
    api.get("/producto")
      .then(res => setProductos(res.data))
      .catch(() => setError("Error al cargar productos."))
      .finally(() => setLoadingP(false));

    // Carga categorías
    api.get("/categorias")
      .then(res => setCategorias(res.data))
      .catch(() => console.error("Error al cargar categorías"))
      .finally(() => setLoadingC(false));
  }, [navigate]);

  return (
    <div className={layoutStyles.wrapper}>
      <main className={layoutStyles.mainContent}>
        {/* Barra de categorías (solo texto) */}
        <nav className={homeStyles.categoriesBar}>
          {loadingC
            ? <p>Cargando categorías…</p>
            : categorias.map(cat => (
                <Link
                  key={cat.idCategoria}
                  to={`/categoria/${cat.idCategoria}`}
                  className={homeStyles.categoryItem}
                >
                  <span className={homeStyles.categoryLabel}>
                    {cat.NombreCategoria}
                  </span>
                </Link>
              ))
          }
        </nav>

        {/* Grid de productos */}
        <section className={homeStyles.productsGrid}>
          {loadingP
            ? <p>Cargando productos…</p>
            : error
              ? <p style={{ color: "red" }}>{error}</p>
              : productos.map(prod => (
                  <article
                    key={prod.idProducto}
                    className={homeStyles.productCard}
                    onClick={() => navigate(`/producto/${prod.idProducto}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <div className={homeStyles.productImage}>
                      <img
                        src={
                          prod.fotoProducto
                            ? `data:image/jpeg;base64,${prod.fotoProducto}`
                            : "/images/default.jpg"
                        }
                        alt={prod.nombreProducto}
                      />
                    </div>
                    <div className={homeStyles.productInfo}>
                      <p className={homeStyles.seller}>
                        {prod.nombreVendedor}
                      </p>
                      <h2 className={homeStyles.productTitle}>
                        {prod.nombreProducto}
                      </h2>
                      <p className={homeStyles.price}>
                        ${parseFloat(prod.precio).toFixed(2)}
                      </p>
                    </div>
                  </article>
                ))
          }
        </section>
      </main>
    </div>
  );
}
