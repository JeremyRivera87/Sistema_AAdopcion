import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/QuienesSomos.css";

const QuienesSomos = () => {
  return (
    <div className="quienes-somos-page">
      <Navbar />
      
      <main className="quienes-somos-container">
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1>¿Quiénes Somos?</h1>
            <p className="hero-subtitle">
              Una organización dedicada a rescatar, rehabilitar y encontrar hogares amorosos para animales en situación de abandono
            </p>
          </div>
        </section>

        {/* Nuestra Historia */}
        <section className="historia-section">
          <div className="section-content">
            <div className="historia-text">
              <h2>Nuestra Historia</h2>
              <div className="timeline-line"></div>
              
              <p>
                <strong>Animal Home</strong> nació en 2018 del sueño de un grupo de amantes de los animales 
                que vieron la necesidad urgente de ayudar a perros y gatos abandonados en las calles de nuestra ciudad.
              </p>
              
              <p>
                Lo que comenzó como un pequeño refugio con capacidad para 20 animales, hoy se ha convertido 
                en un hogar temporal para más de 150 mascotas rescatadas anualmente. Cada animal que llega a 
                nuestras puertas trae consigo una historia de superación y esperanza.
              </p>

              <p>
                A lo largo de estos años, hemos logrado encontrar hogares permanentes para más de 
                <span className="highlight"> 800 mascotas</span>, gracias al apoyo incondicional de nuestra 
                comunidad, voluntarios y adoptantes comprometidos.
              </p>
            </div>

            <div className="historia-stats">
              <div className="stat-card">
                <div className="stat-number">800+</div>
                <div className="stat-label">Adopciones Exitosas</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">150+</div>
                <div className="stat-label">Mascotas en Refugio</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">6</div>
                <div className="stat-label">Años de Experiencia</div>
              </div>
              <div className="stat-card">
                <div className="stat-number">50+</div>
                <div className="stat-label">Voluntarios Activos</div>
              </div>
            </div>
          </div>
        </section>

        {/* Lo Que Hacemos */}
        <section className="hacemos-section">
          <h2>Lo Que Hacemos</h2>
          <div className="hacemos-grid">
            
            <div className="hacemos-card">
              <div className="card-icon">🏥</div>
              <h3>Rescate y Rehabilitación</h3>
              <p>
                Rescatamos animales de las calles, situaciones de maltrato y abandono. 
                Les brindamos atención veterinaria, alimentación y amor mientras se recuperan.
              </p>
            </div>

            <div className="hacemos-card">
              <div className="card-icon">💉</div>
              <h3>Atención Veterinaria</h3>
              <p>
                Todos nuestros animales reciben vacunas, desparasitación, esterilización 
                y tratamiento médico completo antes de ser dados en adopción.
              </p>
            </div>

            <div className="hacemos-card">
              <div className="card-icon">🏠</div>
              <h3>Adopción Responsable</h3>
              <p>
                Facilitamos el proceso de adopción asegurándonos de que cada mascota 
                encuentre el hogar perfecto que se adapte a sus necesidades.
              </p>
            </div>

            <div className="hacemos-card">
              <div className="card-icon">📚</div>
              <h3>Educación y Concientización</h3>
              <p>
                Promovemos la tenencia responsable de mascotas a través de campañas 
                educativas y charlas en escuelas y comunidades.
              </p>
            </div>

            <div className="hacemos-card">
              <div className="card-icon">🤝</div>
              <h3>Seguimiento Post-Adopción</h3>
              <p>
                Mantenemos contacto con las familias adoptantes para asegurar el 
                bienestar y adaptación exitosa de cada mascota.
              </p>
            </div>

            <div className="hacemos-card">
              <div className="card-icon">🌟</div>
              <h3>Programa de Voluntariado</h3>
              <p>
                Invitamos a la comunidad a sumarse como voluntarios para ayudar 
                en el cuidado diario, eventos y campañas de concientización.
              </p>
            </div>

          </div>
        </section>

        {/* Nuestros Valores */}
        <section className="valores-section">
          <h2>Nuestros Valores</h2>
          <div className="valores-grid">
            
            <div className="valor-item">
              <div className="valor-icon">❤️</div>
              <h3>Compasión</h3>
              <p>Tratamos a cada animal con amor, respeto y dignidad</p>
            </div>

            <div className="valor-item">
              <div className="valor-icon">🎯</div>
              <h3>Compromiso</h3>
              <p>Dedicados al bienestar animal sin descanso</p>
            </div>

            <div className="valor-item">
              <div className="valor-icon">🌈</div>
              <h3>Transparencia</h3>
              <p>Actuamos con honestidad en todas nuestras acciones</p>
            </div>

            <div className="valor-item">
              <div className="valor-icon">🤲</div>
              <h3>Responsabilidad</h3>
              <p>Aseguramos adopciones responsables y seguimiento continuo</p>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <h2>¿Quieres Ser Parte de Nuestra Historia?</h2>
          <p>Cada pequeña acción cuenta. Únete a nosotros y cambia vidas.</p>
          <div className="cta-buttons">
            <button className="cta-btn primary" onClick={() => window.location.href = '/mascotas'}>
              Adopta una Mascota
            </button>
            <button className="cta-btn secondary" onClick={() => window.location.href = '/donaciones'}>
              Haz una Donación
            </button>
            <button className="cta-btn tertiary" onClick={() => window.location.href = '/voluntariado'}>
              Sé Voluntario
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default QuienesSomos;