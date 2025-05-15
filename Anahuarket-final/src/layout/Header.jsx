import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../api/axios";
import styles from "../assets/styles/global.module.css";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const [busqueda, setBusqueda] = useState("");

  const handleBuscar = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/buscar?q=${busqueda}`);
      localStorage.setItem("resultadosBusqueda", JSON.stringify(res.data));
      navigate("/resultados");
    } catch (err) {
      console.error("Error en la búsqueda:", err);
    }
  };

  const getPageName = () => {
    switch (location.pathname) {
      case "/home":
        return "INICIO";
      case "/perfil":
        return "PERFIL";
      default:
        return "ANAHUARKET";
    }
  };

  return (
    <>
      <header>
        <div className={styles.topbar}>
          <h1 className={styles.logo}>{getPageName()}</h1>

          <form onSubmit={handleBuscar} className={styles.searchbar}>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button type="submit">🔍</button>
          </form>

          <div className={styles.iconsright}>
            <a href="/home">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                fill="#ffffff"
                className="bi bi-house-door-fill"
                viewBox="0 0 16 16"
              >
                <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
              </svg>
            </a>
            <a href="/perfil">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                fill="#ffffff"
                className="bi bi-person-fill"
                viewBox="0 0 16 16"
              >
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>
            </a>
            <a href="/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={40}
                height={40}
                fill="#ffffff"
                className="bi bi-box-arrow-right"
                viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z" />
                <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z" />
              </svg>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
