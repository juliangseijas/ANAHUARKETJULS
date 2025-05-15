import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../assets/styles/login-registro.module.css";

function Registro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleRegistro = async (e) => {
    e.preventDefault();

    if (!nombre || !correo || !contrasena || !telefono) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    if (!correo.endsWith("@anahuac.mx")) {
      setMensaje("El correo debe ser institucional (@anahuac.mx)");
      return;
    }

    try {
      // 1. Registrar al usuario
      await axios.post("http://localhost:3001/api/auth/register", {
        nombre,
        correo,
        contrasena,
        telefono,
      });

      // 2. Iniciar sesión automáticamente con los datos ingresados
      const loginResponse = await axios.post("http://localhost:3001/api/auth/login", {
        correo,
        contrasena,
      });

      const { token, usuario } = loginResponse.data;
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      // 3. Redirigir al home
      navigate("/home");
    } catch (error) {
      if (error.response?.data?.error) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje("Error al registrar o iniciar sesión. Intenta nuevamente.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.InicioSesion}>REGISTRATE</h1>
      </header>
      <main>
        <div className={styles.loginContent}>
          <div className={styles.fotoAnahuac} />
          <div className={styles.containerLogin}>
            <h2>¡¡BIENVENID@!!</h2>
            <form onSubmit={handleRegistro}>
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="user@anahuac.mx"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                required
              />
              <div className={styles.botonRegistroSiguiente}>
                <button type="submit">SIGUIENTE</button>
              </div>
            </form>
            {mensaje && <p>{mensaje}</p>}
          </div>
        </div>
      </main>
      <footer>
        <p className={styles.note}>
          Recuerda registrarte con tu correo institucional
        </p>
      </footer>
    </div>
  );
}

export default Registro;
