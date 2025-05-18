// src/components/Footer.jsx

import React, { useEffect } from "react";
import styles from "../assets/styles/global.module.css";

export default function Footer() {
  useEffect(() => {
    let myLandbot;
    function initLandbot() {
      if (!myLandbot) {
        const s = document.createElement("script");
        s.type = "module";
        s.async = true;
        s.addEventListener("load", () => {
          myLandbot = new Landbot.Livechat({
            configUrl:
              "https://storage.googleapis.com/landbot.online/v3/H-2933254-7JTXZ1ZLO6ESXSMS/index.json",
          });
        });
        s.src = "https://cdn.landbot.io/landbot-3/landbot-3.0.0.mjs";
        const x = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      }
    }

    window.addEventListener("mouseover", initLandbot, { once: true });
    window.addEventListener("touchstart", initLandbot, { once: true });

    return () => {
      window.removeEventListener("mouseover", initLandbot);
      window.removeEventListener("touchstart", initLandbot);
    };
  }, []);

  return (
    <footer className={styles.appFooter}>
      <div className={styles.appFooterContent}>
        {/* Sección Anahuarket */}
        <div className={styles.appFooterSection}>
          <h3 className={styles.appFooterTitle}>Anahuarket</h3>
          <p>Todos los derechos reservados – Anahuarket</p>
        </div>

        {/* Sección Contáctanos */}
        <div className={styles.appFooterSection}>
          <h3 className={styles.appFooterTitle}>
            <a href="/contacto" className={styles.appFooterLink}>
              Contáctanos
            </a>
          </h3>
          <p>
            <a href="/contacto" className={styles.appFooterParagraphLink}>
              Llama al 9988776644 para más información
            </a>
          </p>
        </div>

        {/* Aquí el chatbot se inyecta automáticamente vía Landbot */}
      </div>
    </footer>
  );
}