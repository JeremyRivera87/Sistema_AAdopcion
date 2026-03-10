import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Galeria.css";

const Galeria = () => {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [imagenModal, setImagenModal] = useState(null);

  // Datos de la galería (puedes moverlo a base de datos después)
  const galeria = [
    {
      id: 1,
      titulo: "Max disfrutando del parque",
      categoria: "mascotas",
      emoji: "🐕",
      color: "#fbbf24",
      descripcion: "Max en su primer paseo después de ser adoptado"
    },
    {
      id: 2,
      titulo: "Luna tomando sol",
      categoria: "mascotas",
      emoji: "🐱",
      color: "#a78bfa",
      descripcion: "Luna descansando en su nuevo hogar"
    },
    {
      id: 3,
      titulo: "Evento de Adopción Marzo 2024",
      categoria: "eventos",
      emoji: "🎉",
      color: "#34d399",
      descripcion: "Jornada de adopción en el parque central"
    },
    {
      id: 4,
      titulo: "Rocky jugando con su familia",
      categoria: "mascotas",
      emoji: "🐕‍🦺",
      color: "#f472b6",
      descripcion: "Rocky feliz con su nueva familia"
    },
    {
      id: 5,
      titulo: "Voluntarios en acción",
      categoria: "voluntarios",
      emoji: "🤝",
      color: "#60a5fa",
      descripcion: "Nuestro equipo de voluntarios preparando alimentos"
    },
    {
      id: 6,
      titulo: "Michi explorando",
      categoria: "mascotas",
      emoji: "🐈",
      color: "#fb923c",
      descripcion: "Michi descubriendo su nuevo jardín"
    },
    {
      id: 7,
      titulo: "Campaña de Esterilización",
      categoria: "eventos",
      emoji: "🏥",
      color: "#10b981",
      descripcion: "Jornada gratuita de esterilización"
    },
    {
      id: 8,
      titulo: "Bella y sus cachorros",
      categoria: "mascotas",
      emoji: "🐩",
      color: "#f59e0b",
      descripcion: "Bella con sus hermosos cachorros"
    },
    {
      id: 9,
      titulo: "Limpieza del refugio",
      categoria: "voluntarios",
      emoji: "🧹",
      color: "#8b5cf6",
      descripcion: "Voluntarios embelleciendo el refugio"
    },
    {
      id: 10,
      titulo: "Simba recuperándose",
      categoria: "mascotas",
      emoji: "🦁",
      color: "#ec4899",
      descripcion: "Simba después de su cirugía exitosa"
    },
    {
      id: 11,
      titulo: "Charla educativa en escuela",
      categoria: "eventos",
      emoji: "🎓",
      color: "#14b8a6",
      descripcion: "Educando sobre tenencia responsable"
    },
    {
      id: 12,
      titulo: "Toby en entrenamiento",
      categoria: "mascotas",
      emoji: "🎾",
      color: "#f97316",
      descripcion: "Toby aprendiendo nuevos trucos"
    },
    {
      id: 13,
      titulo: "Equipo de rescate",
      categoria: "voluntarios",
      emoji: "🚑",
      color: "#06b6d4",
      descripcion: "Nuestro equipo de rescate en una misión"
    },
    {
      id: 14,
      titulo: "Pelusa acurrucada",
      categoria: "mascotas",
      emoji: "😺",
      color: "#d946ef",
      descripcion: "Pelusa en su lugar favorito"
    },
    {
      id: 15,
      titulo: "Feria de Adopción Navideña",
      categoria: "eventos",
      emoji: "🎄",
      color: "#ef4444",
      descripcion: "Evento especial de diciembre 2024"
    },
    {
      id: 16,
      titulo: "Duke protegiendo su hogar",
      categoria: "mascotas",
      emoji: "🛡️",
      color: "#84cc16",
      descripcion: "Duke feliz en su nuevo rol"
    },
    {
      id: 17,
      titulo: "Capacitación de voluntarios",
      categoria: "voluntarios",
      emoji: "📚",
      color: "#22c55e",
      descripcion: "Taller de cuidado animal"
    },
    {
      id: 18,
      titulo: "Mia en su ventana favorita",
      categoria: "mascotas",
      emoji: "🪟",
      color: "#a855f7",
      descripcion: "Mia observando el mundo exterior"
    },
    {
      id: 19,
      titulo: "Campaña de donaciones",
      categoria: "eventos",
      emoji: "💰",
      color: "#06b6d4",
      descripcion: "Recolección de alimentos y juguetes"
    },
    {
      id: 20,
      titulo: "Bruno corriendo libre",
      categoria: "mascotas",
      emoji: "🏃",
      color: "#fbbf24",
      descripcion: "Bruno disfrutando del aire libre"
    },
    {
      id: 21,
      titulo: "Equipo médico veterinario",
      categoria: "voluntarios",
      emoji: "👨‍⚕️",
      color: "#3b82f6",
      descripcion: "Nuestros veterinarios en acción"
    },
    {
      id: 22,
      titulo: "Nala jugando",
      categoria: "mascotas",
      emoji: "🧶",
      color: "#f472b6",
      descripcion: "Nala con su juguete favorito"
    },
    {
      id: 23,
      titulo: "Aniversario Animal Home",
      categoria: "eventos",
      emoji: "🎂",
      color: "#8b5cf6",
      descripcion: "Celebrando 6 años de amor animal"
    },
    {
      id: 24,
      titulo: "Familia completa",
      categoria: "mascotas",
      emoji: "👨‍👩‍👧‍👦",
      color: "#10b981",
      descripcion: "Todos nuestros rescatados del mes"
    }
  ];

  const galeriaFiltrada = categoriaActiva === "todas" 
    ? galeria 
    : galeria.filter(item => item.categoria === categoriaActiva);

  const abrirModal = (imagen) => {
    setImagenModal(imagen);
  };

  const cerrarModal = () => {
    setImagenModal(null);
  };

  const categorias = [
    { id: "todas", nombre: "Todas", icono: "🖼️" },
    { id: "mascotas", nombre: "Mascotas", icono: "🐾" },
    { id: "eventos", nombre: "Eventos", icono: "🎉" },
    { id: "voluntarios", nombre: "Voluntarios", icono: "🤝" }
  ];

  return (
    <div className="galeria-page">
      <Navbar />
      
      <main className="galeria-container">
        
        {/* Hero Section */}
        <section className="hero-galeria">
          <div className="hero-galeria-content">
            <h1>Galería</h1>
            <p className="hero-galeria-subtitle">
              Momentos especiales, sonrisas y segundas oportunidades capturadas en imágenes
            </p>
          </div>
        </section>

        {/* Introducción */}
        <section className="intro-galeria">
          <div className="intro-galeria-content">
            <h2>Nuestros Mejores Momentos</h2>
            <div className="intro-line-galeria"></div>
            <p>
              Cada imagen cuenta una historia de amor, esperanza y transformación. 
              Explora los momentos más especiales de Animal Home: desde adopciones felices 
              hasta eventos comunitarios y el trabajo diario de nuestros voluntarios.
            </p>
          </div>
        </section>

        {/* Estadísticas de la galería */}
        <section className="stats-galeria">
          <div className="stats-galeria-grid">
            <div className="stat-galeria">
              <div className="stat-galeria-numero">{galeria.length}</div>
              <p>Momentos Capturados</p>
            </div>
            <div className="stat-galeria">
              <div className="stat-galeria-numero">{galeria.filter(g => g.categoria === "mascotas").length}</div>
              <p>Fotos de Mascotas</p>
            </div>
            <div className="stat-galeria">
              <div className="stat-galeria-numero">{galeria.filter(g => g.categoria === "eventos").length}</div>
              <p>Eventos Documentados</p>
            </div>
            <div className="stat-galeria">
              <div className="stat-galeria-numero">{galeria.filter(g => g.categoria === "voluntarios").length}</div>
              <p>Voluntarios en Acción</p>
            </div>
          </div>
        </section>

        {/* Filtros de categoría */}
        <section className="filtros-galeria">
          <div className="filtros-galeria-container">
            <h3>Explorar por categoría:</h3>
            <div className="categorias-buttons">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  className={categoriaActiva === cat.id ? "active" : ""}
                  onClick={() => setCategoriaActiva(cat.id)}
                >
                  <span className="cat-icono">{cat.icono}</span>
                  <span className="cat-nombre">{cat.nombre}</span>
                  <span className="cat-count">
                    ({cat.id === "todas" ? galeria.length : galeria.filter(g => g.categoria === cat.id).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Galería */}
        <section className="galeria-grid-section">
          <div className="galeria-grid">
            {galeriaFiltrada.map((item) => (
              <div 
                key={item.id} 
                className="galeria-item"
                onClick={() => abrirModal(item)}
              >
                <div className="galeria-imagen" style={{ backgroundColor: item.color }}>
                  <div className="galeria-emoji">{item.emoji}</div>
                  <div className="galeria-overlay">
                    <span className="icono-zoom">🔍</span>
                  </div>
                </div>
                <div className="galeria-info">
                  <h3>{item.titulo}</h3>
                  <p>{item.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contador de resultados */}
        <section className="galeria-contador">
          <p>
            Mostrando <strong>{galeriaFiltrada.length}</strong> {galeriaFiltrada.length === 1 ? 'imagen' : 'imágenes'}
            {categoriaActiva !== "todas" && ` en la categoría "${categorias.find(c => c.id === categoriaActiva)?.nombre}"`}
          </p>
        </section>

        {/* Call to Action */}
        <section className="cta-galeria">
          <div className="cta-galeria-content">
            <h2>¿Quieres Ser Parte de Nuestra Galería?</h2>
            <p>Adopta, sé voluntario o participa en nuestros eventos y crea tu propia historia con nosotros</p>
            <div className="cta-galeria-buttons">
              <button className="cta-galeria-btn primary" onClick={() => navigate("/mascotas")}>
                Adoptar una Mascota
              </button>
              <button className="cta-galeria-btn secondary" onClick={() => navigate("/voluntariado")}>
                Ser Voluntario
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Modal de Imagen */}
      {imagenModal && (
        <div className="modal-galeria-overlay" onClick={cerrarModal}>
          <div className="modal-galeria-content" onClick={(e) => e.stopPropagation()}>
            <button className="btn-cerrar-galeria" onClick={cerrarModal}>✕</button>
            
            <div className="modal-galeria-imagen" style={{ backgroundColor: imagenModal.color }}>
              <div className="modal-galeria-emoji">{imagenModal.emoji}</div>
            </div>
            
            <div className="modal-galeria-info">
              <h2>{imagenModal.titulo}</h2>
              <p className="modal-galeria-categoria">
                Categoría: <strong>{categorias.find(c => c.id === imagenModal.categoria)?.nombre}</strong>
              </p>
              <p className="modal-galeria-descripcion">{imagenModal.descripcion}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Galeria;