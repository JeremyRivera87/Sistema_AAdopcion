import React from "react";
import Carousel from "../components/Carousel";
import "../styles/User.css";
import logo from "../img/logo-light-transparent.png";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {

  const navigate = useNavigate();
  
  return (
    <div className="user-page">

      {/* NAVBAR */}
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
          <a href="/login">Iniciar Sesión</a>
        </div>

      </nav>

      <main className="home-user-container">

        <header className="header">
          <h1>Bienvenido al Sistema de Adopción de Mascotas</h1>
        </header>

        <section className="intro">
          <p>
            Aquí podrás ver las mascotas disponibles, agendar una cita y seguir tu proceso de adopción.
          </p>

          <div className="buttons">
            <button className="btn" onClick={() => navigate("/Mascotas")}>Ver Mascotas</button>
            <button className="btn">Agendar Cita</button>
            <button className="btn">Donaciones</button>
          </div>
        </section>

        {/* CARRUSEL */}
        <Carousel />

        {/* SECCIÓN ADOPCIÓN */}
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

        {/* SECCIÓN REQUISITOS */}
        <section className="requisitos-section">

          <h2 className="requisitos-title">Requisitos</h2>
          <div className="requisitos-line"></div>

          <div className="requisitos-cards">

            <div className="requisito-card">
              <img src="/img/requisito1.jpg" alt="Mayoría de edad" />
              <p><strong>1.</strong> Mayoría de edad</p>
            </div>

            <div className="requisito-card">
              <img src="/img/requisito2.jpg" alt="Servicio básico" />
              <p><strong>2.</strong> Copia de un servicio básico</p>
            </div>

            <div className="requisito-card">
              <img src="/img/requisito3.jpg" alt="Cédula" />
              <p><strong>3.</strong> Copia de cédula</p>
            </div>

            <div className="requisito-card">
              <img src="/img/requisito4.jpg" alt="Formulario" />
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

    </div>
  );
};

export default Usuarios;
