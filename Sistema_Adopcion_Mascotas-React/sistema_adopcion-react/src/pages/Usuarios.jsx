import React, { useState } from "react";
import Carousel from "../components/Carousel";
import CustomAlert from "../components/CustomAlert";
import "../styles/User.css";
import logo from "../img/logo-light-transparent.png";
import img1 from "../img/mayoria de edad.png"
import img2 from "../img/servicios basicos 2.1.png"
import img3 from "../img/cedula.png"
import img4 from "../img/Formulario.png"

import { useNavigate } from "react-router-dom";

const Usuarios = () => {

  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  // Estado para la alerta personalizada
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  // 🔹 Función para agendar cita (verificar sesión)
  const handleAgendarCita = () => {
    if (!usuario) {
      setAlert({
        isOpen: true,
        title: "Sesión requerida",
        message: "Debes iniciar sesión para agendar una cita",
        type: "warning"
      });
    } else {
      navigate("/agendar-cita");
    }
  };

  // Cerrar alerta y redirigir a login si es necesario
  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
    
    // Si era alerta de login, redirigir
    if (alert.type === "warning" && alert.title === "Sesión requerida") {
      navigate("/login");
    }
  };
  
  return (
    <div className="user-page">

      <nav className="top-navbar">

        <div className="nav-left">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>
        </div>

        <div className="nav-center">
          <a href="/">Inicio</a>
          <a href="#">Sobre Nosotros</a>
          <a href="#">Servicios</a>
          <a href="#">Contacto</a>
        </div>

        <div className="nav-right">
          {!usuario ? (
          <a href="/login">Iniciar Sesión</a>
          ) : (
            <div className="user-icons">
              <span className="icon-profile"
                title="Perfil"
                onClick={() => navigate("/perfil")}
              >
                👤
              </span>
              <span
                className="icon-logout"
                title="Cerrar sesión"
                onClick={handleLogout}
              >
                🚪
              </span>
            </div>
          )}
        </div>
      </nav>

      <main className="home-user-container">

        <header className="header">
          {usuario ? (
          <h1>Bienvenido <span className="user-name">{usuario.nombre}</span> a Animal Home 🐾</h1>
        ) : (
          <h1>Bienvenido a Sistema de Adopción de Mascotas</h1>
        )}
        </header>

        <section className="intro">
          <p>
            Aquí podrás ver las mascotas disponibles, agendar una cita y seguir tu proceso de adopción.
          </p>

          <div className="buttons">
            <button className="btn" onClick={() => navigate("/Mascotas")}>Ver Mascotas</button>
            <button className="btn" onClick={handleAgendarCita}>Agendar Cita</button>
            <button className="btn" onClick={() => navigate("/donaciones")}>Donaciones</button>
          </div>
        </section>

        <Carousel />

        <section className="adopcion-section">
          <h2>Adopción</h2>
          <p>
            La adopción es un proceso solidario mediante el cual brindamos una segunda
            oportunidad a animales que han sido rescatados de las calles, situaciones
            de abandono o maltrato.
            <br /><br />
            A través de estas adopciones buscamos ofrecerles un hogar seguro,
            responsable y lleno de amor. Adoptar no solo cambia la vida de una
            mascota… también transforma la vida de quienes abren su corazón.
          </p>
        </section>

        <section className="requisitos-section">

          <h2 className="requisitos-title">Requisitos</h2>
          <div className="requisitos-line"></div>

          <div className="requisitos-cards">

            <div className="requisito-card">
              <img src={img1} alt="Mayoría de edad" />
              <p><strong>1.</strong> Mayoría de edad</p>
            </div>

            <div className="requisito-card">
              <img src={img2} alt="Servico Basico" />
              <p><strong>2.</strong> Copia de un servicio básico</p>
            </div>

            <div className="requisito-card">
              <img src={img3} alt="Copia cedula" />
              <p><strong>3.</strong> Copia de cédula</p>
            </div>

            <div className="requisito-card">
              <img src={img4} alt="Formulario" />
              <p><strong>4.</strong> Formulario de adopción</p>
            </div>

          </div>

          <p className="requisitos-text">
            Adicionalmente, se solicitan fotografías del lugar donde vivirá el futuro
            adoptado. Para garantizar el bienestar del animal, se realizan
            seguimientos posteriores mediante fotos y videos donde se evidencie su
            estado de salud y adaptación.
          </p>

        </section>

      </main>

      {/* Alerta personalizada */}
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />

    </div>
  );
};

export default Usuarios;