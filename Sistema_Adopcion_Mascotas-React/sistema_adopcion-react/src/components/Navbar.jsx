import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../img/logo-light-transparent.png";

const Navbar = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  
  const [menuAbierto, setMenuAbierto] = useState(null);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const toggleMenu = (menu) => {
    if (window.innerWidth <= 768) {
      const menuElement = document.querySelector(`.menu-desplegable.${menu}`);
      if (menuElement) {
        menuElement.classList.toggle('active');
      }
    }
    
    if (menuAbierto === menu) {
      setMenuAbierto(null);
    } else {
      setMenuAbierto(menu);
    }
  };

  const cerrarMenus = () => {
    setMenuAbierto(null);
  };

  const toggleMenuMovil = () => {
    setMenuMovilAbierto(!menuMovilAbierto);
    setMenuAbierto(null);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Logo */}
        <div className="navbar-logo" onClick={() => navigate("/")}>
          <img src={logo} alt="Animal Home Logo" className="logo-img" />
        </div>

        {/* Hamburguesa (móvil) */}
        <button className="navbar-toggle" onClick={toggleMenuMovil}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú principal */}
        <ul className={`navbar-menu ${menuMovilAbierto ? 'active' : ''}`}>
          
          {/* Inicio */}
          <li>
            <button onClick={() => { navigate("/"); cerrarMenus(); }}>
              Inicio
            </button>
          </li>

          {/* Nosotros (con menú desplegable) */}
          <li 
            className={`menu-desplegable nosotros ${menuAbierto === 'nosotros' ? 'active' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setMenuAbierto('nosotros')}
            onMouseLeave={() => window.innerWidth > 768 && cerrarMenus()}
          >
            <button onClick={() => toggleMenu('nosotros')}>
              Sobre Nosotros
            </button>
            
            {menuAbierto === 'nosotros' && (
              <div className="mega-menu nosotros-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-column">
                    <h3>Acerca de Nosotros</h3>
                    <ul>
                      <li onClick={() => { navigate("/quienes-somos"); cerrarMenus(); }}>
                        <span className="icon">🏠</span>
                        <div>
                          <strong>Quiénes Somos</strong>
                          <p>Nuestra historia y misión</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/mision-vision"); cerrarMenus(); }}>
                        <span className="icon">🎯</span>
                        <div>
                          <strong>Misión y Visión</strong>
                          <p>Nuestros objetivos</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/equipo"); cerrarMenus(); }}>
                        <span className="icon">👥</span>
                        <div>
                          <strong>Nuestro Equipo</strong>
                          <p>Conoce a nuestro equipo</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-menu-column">
                    <h3>Impacto</h3>
                    <ul>
                      <li onClick={() => { navigate("/historias-exito"); cerrarMenus(); }}>
                        <span className="icon">⭐</span>
                        <div>
                          <strong>Historias de Éxito</strong>
                          <p>Adopciones felices</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/testimonios"); cerrarMenus(); }}>
                        <span className="icon">💬</span>
                        <div>
                          <strong>Testimonios</strong>
                          <p>Lo que dicen de nosotros</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/galeria"); cerrarMenus(); }}>
                        <span className="icon">📸</span>
                        <div>
                          <strong>Galería</strong>
                          <p>Fotos de nuestros rescates</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Servicios (con menú desplegable) */}
          <li 
            className={`menu-desplegable servicios ${menuAbierto === 'servicios' ? 'active' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setMenuAbierto('servicios')}
            onMouseLeave={() => window.innerWidth > 768 && cerrarMenus()}
          >
            <button onClick={() => toggleMenu('servicios')}>
              Servicios
            </button>
            
            {menuAbierto === 'servicios' && (
              <div className="mega-menu servicios-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-column">
                    <h3>Adopción</h3>
                    <ul>
                      <li onClick={() => { navigate("/mascotas"); cerrarMenus(); }}>
                        <span className="icon">🐶</span>
                        <div>
                          <strong>Mascotas Disponibles</strong>
                          <p>Encuentra tu compañero ideal</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/info-mascotas"); cerrarMenus(); }}>
                        <span className="icon">📋</span>
                        <div>
                          <strong>Proceso de Adopción</strong>
                          <p>Cómo adoptar paso a paso</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/info-citas"); cerrarMenus(); }}>
                        <span className="icon">📅</span>
                        <div>
                          <strong>Agenda una Cita</strong>
                          <p>Conoce a tu futura mascota</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-menu-column">
                    <h3>Colabora</h3>
                    <ul>
                      <li onClick={() => { navigate("/donaciones"); cerrarMenus(); }}>
                        <span className="icon">💝</span>
                        <div>
                          <strong>Donaciones</strong>
                          <p>Ayuda a cambiar vidas</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/voluntariado"); cerrarMenus(); }}>
                        <span className="icon">🤝</span>
                        <div>
                          <strong>Voluntariado</strong>
                          <p>Únete a nuestro equipo</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/apadrina"); cerrarMenus(); }}>
                        <span className="icon">❤️</span>
                        <div>
                          <strong>Apadrina una Mascota</strong>
                          <p>Apoya sin adoptar</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-menu-column">
                    <h3>Recursos</h3>
                    <ul>
                      <li onClick={() => { navigate("/consejos"); cerrarMenus(); }}>
                        <span className="icon">💡</span>
                        <div>
                          <strong>Consejos y Guías</strong>
                          <p>Cuidado de mascotas</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/preguntas-frecuentes"); cerrarMenus(); }}>
                        <span className="icon">❓</span>
                        <div>
                          <strong>Preguntas Frecuentes</strong>
                          <p>Resuelve tus dudas</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/blog"); cerrarMenus(); }}>
                        <span className="icon">📰</span>
                        <div>
                          <strong>Blog</strong>
                          <p>Noticias y artículos</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>

          {/* Contacto (con menú desplegable) */}
          <li 
            className={`menu-desplegable contacto ${menuAbierto === 'contacto' ? 'active' : ''}`}
            onMouseEnter={() => window.innerWidth > 768 && setMenuAbierto('contacto')}
            onMouseLeave={() => window.innerWidth > 768 && cerrarMenus()}
          >
            <button onClick={() => toggleMenu('contacto')}>
              Contacto
            </button>
            
            {menuAbierto === 'contacto' && (
              <div className="mega-menu contacto-menu">
                <div className="mega-menu-content">
                  <div className="mega-menu-column">
                    <h3>Contáctanos</h3>
                    <ul>
                      <li onClick={() => { navigate("/contacto"); cerrarMenus(); }}>
                        <span className="icon">📧</span>
                        <div>
                          <strong>Formulario de Contacto</strong>
                          <p>Envíanos un mensaje</p>
                        </div>
                      </li>
                      <li onClick={() => { navigate("/ubicacion"); cerrarMenus(); }}>
                        <span className="icon">📍</span>
                        <div>
                          <strong>Ubicación</strong>
                          <p>Visítanos en nuestro refugio</p>
                        </div>
                      </li>
                      <li>
                        <span className="icon">📞</span>
                        <div>
                          <strong>Teléfono</strong>
                          <p>(02) 123-4567</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="mega-menu-column">
                    <h3>Horarios</h3>
                    <ul>
                      <li>
                        <span className="icon">🕐</span>
                        <div>
                          <strong>Lunes a Viernes</strong>
                          <p>9:00 AM - 6:00 PM</p>
                        </div>
                      </li>
                      <li>
                        <span className="icon">🕐</span>
                        <div>
                          <strong>Sábados</strong>
                          <p>9:00 AM - 2:00 PM</p>
                        </div>
                      </li>
                      <li>
                        <span className="icon">🚫</span>
                        <div>
                          <strong>Domingos</strong>
                          <p>Cerrado</p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </li>
        </ul>

        {/* Iconos de usuario (derecha) */}
        <div className="navbar-user-icons">
          {usuario ? (
            <>
              <span 
                className="icon-profile" 
                title="Mi Perfil"
                onClick={() => navigate("/perfil")}
              >
                👤
              </span>
              {usuario.rol === "admin" && (
                <span 
                  className="icon-admin" 
                  title="Panel Admin"
                  onClick={() => navigate("/admin")}
                >
                  ⚙️
                </span>
              )}
              <span 
                className="icon-logout" 
                title="Cerrar sesión"
                onClick={cerrarSesion}
              >
                🚪
              </span>
            </>
          ) : (
            <button className="btn-login-icon" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;