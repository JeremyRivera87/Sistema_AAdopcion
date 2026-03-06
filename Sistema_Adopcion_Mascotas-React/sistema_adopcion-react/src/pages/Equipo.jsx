import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Equipo.css";

const Equipo = () => {
  
  // Datos del equipo (puedes moverlo a un JSON o base de datos después)
  const equipoDirectivo = [
    {
      nombre: "María González",
      cargo: "Directora General",
      descripcion: "Veterinaria con 15 años de experiencia en bienestar animal. Fundadora de Animal Home.",
      imagen: "👩‍⚕️"
    },
    {
      nombre: "Carlos Ramírez",
      cargo: "Director de Operaciones",
      descripcion: "Especialista en gestión de refugios y logística animal. 10 años en rescate animal.",
      imagen: "👨‍💼"
    },
    {
      nombre: "Ana Martínez",
      cargo: "Coordinadora de Adopciones",
      descripcion: "Psicóloga especializada en comportamiento animal y procesos de adopción.",
      imagen: "👩‍🏫"
    }
  ];

  const equipoVeterinario = [
    {
      nombre: "Dr. Roberto Silva",
      cargo: "Veterinario Principal",
      descripcion: "Especialista en cirugía y medicina interna veterinaria.",
      imagen: "👨‍⚕️"
    },
    {
      nombre: "Dra. Laura Pérez",
      cargo: "Veterinaria",
      descripcion: "Experta en nutrición animal y cuidados preventivos.",
      imagen: "👩‍⚕️"
    },
    {
      nombre: "Dra. Patricia Morales",
      cargo: "Veterinaria",
      descripcion: "Especialista en rehabilitación y fisioterapia animal.",
      imagen: "👩‍⚕️"
    }
  ];

  const equipoVoluntarios = [
    {
      nombre: "Equipo de Voluntarios",
      cargo: "50+ Voluntarios Activos",
      descripcion: "Personas comprometidas que dedican su tiempo al cuidado, socialización y bienestar de nuestras mascotas.",
      imagen: "👥"
    }
  ];

  return (
    <div className="equipo-page">
      <Navbar />
      
      <main className="equipo-container">
        
        {/* Hero Section */}
        <section className="hero-equipo">
          <div className="hero-equipo-content">
            <h1>Nuestro Equipo</h1>
            <p className="hero-equipo-subtitle">
              Personas apasionadas trabajando juntas por el bienestar animal
            </p>
          </div>
        </section>

        {/* Introducción */}
        <section className="intro-equipo">
          <div className="intro-content">
            <h2>El Corazón de Animal Home</h2>
            <div className="intro-line"></div>
            <p>
              Detrás de cada rescate exitoso, cada adopción feliz y cada vida salvada, hay un equipo 
              dedicado de profesionales y voluntarios que dan lo mejor de sí mismos cada día. 
              Conoce a las personas que hacen posible nuestra misión.
            </p>
          </div>
        </section>

        {/* Equipo Directivo */}
        <section className="section-equipo directivo">
          <div className="section-header-equipo">
            <h2>Equipo Directivo</h2>
            <p>Liderando con pasión y experiencia</p>
          </div>
          
          <div className="equipo-grid">
            {equipoDirectivo.map((miembro, index) => (
              <div key={index} className="miembro-card">
                <div className="miembro-imagen">
                  <div className="avatar-emoji">{miembro.imagen}</div>
                </div>
                <div className="miembro-info">
                  <h3>{miembro.nombre}</h3>
                  <p className="cargo">{miembro.cargo}</p>
                  <p className="descripcion">{miembro.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipo Veterinario */}
        <section className="section-equipo veterinario">
          <div className="section-header-equipo">
            <h2>Equipo Veterinario</h2>
            <p>Cuidando la salud de cada mascota</p>
          </div>
          
          <div className="equipo-grid">
            {equipoVeterinario.map((miembro, index) => (
              <div key={index} className="miembro-card">
                <div className="miembro-imagen">
                  <div className="avatar-emoji">{miembro.imagen}</div>
                </div>
                <div className="miembro-info">
                  <h3>{miembro.nombre}</h3>
                  <p className="cargo">{miembro.cargo}</p>
                  <p className="descripcion">{miembro.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Departamentos */}
        <section className="departamentos-section">
          <h2>Nuestros Departamentos</h2>
          
          <div className="departamentos-grid">
            
            <div className="departamento-card">
              <div className="dep-icon">🏥</div>
              <h3>Área Médica</h3>
              <p>
                Atención veterinaria 24/7, cirugías, vacunación, desparasitación 
                y seguimiento médico completo de cada animal.
              </p>
              <ul>
                <li>3 Veterinarios certificados</li>
                <li>2 Auxiliares veterinarios</li>
                <li>Sala de cirugía equipada</li>
                <li>Farmacia veterinaria</li>
              </ul>
            </div>

            <div className="departamento-card">
              <div className="dep-icon">🏠</div>
              <h3>Adopciones</h3>
              <p>
                Evaluación de adoptantes, emparejamiento mascota-familia, 
                seguimiento post-adopción y asesoría continua.
              </p>
              <ul>
                <li>Coordinadora de adopciones</li>
                <li>2 Asesores de adopción</li>
                <li>Proceso de evaluación riguroso</li>
                <li>Seguimiento permanente</li>
              </ul>
            </div>

            <div className="departamento-card">
              <div className="dep-icon">🍖</div>
              <h3>Nutrición y Cuidados</h3>
              <p>
                Alimentación balanceada, higiene, ejercicio y socialización 
                para el bienestar físico y emocional de las mascotas.
              </p>
              <ul>
                <li>Nutricionista animal</li>
                <li>5 Cuidadores tiempo completo</li>
                <li>Planes nutricionales personalizados</li>
                <li>Programas de socialización</li>
              </ul>
            </div>

            <div className="departamento-card">
              <div className="dep-icon">📢</div>
              <h3>Comunicación</h3>
              <p>
                Campañas de concientización, redes sociales, eventos 
                y educación sobre tenencia responsable.
              </p>
              <ul>
                <li>Coordinador de comunicación</li>
                <li>Community manager</li>
                <li>Diseñador gráfico</li>
                <li>Eventos mensuales</li>
              </ul>
            </div>

            <div className="departamento-card">
              <div className="dep-icon">💼</div>
              <h3>Administración</h3>
              <p>
                Gestión financiera, recursos humanos, logística 
                y coordinación general del refugio.
              </p>
              <ul>
                <li>Director administrativo</li>
                <li>Contador</li>
                <li>Encargado de logística</li>
                <li>Sistemas y tecnología</li>
              </ul>
            </div>

            <div className="departamento-card">
              <div className="dep-icon">🤝</div>
              <h3>Voluntariado</h3>
              <p>
                Coordinación de voluntarios, capacitación, asignación 
                de tareas y eventos comunitarios.
              </p>
              <ul>
                <li>Coordinadora de voluntarios</li>
                <li>50+ Voluntarios activos</li>
                <li>Programa de capacitación</li>
                <li>Eventos de integración</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Voluntarios */}
        <section className="section-equipo voluntarios">
          <div className="section-header-equipo">
            <h2>Nuestros Voluntarios</h2>
            <p>El alma de nuestra organización</p>
          </div>
          
          <div className="voluntarios-content">
            <div className="voluntarios-stats">
              <div className="vol-stat">
                <div className="vol-number">50+</div>
                <p>Voluntarios Activos</p>
              </div>
              <div className="vol-stat">
                <div className="vol-number">1,200+</div>
                <p>Horas Mensuales</p>
              </div>
              <div className="vol-stat">
                <div className="vol-number">15+</div>
                <p>Áreas de Trabajo</p>
              </div>
            </div>

            <div className="voluntarios-descripcion">
              <p>
                Nuestros voluntarios son el corazón que late día a día en Animal Home. 
                Desde estudiantes hasta profesionales, desde jóvenes hasta adultos mayores, 
                todos comparten una pasión común: ayudar a los animales en necesidad.
              </p>
              <p>
                Participan en el cuidado diario, socialización de mascotas, eventos de adopción, 
                campañas de recaudación, educación comunitaria y mucho más. Sin su dedicación 
                y amor incondicional, nuestra misión no sería posible.
              </p>
              <button className="btn-voluntario" onClick={() => window.location.href = '/voluntariado'}>
                Únete Como Voluntario
              </button>
            </div>
          </div>
        </section>

        {/* Testimonios del Equipo */}
        <section className="testimonios-equipo">
          <h2>¿Por Qué Trabajamos Aquí?</h2>
          
          <div className="testimonios-grid">
            
            <div className="testimonio-card">
              <div className="comillas">"</div>
              <p className="testimonio-text">
                Cada día es diferente, cada rescate es una nueva historia de esperanza. 
                Ver cómo un animal maltratado se transforma en una mascota feliz es 
                la mayor recompensa.
              </p>
              <div className="testimonio-autor">
                <strong>María González</strong>
                <span>Directora General</span>
              </div>
            </div>

            <div className="testimonio-card">
              <div className="comillas">"</div>
              <p className="testimonio-text">
                No es solo un trabajo, es una vocación. Saber que cada esfuerzo 
                que hacemos cambia vidas hace que todo valga la pena.
              </p>
              <div className="testimonio-autor">
                <strong>Dr. Roberto Silva</strong>
                <span>Veterinario Principal</span>
              </div>
            </div>

            <div className="testimonio-card">
              <div className="comillas">"</div>
              <p className="testimonio-text">
                El momento más especial es cuando ves a una familia adoptante 
                llevarse a su nueva mascota. Esos abrazos y lágrimas de felicidad 
                lo dicen todo.
              </p>
              <div className="testimonio-autor">
                <strong>Ana Martínez</strong>
                <span>Coordinadora de Adopciones</span>
              </div>
            </div>

          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-equipo">
          <div className="cta-equipo-content">
            <h2>¿Quieres Formar Parte del Equipo?</h2>
            <p>Siempre estamos buscando personas apasionadas que quieran marcar la diferencia</p>
            <div className="cta-equipo-buttons">
              <button className="cta-equipo-btn primary" onClick={() => window.location.href = '/voluntariado'}>
                Sé Voluntario
              </button>
              <button className="cta-equipo-btn secondary" onClick={() => window.location.href = '/contacto'}>
                Contáctanos
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Equipo;