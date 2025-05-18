import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import styles from "../assets/styles/session.module.css";

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
    <div className={styles.loginWrapper}>
      <header className={styles.loginHeader}>
        <h1>INICIAR SESIÓN</h1>
      </header>

      <main className={styles.loginMain}>
        <div className={styles.loginLogoBackground} />
        <div className={styles.loginContainer}>
          <h2>¡¡BIENVENID@!!</h2>
          <form id="loginForm" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="user@anahuac.mx"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className={styles.loginInputField}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
              className={styles.loginInputField}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            <div className={styles.loginButtons}>
              <a href="/registro">
                <button
                  type="button"
                  id="registerBtn"
                  className={styles.loginActionButton}
                >
                  REGISTRARSE
                </button>
              </a>
              <a href="/main">
                <button
                  type="submit"
                  id="SiguienteBtn"
                  className={styles.loginActionButton}
                >
                  SIGUIENTE
                </button>
              </a>
            </div>
          </form>
        </div>
      </main>
      
      <footer className={styles.loginFooter}>
        <p className={styles.loginNoteText}>
          Recuerda ingresar con tu correo institucional
        </p>
      </footer>
    </div>
  );
}

export default Login;
