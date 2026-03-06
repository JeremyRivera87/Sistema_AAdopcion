import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/MisionVision.css";

const MisionVision = () => {
  return (
    <div className="mision-vision-page">
      <Navbar />
      
      <main className="mision-vision-container">
        
        {/* Hero Section */}
        <section className="hero-mv">
          <div className="hero-mv-content">
            <h1>Misión y Visión</h1>
            <p className="hero-mv-subtitle">
              Nuestro compromiso con el bienestar animal y la construcción de un futuro mejor
            </p>
          </div>
        </section>

        {/* Misión */}
        <section className="mision-section">
          <div className="mision-content">
            <div className="mision-icon-container">
              <div className="mision-icon">🎯</div>
            </div>
            <div className="mision-text">
              <h2>Nuestra Misión</h2>
              <div className="underline"></div>
              <p className="mision-principal">
                Rescatar, rehabilitar y encontrar hogares amorosos para animales en situación de 
                abandono, maltrato o vulnerabilidad, promoviendo la tenencia responsable y el 
                bienestar animal a través de la educación y concientización de la comunidad.
              </p>
              
              <div className="mision-puntos">
                <div className="punto-item">
                  <span className="punto-icon">✓</span>
                  <p>Brindar atención veterinaria integral a cada animal rescatado</p>
                </div>
                <div className="punto-item">
                  <span className="punto-icon">✓</span>
                  <p>Facilitar procesos de adopción responsables y seguros</p>
                </div>
                <div className="punto-item">
                  <span className="punto-icon">✓</span>
                  <p>Educar sobre el cuidado y respeto hacia los animales</p>
                </div>
                <div className="punto-item">
                  <span className="punto-icon">✓</span>
                  <p>Promover la esterilización para controlar la sobrepoblación</p>
                </div>
                <div className="punto-item">
                  <span className="punto-icon">✓</span>
                  <p>Crear una red de apoyo comunitario para el bienestar animal</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visión */}
        <section className="vision-section">
          <div className="vision-content">
            <div className="vision-text">
              <h2>Nuestra Visión</h2>
              <div className="underline"></div>
              <p className="vision-principal">
                Ser la organización líder en protección y bienestar animal en nuestra región, 
                reconocida por nuestra excelencia en el rescate, rehabilitación y adopción de 
                animales, inspirando a otras comunidades a crear un mundo donde cada mascota 
                tenga un hogar seguro y amoroso.
              </p>
              
              <div className="vision-metas">
                <h3>Metas a 2030</h3>
                <div className="metas-grid">
                  <div className="meta-card">
                    <div className="meta-number">2,000+</div>
                    <p>Adopciones anuales exitosas</p>
                  </div>
                  <div className="meta-card">
                    <div className="meta-number">5</div>
                    <p>Refugios en diferentes ciudades</p>
                  </div>
                  <div className="meta-card">
                    <div className="meta-number">100%</div>
                    <p>Animales esterilizados</p>
                  </div>
                  <div className="meta-card">
                    <div className="meta-number">200+</div>
                    <p>Voluntarios activos</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="vision-icon-container">
              <div className="vision-icon">🌟</div>
            </div>
          </div>
        </section>

        {/* Objetivos Estratégicos */}
        <section className="objetivos-section">
          <h2>Objetivos Estratégicos</h2>
          <p className="objetivos-intro">
            Trabajamos día a día para alcanzar nuestras metas a través de objetivos claros y medibles
          </p>

          <div className="objetivos-grid">
            
            <div className="objetivo-card">
              <div className="objetivo-header">
                <div className="objetivo-icon">🏥</div>
                <h3>Salud Animal</h3>
              </div>
              <ul>
                <li>Garantizar atención veterinaria de calidad para todos los animales</li>
                <li>Implementar programas de prevención de enfermedades</li>
                <li>Establecer alianzas con clínicas veterinarias</li>
                <li>Crear un fondo de emergencias médicas</li>
              </ul>
            </div>

            <div className="objetivo-card">
              <div className="objetivo-header">
                <div className="objetivo-icon">📚</div>
                <h3>Educación</h3>
              </div>
              <ul>
                <li>Desarrollar programas educativos en escuelas</li>
                <li>Realizar campañas de concientización</li>
                <li>Ofrecer talleres de tenencia responsable</li>
                <li>Crear material educativo digital y físico</li>
              </ul>
            </div>

            <div className="objetivo-card">
              <div className="objetivo-header">
                <div className="objetivo-icon">🏡</div>
                <h3>Adopción Responsable</h3>
              </div>
              <ul>
                <li>Mejorar el proceso de evaluación de adoptantes</li>
                <li>Implementar seguimiento post-adopción efectivo</li>
                <li>Crear base de datos de familias adoptivas</li>
                <li>Facilitar jornadas de adopción mensuales</li>
              </ul>
            </div>

            <div className="objetivo-card">
              <div className="objetivo-header">
                <div className="objetivo-icon">🌱</div>
                <h3>Sostenibilidad</h3>
              </div>
              <ul>
                <li>Diversificar fuentes de financiamiento</li>
                <li>Optimizar recursos y operaciones</li>
                <li>Fortalecer alianzas estratégicas</li>
                <li>Implementar tecnología para eficiencia</li>
              </ul>
            </div>

            <div className="objetivo-card">
              <div className="objetivo-header">
                <div className="objetivo-icon">🤝</div>
                <h3>Comunidad</h3>
              </div>
              <ul>
                <li>Expandir red de voluntarios</li>
                <li>Crear programas de apadrinamiento</li>
                <li>Organizar eventos comunitarios</li>
                <li>Establecer alianzas con empresas locales</li>
              </ul>
            </div>

            <div className="objetivo-card">
              <div className="objetivo-header">
                <div className="objetivo-icon">📈</div>
                <h3>Crecimiento</h3>
              </div>
              <ul>
                <li>Ampliar capacidad del refugio</li>
                <li>Abrir nuevos centros de adopción</li>
                <li>Mejorar infraestructura existente</li>
                <li>Implementar sistemas de gestión modernos</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Valores Fundamentales */}
        <section className="valores-fundamentales">
          <h2>Nuestros Valores Fundamentales</h2>
          
          <div className="valores-cards">
            
            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-emoji">❤️</div>
                <h3>Amor y Compasión</h3>
              </div>
              <p>
                Tratamos a cada animal con el amor, respeto y dignidad que merece. 
                Nuestra compasión guía cada decisión y acción que tomamos.
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-emoji">💪</div>
                <h3>Compromiso y Dedicación</h3>
              </div>
              <p>
                Estamos comprometidos 24/7 con el bienestar animal. Nuestra dedicación 
                no descansa hasta que cada mascota encuentre su hogar.
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-emoji">🔍</div>
                <h3>Transparencia</h3>
              </div>
              <p>
                Actuamos con honestidad total. Nuestras operaciones, finanzas y decisiones 
                son abiertas a la comunidad que nos apoya.
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-emoji">⚖️</div>
                <h3>Responsabilidad</h3>
              </div>
              <p>
                Asumimos la responsabilidad de cada vida que rescatamos, asegurando 
                adopciones conscientes y seguimiento continuo.
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-emoji">🌍</div>
                <h3>Conciencia Social</h3>
              </div>
              <p>
                Educamos y concientizamos a la comunidad sobre la importancia del 
                respeto y cuidado hacia todos los seres vivos.
              </p>
            </div>

            <div className="valor-card">
              <div className="valor-header">
                <div className="valor-emoji">✨</div>
                <h3>Excelencia</h3>
              </div>
              <p>
                Buscamos la excelencia en todo lo que hacemos, desde el rescate hasta 
                la adopción, sin comprometer la calidad del servicio.
              </p>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-mv">
          <div className="cta-mv-content">
            <h2>Únete a Nuestra Misión</h2>
            <p>Juntos podemos hacer la diferencia en la vida de miles de animales</p>
            <div className="cta-mv-buttons">
              <button className="cta-mv-btn primary" onClick={() => window.location.href = '/voluntariado'}>
                Sé Voluntario
              </button>
              <button className="cta-mv-btn secondary" onClick={() => window.location.href = '/donaciones'}>
                Apoya Nuestra Causa
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default MisionVision;