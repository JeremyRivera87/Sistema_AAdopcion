import React from "react";
import Carousel from "../components/Carousel";
import "../styles/User.css";
import logo from "../img/logo-light-transparent.png";


const Usuarios = () => {
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
            <button className="btn">Ver Mascotas</button>
            <button className="btn">Agendar Cita</button>
            <button className="btn">Donaciones</button>
          </div>
        </section>
        <Carousel/>
        <section className="adopcion-section">
          <h2>Adopción</h2>
          <p>
          La adopción es un proceso solidario mediante el cual brindamos una segunda
          oportunidad a animales que han sido rescatados de las calles, situaciones
          de abandono o maltrato. Cada uno de nuestros amigos peludos llega al
          refugio gracias al trabajo conjunto de voluntarios, rescatistas y
          organismos locales de bienestar animal.
          <br /><br />
          A través de estas adopciones buscamos ofrecerles un hogar seguro,
          responsable y lleno de amor, donde puedan vivir con dignidad y recibir los
          cuidados que merecen. Adoptar no solo cambia la vida de una mascota… también
          transforma la vida de quienes abren su corazón para recibirla.
          </p>
        </section>
      </main>
      

    </div>
  );
};

export default Usuarios;
