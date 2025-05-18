import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import api from "../api/axios";
import layoutStyles from "../assets/styles/pageLayout.module.css";
import styles from "../assets/styles/edit.module.css";

export default function EditarPerfil() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nombre: "", telefono: "", id: null });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUsuario({ 
        nombre: parsedUser.nombre, 
        telefono: parsedUser.telefono || "", 
        id: parsedUser.id 
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/users/${usuario.id}`, {
        nombre: usuario.nombre,
        telefono: usuario.telefono
      });

      // Actualizar localStorage
      const updatedUser = {
        ...JSON.parse(localStorage.getItem("usuario")),
        nombre: usuario.nombre,
        telefono: usuario.telefono
      };
      localStorage.setItem("usuario", JSON.stringify(updatedUser));

      setMensaje("Perfil actualizado exitosamente");
      navigate("/perfil");
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      setMensaje("Error al guardar los cambios");
    }
  };

  return (
    <div className={layoutStyles.wrapper}>
      <Header />

      <main className={layoutStyles.mainContent}>
        <div className={styles.editContainer}>
          <div className={styles.editLogoBackground} />
          <h2 className={styles.editTitle}>EDITAR PERFIL</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="fullName" className={styles.editLabel}>
              NOMBRE COMPLETO
            </label>
            <input
              type="text"
              placeholder="Nombre completo"
              value={usuario.nombre}
              onChange={(e) => setUsuario({ ...usuario, nombre: e.target.value })}
              required
              className={styles.editInputField}
            />

            <label htmlFor="phone" className={styles.editLabel}>
              TELÉFONO
            </label>
            <input
              type="tel"
              placeholder="Teléfono"
              value={usuario.telefono}
              onChange={(e) => setUsuario({ ...usuario, telefono: e.target.value })}
              required
              className={styles.editInputField}
            />
            {mensaje && <p style={{ color: "red" }}>{mensaje}</p>}
            <div className={styles.editButtons}>
              <button
                type="button"
                onClick={() => navigate("/perfil")}
                className={styles.editActionButton}
              >
                CANCELAR
              </button>
              <button
                type="submit"
                className={styles.editActionButton}
              >
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
