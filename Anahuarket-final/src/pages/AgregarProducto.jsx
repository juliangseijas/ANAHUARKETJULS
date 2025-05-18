import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import api from "../api/axios";
import layoutStyles from "../assets/styles/pageLayout.module.css";
import styles from "../assets/styles/edit.module.css";

export default function AgregarProducto() {
  const navigate = useNavigate();
  // Estados para categorías y disponibilidades
  const [categorias, setCategorias] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [disponibilidadId, setDisponibilidadId] = useState("");
  const [precio, setPrecio] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [imagen, setImagen] = useState(null);

  useEffect(() => {
    // Cargar categorías
    api.get("/categorias")
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Error al cargar categorías:", err));
    // Cargar disponibilidades
    api.get("/disponibilidad")
      .then((res) => setDisponibilidades(res.data))
      .catch((err) => console.error("Error al cargar disponibilidades:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Usuario no autenticado");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("foto", imagen);
    formData.append("nombreProducto", nombre);
    formData.append("descripcion", descripcion);
    formData.append("idCategoria", categoriaId);
    formData.append("idDisponibilidad", disponibilidadId);
    formData.append("precio", precio);
    formData.append("stock", cantidad);

    try {
      await api.post("/producto", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/perfil");
    } catch (err) {
      console.error("Error al agregar producto:", err);
      alert("Error al agregar producto");
    }
  };

  return (
    <div className={layoutStyles.wrapper}>
      <Header />
      <main className={layoutStyles.mainContent}>
        <div className={styles.editContainer}>
          <div className={styles.editLogoBackground} />
          <h2 className={styles.editTitle}>AGREGAR PRODUCTO</h2>
          <form onSubmit={handleSubmit}>
            <label className={styles.editLabel}>IMAGEN</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>NOMBRE DEL PRODUCTO</label>
            <input
              type="text"
              placeholder="Nombre de producto"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>DESCRIPCION</label>
            <input
              type="text"
              placeholder="Descripción"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>CATEGORIAS</label>
            <select
              value={categoriaId}
              onChange={(e) => setCategoriaId(e.target.value)}
              required
              className={styles.editSelectField}
            >
              <option value="" disabled>
                — Selecciona una categoría —
              </option>
              {categorias.map((cat) => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.NombreCategoria}
                </option>
              ))}
            </select>
            
            <label className={styles.editLabel}>DISPONIBILIDAD</label>
            <select
              value={disponibilidadId}
              onChange={(e) => setDisponibilidadId(e.target.value)}
              required
              className={styles.editSelectField}
            >
              <option value="" disabled>
                — Selecciona disponibilidad —
              </option>
              {disponibilidades.map((d) => (
                <option key={d.idDisponibilidad} value={d.idDisponibilidad}>
                  {d.NombreDisponibilidad}
                </option>
              ))}
            </select>
            
            <label className={styles.editLabel}>PRECIO</label>
            <input
              type="number"
              placeholder="Precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>CANTIDAD</label>
            <input
              type="number"
              placeholder="Cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              required
              className={styles.editInputField}
            />

            <div className={styles.editButtons}>
              <button
                type="button"
                onClick={() => navigate("/perfil")}
                className={styles.editActionButton}
              >
                CANCELAR
              </button>
              <button type="submit" className={styles.editActionButton}>
                PUBLICAR
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
