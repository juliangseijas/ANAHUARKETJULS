import "../assets/styles/global.module.css";

function Footer() {
  return (
    <>
      <footer className="footer-full">
        <div className="footer-content">
          <div>
            <h3>Anahuarket</h3>
            <p>Todos los derechos reservados - Anahuarket</p>
          </div>
          <div>
            <h3>
              <a href="contacto.html">Contáctanos</a>
            </h3>
            <p>
              <a href="contacto.html">
                Llama al 9988776644 para más información
              </a>
            </p>
          </div>
          <div>
            <ul>
              <li>
                <a href="#">Catálogo de productos</a>
              </li>
              <li>
                <a href="#">Los más vendidos</a>
              </li>
              <li>
                <a href="#">Tendencias</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
