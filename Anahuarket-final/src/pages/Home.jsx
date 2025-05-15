import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import "../assets/styles/home.css";

function Home() {
  const navigate = useNavigate();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProductos = async () => {
      try {
        const res = await api.get("/producto");
        setProductos(res.data);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar productos.");
        setLoading(false);
      }
    };

    fetchProductos();
  }, [navigate]);

  return (
    <div className="wrapper">
      <Header />

      <main>
        <section className="products-grid">
          {loading && <p>Cargando productos...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {productos.map((producto) => (
            <article
              key={producto.idProducto}
              className="product-card"
              onClick={() => {
                console.log("ID del producto seleccionado:", producto.idProducto);
                navigate(`/producto/${Number(producto.idProducto)}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="product-image">
                <img
                  src={
                    producto.fotoProducto
                      ? `data:image/jpeg;base64,${producto.fotoProducto}`
                      : "/images/default.jpg"
                  }
                  alt={producto.nombreProducto}
                />
              </div>
              <div className="product-info">
                <p className="seller">{producto.nombreVendedor}</p>
                <h2 className="product-title">{producto.nombreProducto}</h2>
                <p className="price">${parseFloat(producto.precio).toFixed(2)}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Home;
