// src/pages/Categoria.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import homeStyles from "../assets/styles/home.module.css";
import layoutStyles from "../assets/styles/PageLayout.module.css";

export default function Categoria() {
  const { idCategoria } = useParams();
  const navigate = useNavigate();
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 1) Cargar el nombre de la categoría
  useEffect(() => {
    api
      .get("/categorias")
      .then((res) => {
        const cat = res.data.find(
          (c) => c.idCategoria === Number(idCategoria)
        );
        setCategoriaNombre(cat ? cat.NombreCategoria : "");
      })
      .catch((err) => {
        console.error("Error al cargar nombre de categoría:", err);
      });
  }, [idCategoria]);

  // 2) Cargar productos de esa categoría
  useEffect(() => {
    api
      .get(`/producto/categoria/${idCategoria}`)
      .then((res) => {
        setProductos(res.data);
      })
      .catch(() => {
        setError("Error al cargar productos de categoría.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [idCategoria]);

  return (
    <div className={layoutStyles.wrapper}>
      <main className={layoutStyles.mainContent}>
        <h2 style={{ textAlign: "center", margin: "1rem 0" }}>
          {categoriaNombre || `Categoría ${idCategoria}`}
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Cargando productos…</p>
        ) : error ? (
          <p style={{ color: "red", textAlign: "center" }}>{error}</p>
        ) : productos.length === 0 ? (
          <p style={{ textAlign: "center" }}>
            No hay productos en esta categoría.
          </p>
        ) : (
          <section className={homeStyles.productsGrid}>
            {productos.map((prod) => (
              <article
                key={prod.idProducto}
                className={homeStyles.productCard}
                onClick={() =>
                  navigate(`/producto/${prod.idProducto}`)
                }
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
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
