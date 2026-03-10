import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomAlert from "../components/CustomAlert";
import "../styles/Contacto.css";

const Contacto = () => {
  const navigate = useNavigate();

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "consulta",
    mensaje: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.mensaje) {
      setAlert({
        isOpen: true,
        title: "Campos Incompletos",
        message: "Por favor completa todos los campos obligatorios",
        type: "warning"
      });
      return;
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({
        isOpen: true,
        title: "Email Inválido",
        message: "Por favor ingresa un email válido",
        type: "warning"
      });
      return;
    }

    // Aquí iría la lógica para enviar el mensaje
    console.log("Mensaje enviado:", formData);

    setAlert({
      isOpen: true,
      title: "¡Mensaje Enviado! 💚",
      message: "Gracias por contactarnos. Te responderemos pronto.",
      type: "success"
    });

    // Limpiar formulario
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      asunto: "consulta",
      mensaje: ""
    });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  // Información de contacto
  const infoContacto = {
    telefono: "+593 99 123 4567",
    email: "contacto@animalhome.org",
    direccion: "Av. 10 de Agosto N34-451 y Vicente Ramón Roca, Quito, Ecuador",
    horario: "Lunes a Viernes: 9:00 AM - 6:00 PM | Sábados: 10:00 AM - 4:00 PM"
  };

  // Redes sociales
  const redesSociales = [
    {
      nombre: "Facebook",
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: "https://facebook.com/animalhome",
      color: "#1877F2"
    },
    {
      nombre: "Instagram",
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      url: "https://instagram.com/animalhome",
      color: "#E4405F"
    },
    {
      nombre: "Twitter",
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      ),
      url: "https://twitter.com/animalhome",
      color: "#000000"
    },
    {
      nombre: "TikTok",
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      url: "https://tiktok.com/@animalhome",
      color: "#000000"
    },
    {
      nombre: "WhatsApp",
      icono: (
        <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      url: "https://wa.me/593991234567",
      color: "#25D366"
    }
  ];

  // Métodos de contacto rápidos
  const metodosContacto = [
    {
      id: 1,
      titulo: "Llámanos",
      icono: "📞",
      descripcion: "Lunes a Viernes: 9:00 AM - 6:00 PM",
      info: infoContacto.telefono,
      accion: () => window.open(`tel:${infoContacto.telefono.replace(/\s/g, '')}`)
    },
    {
      id: 2,
      titulo: "Escríbenos",
      icono: "✉️",
      descripcion: "Respuesta en 24-48 horas",
      info: infoContacto.email,
      accion: () => window.open(`mailto:${infoContacto.email}`)
    },
    {
      id: 3,
      titulo: "Visítanos",
      icono: "📍",
      descripcion: "Quito, Ecuador",
      info: "Ver en el mapa",
      accion: () => navigate("/ubicacion")
    },
    {
      id: 4,
      titulo: "WhatsApp",
      icono: "💬",
      descripcion: "Chat directo y rápido",
      info: "Iniciar chat",
      accion: () => window.open("https://wa.me/593991234567", "_blank")
    }
  ];

  return (
    <div className="contacto-page">
      <Navbar />
      
      <main className="contacto-container">
        
        {/* Hero Section */}
        <section className="hero-contacto">
          <div className="hero-contacto-content">
            <h1>Contáctanos</h1>
            <p className="hero-contacto-subtitle">
              Estamos aquí para ayudarte. Envíanos tu mensaje y te responderemos pronto.
            </p>
          </div>
        </section>

        {/* Métodos de Contacto Rápido */}
        <section className="metodos-contacto">
          <div className="metodos-contacto-container">
            <h2>¿Cómo Prefieres Contactarnos?</h2>
            
            <div className="metodos-grid">
              {metodosContacto.map((metodo) => (
                <div 
                  key={metodo.id} 
                  className="metodo-card"
                  onClick={metodo.accion}
                >
                  <div className="metodo-icono">{metodo.icono}</div>
                  <h3>{metodo.titulo}</h3>
                  <p className="metodo-descripcion">{metodo.descripcion}</p>
                  <p className="metodo-info">{metodo.info}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario de Contacto */}
        <section className="formulario-contacto">
          <div className="formulario-contacto-container">
            <div className="formulario-contacto-intro">
              <h2>Envíanos un Mensaje</h2>
              <p>Completa el formulario y nos pondremos en contacto contigo lo antes posible.</p>
            </div>

            <form onSubmit={handleSubmit} className="form-contacto">
              <div className="form-row">
                <div className="form-group-contacto">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="form-group-contacto">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group-contacto">
                  <label>Teléfono</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="0999999999"
                  />
                </div>

                <div className="form-group-contacto">
                  <label>Asunto *</label>
                  <select
                    name="asunto"
                    value={formData.asunto}
                    onChange={handleChange}
                    required
                  >
                    <option value="consulta">Consulta General</option>
                    <option value="adopcion">Información sobre Adopción</option>
                    <option value="donacion">Donaciones</option>
                    <option value="voluntariado">Voluntariado</option>
                    <option value="apadrinamiento">Apadrinamiento</option>
                    <option value="perdido">Mascota Perdida</option>
                    <option value="rescate">Reportar Rescate</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>

              <div className="form-group-contacto">
                <label>Mensaje *</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Escribe tu mensaje aquí..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-enviar-contacto">
                Enviar Mensaje 📨
              </button>
            </form>
          </div>
        </section>

        {/* Información de Contacto */}
        <section className="info-contacto">
          <div className="info-contacto-container">
            <h2>Información de Contacto</h2>

            <div className="info-contacto-grid">
              <div className="info-contacto-card">
                <div className="info-contacto-icon">📍</div>
                <h3>Dirección</h3>
                <p>{infoContacto.direccion}</p>
              </div>

              <div className="info-contacto-card">
                <div className="info-contacto-icon">📞</div>
                <h3>Teléfono</h3>
                <p>{infoContacto.telefono}</p>
              </div>

              <div className="info-contacto-card">
                <div className="info-contacto-icon">✉️</div>
                <h3>Email</h3>
                <p>{infoContacto.email}</p>
              </div>

              <div className="info-contacto-card">
                <div className="info-contacto-icon">🕐</div>
                <h3>Horario</h3>
                <p>{infoContacto.horario}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Redes Sociales */}
        <section className="redes-sociales">
          <div className="redes-sociales-container">
            <h2>Síguenos en Redes Sociales</h2>
            <p className="redes-sociales-subtitle">
              Mantente al día con nuestras actividades, eventos y mascotas disponibles
            </p>

            <div className="redes-sociales-grid">
              {redesSociales.map((red, index) => (
                <a
                  key={index}
                  href={red.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="red-social-card"
                  style={{ '--red-color': red.color }}
                >
                  <div className="red-social-icono">
                    {red.icono}
                  </div>
                  <span className="red-social-nombre">{red.nombre}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Rápido */}
        <section className="faq-rapido">
          <div className="faq-rapido-container">
            <h2>Preguntas Frecuentes</h2>
            <p className="faq-rapido-subtitle">
              Tal vez encuentres tu respuesta aquí antes de contactarnos
            </p>

            <div className="faq-rapido-grid">
              <div className="faq-rapido-card" onClick={() => navigate("/preguntas-frecuentes")}>
                <div className="faq-rapido-icon">❓</div>
                <h3>¿Cómo Adoptar?</h3>
                <p>Conoce el proceso completo de adopción paso a paso</p>
              </div>

              <div className="faq-rapido-card" onClick={() => navigate("/preguntas-frecuentes")}>
                <div className="faq-rapido-icon">💰</div>
                <h3>¿Cómo Donar?</h3>
                <p>Descubre las diferentes formas de ayudarnos</p>
              </div>

              <div className="faq-rapido-card" onClick={() => navigate("/preguntas-frecuentes")}>
                <div className="faq-rapido-icon">🤝</div>
                <h3>¿Cómo Ser Voluntario?</h3>
                <p>Únete a nuestro equipo y marca la diferencia</p>
              </div>

              <div className="faq-rapido-card" onClick={() => navigate("/preguntas-frecuentes")}>
                <div className="faq-rapido-icon">📋</div>
                <h3>Ver Todas las FAQ</h3>
                <p>Explora todas nuestras preguntas frecuentes</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <CustomAlert
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />

      <Footer />
    </div>
  );
};

export default Contacto;