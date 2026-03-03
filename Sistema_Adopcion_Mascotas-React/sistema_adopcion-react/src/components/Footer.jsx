import React from "react";
import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../img/logo-light-transparent.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* LOGO Y DESCRIPCIÓN */}
        <div className="footer-section footer-logo-section">
          <img src={logo} alt="Animal Home Logo" className="footer-logo" />
          <p>
            Conectamos mascotas con familias responsables. 
            Nuestra misión es fomentar la adopción y reducir el abandono animal.
          </p>
        </div>

        {/* TÉRMINOS Y CONDICIONES */}
        <div className="footer-section">
          <h3>Términos y Condiciones</h3>
          <ul>
            <li><Link to="/terminos">Términos de Uso</Link></li>
            <li><Link to="/privacidad">Política de Privacidad</Link></li>
            <li><Link to="/responsabilidad">Responsabilidad</Link></li>
          </ul>
        </div>

        {/* CONTACTO */}
        <div className="footer-section">
          <h3>Contacto</h3>
          <p> 📧 Email: info@adoptaconamor.com</p>
          <p> 📞 Teléfono: +593 999 999 999</p>
          <p> 📍 Ecuador</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Animal Home | Desarrollado por: Jeremy Rivera | Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;