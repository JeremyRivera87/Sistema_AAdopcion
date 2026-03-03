import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InformacionMascotas.css";

const InformacionMascotas = () => {
  const navigate = useNavigate();

  return (
    <div className="info-mascotas-page">
      
      {/* Hero Section */}
      <section className="hero-mascotas">
        <div className="hero-overlay">
          <h1>Encuentra a tu Compañero Perfecto 🐾</h1>
          <p>Miles de mascotas esperan por una segunda oportunidad. Hoy puedes cambiar una vida.</p>
          <button className="btn-hero" onClick={() => navigate("/Mascotas")}>
            Ver Mascotas Disponibles
          </button>
        </div>
      </section>

      {/* Proceso de Adopción */}
      <section className="proceso-section">
        <div className="container">
          <h2 className="section-title">Proceso de Adopción</h2>
          <p className="section-subtitle">
            Adoptar es un proceso simple pero responsable. Te acompañamos en cada paso.
          </p>

          <div className="proceso-grid">
            <div className="proceso-card">
              <div className="proceso-numero">1</div>
              <div className="proceso-icon">🔍</div>
              <h3>Explora</h3>
              <p>Navega por nuestro catálogo y conoce a las mascotas disponibles. Cada una tiene su propia historia.</p>
            </div>

            <div className="proceso-card">
              <div className="proceso-numero">2</div>
              <div className="proceso-icon">📅</div>
              <h3>Agenda una Cita</h3>
              <p>Reserva una visita para conocer en persona a la mascota que te interesa. Podrás interactuar y conectar.</p>
            </div>

            <div className="proceso-card">
              <div className="proceso-numero">3</div>
              <div className="proceso-icon">📋</div>
              <h3>Completa el Formulario</h3>
              <p>Llena el formulario de adopción y presenta los documentos requeridos. Evaluamos que sea el match perfecto.</p>
            </div>

            <div className="proceso-card">
              <div className="proceso-numero">4</div>
              <div className="proceso-icon">🏡</div>
              <h3>Lleva a Casa</h3>
              <p>Una vez aprobado, tu nueva mascota estará lista para ir a su hogar definitivo. ¡Comienza la aventura!</p>
            </div>
          </div>
        </div>
      </section>

      {/* Beneficios de Adoptar */}
      <section className="beneficios-section">
        <div className="container">
          <h2 className="section-title">¿Por qué Adoptar?</h2>
          
          <div className="beneficios-grid">
            <div className="beneficio-card">
              <div className="beneficio-icon">❤️</div>
              <h3>Salvas una Vida</h3>
              <p>Le das una segunda oportunidad a un animal que lo necesita. Cada adopción libera espacio para otro rescate.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">💰</div>
              <h3>Más Económico</h3>
              <p>Nuestras mascotas vienen vacunadas, desparasitadas y esterilizadas. Ahorras costos veterinarios iniciales.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">🐕</div>
              <h3>Compañía Incondicional</h3>
              <p>Las mascotas adoptadas saben que fueron rescatadas. Su amor y lealtad no tienen límites.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">🏆</div>
              <h3>Apoyo Profesional</h3>
              <p>Te brindamos asesoría post-adopción, seguimiento veterinario y consejos de cuidado.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">🌟</div>
              <h3>Variedad de Opciones</h3>
              <p>Perros, gatos, cachorros, adultos, senior. Hay un compañero perfecto para cada estilo de vida.</p>
            </div>

            <div className="beneficio-card">
              <div className="beneficio-icon">🌍</div>
              <h3>Impacto Social</h3>
              <p>Reduces la sobrepoblación animal y combates el comercio irresponsable de mascotas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="estadisticas-section">
        <div className="container">
          <h2 className="section-title">Nuestro Impacto</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">250+</div>
              <div className="stat-label">Mascotas Rescatadas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">180+</div>
              <div className="stat-label">Adopciones Exitosas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">95%</div>
              <div className="stat-label">Tasa de Satisfacción</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Cuidado Continuo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Historias de Éxito */}
      <section className="historias-section">
        <div className="container">
          <h2 className="section-title">Historias que Inspiran</h2>
          <p className="section-subtitle">
            Estas son algunas de las familias felices que encontraron a su compañero perfecto
          </p>

          <div className="historias-grid">
            <div className="historia-card">
              <div className="historia-emoji">🐕‍🦺</div>
              <h3>Max y su nueva familia</h3>
              <p>"Max llegó a nuestras vidas después de estar 6 meses en el refugio. Ahora es el mejor amigo de nuestros hijos. No podríamos estar más felices."</p>
              <span className="historia-autor">— Familia Rodríguez</span>
            </div>

            <div className="historia-card">
              <div className="historia-emoji">🐈</div>
              <h3>Luna encontró su hogar</h3>
              <p>"Era una gatita callejera asustada. Con paciencia y amor se convirtió en la compañera más cariñosa. Adoptar fue la mejor decisión."</p>
              <span className="historia-autor">— María González</span>
            </div>

            <div className="historia-card">
              <div className="historia-emoji">🐶</div>
              <h3>Rocky, el guardián</h3>
              <p>"Buscábamos un perro adulto y tranquilo. Rocky superó todas nuestras expectativas. Es protector, noble y muy amoroso."</p>
              <span className="historia-autor">— Carlos Morales</span>
            </div>
          </div>
        </div>
      </section>

      {/* Requisitos Previos */}
      <section className="requisitos-previos-section">
        <div className="container">
          <h2 className="section-title">Antes de Adoptar</h2>
          <p className="section-subtitle">
            Asegúrate de cumplir con estos requisitos básicos
          </p>

          <div className="requisitos-previos-grid">
            <div className="requisito-previo">
              <div className="requisito-icon">✓</div>
              <h3>Ser mayor de 18 años</h3>
            </div>
            <div className="requisito-previo">
              <div className="requisito-icon">✓</div>
              <h3>Tener vivienda estable</h3>
            </div>
            <div className="requisito-previo">
              <div className="requisito-icon">✓</div>
              <h3>Capacidad económica para su cuidado</h3>
            </div>
            <div className="requisito-previo">
              <div className="requisito-icon">✓</div>
              <h3>Compromiso a largo plazo</h3>
            </div>
            <div className="requisito-previo">
              <div className="requisito-icon">✓</div>
              <h3>Tiempo para dedicarle</h3>
            </div>
            <div className="requisito-previo">
              <div className="requisito-icon">✓</div>
              <h3>Acuerdo familiar completo</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="cta-final">
        <div className="cta-content">
          <h2>¿Listo para Conocer a tu Futuro Compañero?</h2>
          <p>Explora nuestro catálogo y encuentra a la mascota perfecta para ti</p>
          <button className="btn-cta-final" onClick={() => navigate("/Mascotas")}>
            🐾 Ver Mascotas Disponibles
          </button>
        </div>
      </section>

      {/* Botón volver */}
      <button className="btn-volver-home" onClick={() => navigate("/")}>
        ← Volver al Inicio
      </button>

    </div>
  );
};

export default InformacionMascotas;