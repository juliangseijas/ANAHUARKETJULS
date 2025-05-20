import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import api from "../api/axios";
import layoutStyles from "../assets/styles/pageLayout.module.css";
import styles from "../assets/styles/edit.module.css";

export default function EditarProducto() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [form, setForm] = useState({
    foto: null,
    nombreProducto: "",
    descripcion: "",
    idCategoria: "",
    idDisponibilidad: "",
    precio: "",
    stock: ""
  });
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Cargar categorías y disponibilidades
    api.get('/categorias')
      .then(res => setCategorias(res.data))
      .catch(err => console.error("Error al cargar categorías:", err));
    api.get('/disponibilidad')
      .then(res => setDisponibilidades(res.data))
      .catch(err => console.error("Error al cargar disponibilidades:", err));

    // Obtener datos actuales del producto
    api.get(`/producto/${id}`)
      .then(res => {
        const p = res.data;
        setForm({
          foto: null,
          nombreProducto: p.nombreProducto,
          descripcion: p.descripcion,
          idCategoria: p.idCategoria,
          idDisponibilidad: p.idDisponibilidad,
          precio: p.precio,
          stock: p.stock
        });
      })
      .catch(err => {
        console.error("Error al obtener producto:", err);
        setMensaje("No se pudo cargar los datos del producto");
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('nombreProducto', form.nombreProducto);
    formData.append('descripcion', form.descripcion);
    formData.append('idCategoria', form.idCategoria);
    formData.append('idDisponibilidad', form.idDisponibilidad);
    formData.append('precio', form.precio);
    formData.append('stock', form.stock);
    if (form.foto) formData.append('foto', form.foto);

    try {
      await api.put(`/producto/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      navigate('/perfil');
    } catch (err) {
      console.error("Error al actualizar producto:", err);
      setMensaje("Error al guardar los cambios");
    }
  };

  return (
    <div className={layoutStyles.wrapper}>
      <main className={layoutStyles.mainContent}>
        <div className={styles.editContainer}>
          <div className={styles.editLogoBackground} />
          <h2 className={styles.editTitle}>EDITAR PRODUCTO</h2>
          {mensaje && <p style={{ color: 'red' }}>{mensaje}</p>}
          <form onSubmit={handleSubmit}>
            <label className={styles.editLabel}>IMAGEN</label>
            <input
              type="file"
              name="foto"
              accept="image/*"
              onChange={handleChange}
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>NOMBRE DEL PRODUCTO</label>
            <input
              type="text"
              name="nombreProducto"
              placeholder="Nombre de producto"
              value={form.nombreProducto}
              onChange={handleChange}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>DESCRIPCION</label>
            <input
              type="text"
              name="descripcion"
              placeholder="Descripción"
              value={form.descripcion}
              onChange={handleChange}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>CATEGORÍA</label>
            <select
              name="idCategoria"
              value={form.idCategoria}
              onChange={handleChange}
              required
              className={styles.editSelectField}
            >
              <option value="" disabled>— Selecciona una categoría —</option>
              {categorias.map(cat => (
                <option key={cat.idCategoria} value={cat.idCategoria}>
                  {cat.NombreCategoria}
                </option>
              ))}
            </select>

            <label className={styles.editLabel}>DISPONIBILIDAD</label>
            <select
              name="idDisponibilidad"
              value={form.idDisponibilidad}
              onChange={handleChange}
              required
              className={styles.editSelectField}
            >
              <option value="" disabled>— Selecciona disponibilidad —</option>
              {disponibilidades.map(d => (
                <option key={d.idDisponibilidad} value={d.idDisponibilidad}>
                  {d.NombreDisponibilidad}
                </option>
              ))}
            </select>

            <label className={styles.editLabel}>PRECIO</label>
            <input
              type="number"
              name="precio"
              placeholder="Precio"
              value={form.precio}
              onChange={handleChange}
              required
              className={styles.editInputField}
            />

            <label className={styles.editLabel}>CANTIDAD</label>
            <input
              type="number"
              name="stock"
              placeholder="Cantidad"
              value={form.stock}
              onChange={handleChange}
              required
              className={styles.editInputField}
            />

            <div className={styles.editButtons}>
              <button
                type="button"
                onClick={() => navigate('/perfil')}
                className={styles.editActionButton}
              >
                CANCELAR
              </button>
              <button type="submit" className={styles.editActionButton}>
                GUARDAR
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
