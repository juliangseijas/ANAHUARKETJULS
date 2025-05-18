import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import homeStyles from "../assets/styles/home.module.css";
import layoutStyles from "../assets/styles/PageLayout.module.css"

function ResultadosBusqueda() {
  const navigate = useNavigate();
  const [resultados, setResultados] = useState([]);

  useEffect(() => {
    const datos = localStorage.getItem("resultadosBusqueda");
    if (datos) {
      setResultados(JSON.parse(datos));
    }
  }, []);

  return (
    <div className={layoutStyles.wrapper}>
      <Header />
      <main className={layoutStyles.mainContent}>
        <section className={homeStyles.productsGrid}>
          {resultados.length === 0 ? (
            <p>No se encontraron productos.</p>
          ) : (
            resultados.map((producto) => (
              <article
                key={producto.idProducto}
                className={homeStyles.productCard}
                onClick={() =>
                  navigate(`/producto/${Number(producto.idProducto)}`)
                }
                style={{ cursor: "pointer" }}
              >
                <div className={homeStyles.productImage}>
                  <img
                    src={
                      producto.fotoProducto
                        ? `data:image/jpeg;base64,${producto.fotoProducto}`
                        : "/images/default.jpg"
                    }
                    alt={producto.nombreProducto}
                  />
                </div>
                <div className={homeStyles.productInfo}>
                  <p className={homeStyles.seller}>{producto.nombreVendedor}</p>
                  <h2 className={homeStyles.productTitle}>{producto.nombreProducto}</h2>
                  <p className={homeStyles.price}>
                    ${parseFloat(producto.precio).toFixed(2)}
                  </p>
                </div>
              </article>
            ))
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ResultadosBusqueda;
