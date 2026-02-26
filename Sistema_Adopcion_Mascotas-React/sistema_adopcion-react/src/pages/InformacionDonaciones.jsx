import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/InformacionDonaciones.css";

const InformacionDonaciones = () => {
  const navigate = useNavigate();

  return (
    <div className="info-donaciones-page">
      
      {/* Hero Section */}
      <section className="hero-donaciones">
        <div className="hero-overlay">
          <h1>Tu Donación Salva Vidas 💚</h1>
          <p>Cada aporte cuenta en nuestra misión de rescatar, cuidar y encontrar hogares para animales necesitados</p>
          <button className="btn-hero" onClick={() => navigate("/seleccionar-donacion")}>
            Quiero Donar Ahora
          </button>
        </div>
      </section>

      {/* Impacto de las donaciones */}
      <section className="impacto-section">
        <div className="container">
          <h2 className="section-title">¿A dónde va tu donación?</h2>
          <p className="section-subtitle">
            Cada dólar que donas se invierte directamente en el bienestar de nuestros animales rescatados
          </p>

          <div className="impacto-grid">
            <div className="impacto-card">
              <div className="impacto-icon">🏥</div>
              <h3>Atención Veterinaria</h3>
              <p>Consultas, cirugías, vacunas y tratamientos médicos para mantener sanos a nuestros rescatados</p>
              <div className="porcentaje">35%</div>
            </div>

            <div className="impacto-card">
              <div className="impacto-icon">🍖</div>
              <h3>Alimentación</h3>
              <p>Comida de calidad, vitaminas y suplementos nutricionales para todos los animales del refugio</p>
              <div className="porcentaje">30%</div>
            </div>

            <div className="impacto-card">
              <div className="impacto-icon">🏠</div>
              <h3>Refugio y Cuidado</h3>
              <p>Mantenimiento de instalaciones, limpieza, agua, electricidad y espacios seguros</p>
              <div className="porcentaje">25%</div>
            </div>

            <div className="impacto-card">
              <div className="impacto-icon">❤️</div>
              <h3>Rescates y Adopciones</h3>
              <p>Operativos de rescate, rehabilitación y procesos de adopción responsable</p>
              <div className="porcentaje">10%</div>
            </div>
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="estadisticas-section">
        <div className="container">
          <h2 className="section-title">Nuestro Impacto en Números</h2>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">250+</div>
              <div className="stat-label">Animales rescatados</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">180+</div>
              <div className="stat-label">Adopciones exitosas</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Atenciones veterinarias</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Cuidado continuo</div>
            </div>
          </div>
        </div>
      </section>

      {/* Con qué ayudamos */}
      <section className="ayuda-section">
        <div className="container">
          <h2 className="section-title">¿Qué logramos con tu ayuda?</h2>
          
          <div className="ayuda-grid">
            <div className="ayuda-item">
              <div className="ayuda-icon">💵</div>
              <h3>Con $10</h3>
              <p>Alimentas a 5 mascotas por un día completo</p>
            </div>

            <div className="ayuda-item">
              <div className="ayuda-icon">💉</div>
              <h3>Con $25</h3>
              <p>Vacunas y desparasitación para un animal rescatado</p>
            </div>

            <div className="ayuda-item">
              <div className="ayuda-icon">🏥</div>
              <h3>Con $50</h3>
              <p>Consulta veterinaria completa con exámenes</p>
            </div>

            <div className="ayuda-item">
              <div className="ayuda-icon">✂️</div>
              <h3>Con $100</h3>
              <p>Esterilización de un animal para evitar sobrepoblación</p>
            </div>

            <div className="ayuda-item">
              <div className="ayuda-icon">🩹</div>
              <h3>Con $200</h3>
              <p>Cirugía de emergencia que salva una vida</p>
            </div>

            <div className="ayuda-item">
              <div className="ayuda-icon">🏡</div>
              <h3>Con $500</h3>
              <p>Un mes completo de cuidados para 10 animales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Formas de donar */}
      <section className="formas-donar-section">
        <div className="container">
          <h2 className="section-title">Formas de Ayudar</h2>
          
          <div className="formas-grid">
            <div className="forma-card" onClick={() => navigate("/donar")}>
              <div className="forma-icon">💵</div>
              <h3>Donación Monetaria</h3>
              <p>Efectivo o transferencia bancaria que nos ayuda a cubrir todos los gastos del refugio</p>
              <button className="btn-forma">Donar Dinero</button>
            </div>

            <div className="forma-card" onClick={() => navigate("/donar-especie")}>
              <div className="forma-icon">🎁</div>
              <h3>Donación en Especie</h3>
              <p>Alimentos, medicinas, juguetes y artículos que necesitamos diariamente</p>
              <button className="btn-forma">Donar Artículos</button>
            </div>

            <div className="forma-card" onClick={() => navigate("/agendar-cita")}>
              <div className="forma-icon">🤝</div>
              <h3>Voluntariado</h3>
              <p>Dona tu tiempo y ayúdanos con el cuidado diario de los animales</p>
              <button className="btn-forma">Ser Voluntario</button>
            </div>
          </div>
        </div>
      </section>

      {/* Transparencia */}
      <section className="transparencia-section">
        <div className="container">
          <h2 className="section-title">Transparencia Total</h2>
          <p className="section-subtitle">
            Nos comprometemos a usar cada donación de manera responsable
          </p>

          <div className="transparencia-cards">
            <div className="transparencia-item">
              <div className="trans-icon">📊</div>
              <h3>Reportes Mensuales</h3>
              <p>Publicamos informes detallados de ingresos y gastos</p>
            </div>

            <div className="transparencia-item">
              <div className="trans-icon">📸</div>
              <h3>Seguimiento Fotográfico</h3>
              <p>Compartimos el progreso de cada animal rescatado</p>
            </div>

            <div className="transparencia-item">
              <div className="trans-icon">✉️</div>
              <h3>Actualizaciones por Email</h3>
              <p>Te mantenemos informado del impacto de tu donación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="cta-final">
        <div className="cta-content">
          <h2>¿Listo para hacer la diferencia?</h2>
          <p>Cada donación, sin importar el monto, transforma vidas</p>
          <button className="btn-cta-final" onClick={() => navigate("/seleccionar-donacion")}>
            💚 Donar Ahora
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

export default InformacionDonaciones;