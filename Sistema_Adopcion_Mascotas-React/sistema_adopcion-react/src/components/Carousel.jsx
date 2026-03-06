import React, { useState, useEffect } from "react";
import "../styles/Carousel.css";

const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Cargar avisos desde la API
  useEffect(() => {
    cargarAvisos();
  }, []);

  const cargarAvisos = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/avisos");
      const data = await res.json();
      
      if (data.length > 0) {
        setSlides(data);
      } else {
        // Si no hay avisos, mostrar placeholder
        setSlides([
          {
            id: 1,
            titulo: "Bienvenido a Animal Home",
            descripcion: "Encuentra tu mascota ideal",
            imagen_url: null
          }
        ]);
      }
    } catch (error) {
      console.error("Error al cargar avisos:", error);
      // Fallback en caso de error
      setSlides([
        {
          id: 1,
          titulo: "Bienvenido",
          descripcion: "Sistema de adopción de mascotas",
          imagen_url: null
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-play cada 5 segundos
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [slides.length, index]);

  if (loading) {
    return (
      <div className="carousel-container">
        <div className="carousel-loading">
          <div className="loader-spinner"></div>
          <p>Cargando avisos...</p>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <div className="carousel-container">
      {slides.length > 1 && (
        <button className="arrow left" onClick={prevSlide}>❮</button>
      )}

      <div className="carousel-slide">
        {slides[index].imagen_url ? (
          <img 
            src={`http://localhost:4000${slides[index].imagen_url}`} 
            alt={slides[index].titulo}
            className="carousel-image"
          />
        ) : (
          <div className="carousel-placeholder">
            <div className="placeholder-icon">📢</div>
          </div>
        )}
        <div className="carousel-content">
          <h2>{slides[index].titulo}</h2>
          <p>{slides[index].descripcion}</p>
        </div>
      </div>

      {slides.length > 1 && (
        <button className="arrow right" onClick={nextSlide}>❯</button>
      )}

      {/* Indicadores */}
      {slides.length > 1 && (
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`indicator ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;