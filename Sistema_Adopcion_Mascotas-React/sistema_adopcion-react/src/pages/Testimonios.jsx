import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Testimonios.css";

const Testimonios = () => {
  const navigate = useNavigate();
  const [filtroActivo, setFiltroActivo] = useState("todos");

  // Datos de testimonios
  const testimonios = [
    {
      id: 1,
      nombre: "María González",
      mascota: "Max",
      tipo: "perro",
      fecha: "Enero 2024",
      calificacion: 5,
      testimonio: "Adoptar a Max fue la mejor decisión que tomamos. Es un perro increíble, lleno de energía y amor. El proceso de adopción fue muy profesional y nos acompañaron en cada paso. ¡Gracias Animal Home!",
      avatar: "👩"
    },
    {
      id: 2,
      nombre: "Carlos Ramírez",
      mascota: "Luna",
      tipo: "gato",
      fecha: "Febrero 2024",
      calificacion: 5,
      testimonio: "Luna ha transformado nuestro hogar. Es una gatita hermosa y cariñosa. El equipo de Animal Home nos ayudó a encontrar la mascota perfecta para nuestra familia. El seguimiento post-adopción fue excelente.",
      avatar: "👨"
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      mascota: "Rocky",
      tipo: "perro",
      fecha: "Marzo 2024",
      calificacion: 5,
      testimonio: "Rocky es mi compañero fiel. Estaba nervioso al principio pero el personal de Animal Home me dio excelentes consejos para ayudarlo a adaptarse. Ahora es el perro más feliz del mundo.",
      avatar: "👩‍🦰"
    },
    {
      id: 4,
      nombre: "Roberto Silva",
      mascota: "Michi",
      tipo: "gato",
      fecha: "Abril 2024",
      calificacion: 5,
      testimonio: "Michi llegó a mi vida cuando más lo necesitaba. Es un gato tranquilo y amoroso. Animal Home hace un trabajo increíble rescatando y rehabilitando animales. ¡Totalmente recomendado!",
      avatar: "👨‍💼"
    },
    {
      id: 5,
      nombre: "Laura Pérez",
      mascota: "Bella",
      tipo: "perro",
      fecha: "Mayo 2024",
      calificacion: 5,
      testimonio: "Bella es la mejor amiga de mis hijos. Es dulce, protectora y muy inteligente. El proceso de adopción fue sencillo y nos sentimos apoyados en todo momento. ¡Gracias por darnos esta alegría!",
      avatar: "👩‍⚕️"
    },
    {
      id: 6,
      nombre: "Jorge Torres",
      mascota: "Simba",
      tipo: "gato",
      fecha: "Junio 2024",
      calificacion: 5,
      testimonio: "Simba es un gato extraordinario. A pesar de su lesión pasada, es activo y juguetón. Animal Home se aseguró de que estuviera completamente recuperado antes de la adopción. Excelente organización.",
      avatar: "👨‍🔧"
    },
    {
      id: 7,
      nombre: "Patricia Morales",
      mascota: "Toby",
      tipo: "perro",
      fecha: "Julio 2024",
      calificacion: 5,
      testimonio: "Toby es mi mejor compañero de vida. Es leal, cariñoso y muy obediente. El equipo de Animal Home me ayudó a encontrar exactamente lo que buscaba. ¡Estoy eternamente agradecida!",
      avatar: "👩‍🎓"
    },
    {
      id: 8,
      nombre: "Miguel Gómez",
      mascota: "Pelusa",
      tipo: "gato",
      fecha: "Agosto 2024",
      calificacion: 5,
      testimonio: "Pelusa es una gatita adorable. Me encanta cómo ronronea cuando la acaricio. Animal Home tiene un proceso de adopción muy organizado y humano. ¡Los recomiendo al 100%!",
      avatar: "👨‍🏫"
    },
    {
      id: 9,
      nombre: "Sofía Vargas",
      mascota: "Duke",
      tipo: "perro",
      fecha: "Septiembre 2024",
      calificacion: 5,
      testimonio: "Duke es parte de nuestra familia ahora. Es protector, juguetón y muy cariñoso con los niños. Animal Home nos brindó toda la información necesaria para cuidarlo correctamente.",
      avatar: "👩‍💻"
    },
    {
      id: 10,
      nombre: "Fernando López",
      mascota: "Mia",
      tipo: "gato",
      fecha: "Octubre 2024",
      calificacion: 5,
      testimonio: "Mia es una gata elegante y tranquila. Me hace compañía todos los días y ha llenado mi vida de alegría. Gracias Animal Home por hacer posible esta adopción.",
      avatar: "👨‍⚖️"
    },
    {
      id: 11,
      nombre: "Daniela Sánchez",
      mascota: "Bruno",
      tipo: "perro",
      fecha: "Noviembre 2024",
      calificacion: 5,
      testimonio: "Bruno es increíble. Llegó a nuestra vida para quedarse. Es enérgico, inteligente y muy amoroso. El seguimiento de Animal Home ha sido excelente. ¡Gracias por todo!",
      avatar: "👩‍🔬"
    },
    {
      id: 12,
      nombre: "Ricardo Díaz",
      mascota: "Nala",
      tipo: "gato",
      fecha: "Diciembre 2024",
      calificacion: 5,
      testimonio: "Nala es perfecta. Es cariñosa, juguetona y muy curiosa. Animal Home se tomó el tiempo de conocernos y asegurarse de que éramos la familia adecuada para ella. Excelente trabajo.",
      avatar: "👨‍🎨"
    }
  ];

  const testimoniosFiltrados = filtroActivo === "todos" 
    ? testimonios 
    : testimonios.filter(t => t.tipo === filtroActivo);

  const renderEstrellas = (calificacion) => {
    return "⭐".repeat(calificacion);
  };

  return (
    <div className="testimonios-page">
      <Navbar />
      
      <main className="testimonios-container">
        
        {/* Hero Section */}
        <section className="hero-testimonios">
          <div className="hero-testimonios-content">
            <h1>Testimonios</h1>
            <p className="hero-testimonios-subtitle">
              Las voces de quienes encontraron a su compañero perfecto
            </p>
          </div>
        </section>

        {/* Introducción */}
        <section className="intro-testimonios">
          <div className="intro-testimonios-content">
            <h2>Lo Que Dicen Nuestras Familias</h2>
            <div className="intro-line-testimonios"></div>
            <p>
              La satisfacción de nuestras familias adoptantes es nuestro mayor logro. 
              Lee las experiencias de quienes ya dieron el paso y cambiaron una vida para siempre.
            </p>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="stats-testimonios">
          <div className="stats-testimonios-grid">
            <div className="stat-testimonios">
              <div className="stat-testimonios-icon">⭐</div>
              <div className="stat-testimonios-numero">4.9/5</div>
              <p>Calificación Promedio</p>
            </div>
            <div className="stat-testimonios">
              <div className="stat-testimonios-icon">💬</div>
              <div className="stat-testimonios-numero">500+</div>
              <p>Testimonios Recibidos</p>
            </div>
            <div className="stat-testimonios">
              <div className="stat-testimonios-icon">❤️</div>
              <div className="stat-testimonios-numero">98%</div>
              <p>Recomendarían Animal Home</p>
            </div>
          </div>
        </section>

        {/* Filtros */}
        <section className="filtros-testimonios">
          <div className="filtros-testimonios-container">
            <h3>Filtrar por tipo:</h3>
            <div className="filtros-buttons">
              <button 
                className={filtroActivo === "todos" ? "active" : ""}
                onClick={() => setFiltroActivo("todos")}
              >
                Todos ({testimonios.length})
              </button>
              <button 
                className={filtroActivo === "perro" ? "active" : ""}
                onClick={() => setFiltroActivo("perro")}
              >
                🐕 Perros ({testimonios.filter(t => t.tipo === "perro").length})
              </button>
              <button 
                className={filtroActivo === "gato" ? "active" : ""}
                onClick={() => setFiltroActivo("gato")}
              >
                🐱 Gatos ({testimonios.filter(t => t.tipo === "gato").length})
              </button>
            </div>
          </div>
        </section>

        {/* Grid de Testimonios */}
        <section className="testimonios-grid-section">
          <div className="testimonios-grid">
            {testimoniosFiltrados.map((testimonio) => (
              <div key={testimonio.id} className="testimonio-card">
                <div className="testimonio-header">
                  <div className="testimonio-avatar">{testimonio.avatar}</div>
                  <div className="testimonio-info">
                    <h3>{testimonio.nombre}</h3>
                    <p className="testimonio-mascota">Adoptó a <strong>{testimonio.mascota}</strong></p>
                  </div>
                </div>

                <div className="testimonio-calificacion">
                  {renderEstrellas(testimonio.calificacion)}
                </div>

                <p className="testimonio-texto">"{testimonio.testimonio}"</p>

                <div className="testimonio-footer">
                  <span className="testimonio-fecha">{testimonio.fecha}</span>
                  <span className="testimonio-verificado">✓ Verificado</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Sección de Comparte Tu Historia */}
        <section className="comparte-historia">
          <div className="comparte-historia-content">
            <h2>¿Ya Adoptaste? Comparte Tu Historia</h2>
            <p>Tu experiencia puede inspirar a otros a dar el paso y salvar una vida.</p>
            <button className="btn-compartir" onClick={() => navigate("/contacto")}>
              Enviar Mi Testimonio
            </button>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-testimonios">
          <div className="cta-testimonios-content">
            <h2>Únete a Nuestras Familias Felices</h2>
            <p>Descubre a tu compañero ideal y crea tu propia historia de éxito</p>
            <div className="cta-testimonios-buttons">
              <button className="cta-testimonios-btn primary" onClick={() => navigate("/mascotas")}>
                Ver Mascotas Disponibles
              </button>
              <button className="cta-testimonios-btn secondary" onClick={() => navigate("/info-mascotas")}>
                Conocer el Proceso
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Testimonios;