import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Tu instancia Axios con baseURL ya configurada
import styles from "../assets/styles/login-registro.module.css";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Llamada al backend
      const res = await api.post("/auth/login", { correo, contrasena });
      const { token, usuario } = res.data;

      // Guardar token y usuario en localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("usuario", JSON.stringify(usuario));

      console.log("Usuario logueado:", usuario);

      // Redirigir al home
      navigate("/home");
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Correo o contraseña incorrectos");
      } else {
        setError("Error al iniciar sesión. Intenta más tarde.");
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <h1 className={styles.InicioSesion}>INICIAR SESIÓN</h1>
      </header>
        <div className={styles.loginContent}>
          <div className={styles.fotoAnahuac} />
          <div className={styles.containerLogin}>
            <h2>¡¡BIENVENID@!!</h2>
            <form onSubmit={handleLogin}>
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
              {error && <p style={{ color: "red" }}>{error}</p>}
              <div className={styles.buttons}>
                <a href="/registro">
                  <button type="button" id="registerBtn">
                    REGISTRARSE
                  </button>
                </a>
                <button type="submit">SIGUIENTE</button>
              </div>
            </form>
          </div>
        </div>
      <footer>
        <p className={styles.note}>
          Recuerda ingresar con tu correo institucional
        </p>
      </footer>
    </div>
  );
}

export default Login;
