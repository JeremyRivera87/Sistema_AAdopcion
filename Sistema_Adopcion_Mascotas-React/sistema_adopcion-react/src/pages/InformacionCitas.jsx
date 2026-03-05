import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import Footer from "../components/Footer";
import "../styles/InformacionCitas.css";

const InformacionCitas = () => {
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // Función para verificar sesión antes de agendar
  const handleAgendarCita = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (!usuario) {
      setAlert({
        isOpen: true,
        title: "Sesión requerida",
        message: "Debes iniciar sesión o registrarte para agendar una cita",
        type: "warning"
      });
    } else {
      navigate("/agendar-cita");
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
    
    // Si era alerta de sesión, redirigir a login
    if (alert.type === "warning" && alert.title === "Sesión requerida") {
      navigate("/login");
    }
  };

  return (
    <div className="info-citas-page">
      
      {/* Hero Section */}
      <section className="hero-citas">
        <div className="hero-overlay">
          <h1>📅 Agenda tu Cita en Animal Home</h1>
          <p>El primer paso para conocer a tu futuro compañero. Reserva un momento especial para conectar.</p>
          <button className="btn-hero-citas" onClick={handleAgendarCita}>
            Agendar mi Cita
          </button>
        </div>
      </section>

      {/* ¿Qué es una cita de adopción? */}
      <section className="que-es-section">
        <div className="container">
          <h2 className="section-title">¿Qué es una Cita de Adopción?</h2>
          <p className="section-subtitle">
            Es una visita programada donde podrás conocer personalmente a la mascota que te interesa, 
            interactuar con ella y resolver todas tus dudas antes de tomar la decisión de adoptar.
          </p>

          <div className="que-es-grid">
            <div className="que-es-card">
              <div className="que-es-icon">🤝</div>
              <h3>Conocimiento Personal</h3>
              <p>Interactúa directamente con la mascota en un ambiente controlado y observa su comportamiento real.</p>
            </div>

            <div className="que-es-card">
              <div className="que-es-icon">💬</div>
              <h3>Asesoría Experta</h3>
              <p>Nuestro equipo te brindará información completa sobre sus cuidados, personalidad y necesidades.</p>
            </div>

            <div className="que-es-card">
              <div className="que-es-icon">🏥</div>
              <h3>Revisión de Salud</h3>
              <p>Conocerás su historial médico completo, vacunas, esterilización y cualquier cuidado especial.</p>
            </div>

            <div className="que-es-card">
              <div className="que-es-icon">📋</div>
              <h3>Orientación Legal</h3>
              <p>Te explicamos el proceso de adopción, documentos necesarios y compromisos adquiridos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Proceso de la Cita */}
      <section className="proceso-cita-section">
        <div className="container">
          <h2 className="section-title">¿Cómo funciona tu visita?</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-marker">1</div>
              <div className="timeline-content">
                <h3>Reserva tu Cita</h3>
                <p>Selecciona la mascota, fecha y hora que mejor se ajuste a tu disponibilidad. Recibirás confirmación por email y SMS.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">2</div>
              <div className="timeline-content">
                <h3>Preparación</h3>
                <p>Trae una identificación válida. Si tienes niños o mascotas actuales, es ideal que vengan para observar la compatibilidad.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">3</div>
              <div className="timeline-content">
                <h3>Llegada al Refugio</h3>
                <p>Nuestro equipo te recibirá cálidamente y te guiará al área de encuentros. La puntualidad nos ayuda a organizar mejor.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">4</div>
              <div className="timeline-content">
                <h3>Conoce a tu Mascota</h3>
                <p>Pasarás aproximadamente 30-45 minutos con la mascota. Podrás jugar, observar y crear conexión en un espacio seguro.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">5</div>
              <div className="timeline-content">
                <h3>Entrevista y Orientación</h3>
                <p>Conversaremos sobre tus expectativas, estilo de vida y responderemos todas tus preguntas sobre cuidados y alimentación.</p>
              </div>
            </div>

            <div className="timeline-item">
              <div className="timeline-marker">6</div>
              <div className="timeline-content">
                <h3>Siguiente Paso</h3>
                <p>Si hay conexión, te guiaremos en el proceso de solicitud formal de adopción. No hay presión, tómate tu tiempo para decidir.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué Esperar */}
      <section className="que-esperar-section">
        <div className="container">
          <h2 className="section-title">¿Qué Esperar en tu Visita?</h2>

          <div className="esperar-grid">
            <div className="esperar-item positivo">
              <div className="esperar-icon">✅</div>
              <h4>Sí esperarás:</h4>
              <ul>
                <li>Un ambiente cálido y acogedor</li>
                <li>Personal amable y conocedor</li>
                <li>Tiempo de calidad con la mascota</li>
                <li>Información transparente y honesta</li>
                <li>Respuestas a todas tus dudas</li>
                <li>Asesoría personalizada</li>
              </ul>
            </div>

            <div className="esperar-item negativo">
              <div className="esperar-icon">❌</div>
              <h4>No esperes:</h4>
              <ul>
                <li>Presión para adoptar inmediatamente</li>
                <li>Costos ocultos o sorpresas</li>
                <li>Garantías de comportamiento perfecto</li>
                <li>Que todas las mascotas sean sociables al instante</li>
                <li>Llevar la mascota el mismo día</li>
                <li>Procesos sin evaluación previa</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Consejos */}
      <section className="consejos-section">
        <div className="container">
          <h2 className="section-title">💡 Consejos para tu Visita</h2>

          <div className="consejos-grid">
            <div className="consejo-card">
              <div className="consejo-numero">1</div>
              <h3>Viste Cómodo</h3>
              <p>Usa ropa casual que no te importe si se ensucia o llena de pelos. Las mascotas pueden saltar o lamer.</p>
            </div>

            <div className="consejo-card">
              <div className="consejo-numero">2</div>
              <h3>Llega Puntual</h3>
              <p>Respeta el horario reservado. Esto nos permite atender a todos los visitantes adecuadamente.</p>
            </div>

            <div className="consejo-card">
              <div className="consejo-numero">3</div>
              <h3>Trae Preguntas</h3>
              <p>Anota tus dudas con anticipación: alimentación, rutinas, salud, comportamiento, gastos mensuales.</p>
            </div>

            <div className="consejo-card">
              <div className="consejo-numero">4</div>
              <h3>Incluye a la Familia</h3>
              <p>Si es posible, trae a todos los que vivirán con la mascota para evaluar la compatibilidad.</p>
            </div>

            <div className="consejo-card">
              <div className="consejo-numero">5</div>
              <h3>Ten Paciencia</h3>
              <p>Algunas mascotas son tímidas al principio. Dale tiempo para que se sienta cómoda contigo.</p>
            </div>

            <div className="consejo-card">
              <div className="consejo-numero">6</div>
              <h3>Sé Honesto</h3>
              <p>Comparte tus dudas o preocupaciones. Queremos que sea el match perfecto para ambos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Horarios */}
      <section className="horarios-section">
        <div className="container">
          <h2 className="section-title">🕐 Horarios de Atención</h2>
          
          <div className="horarios-grid">
            <div className="horario-card">
              <h3>Lunes a Viernes</h3>
              <div className="horario-tiempo">
                <span className="horario-icon">🌅</span>
                <p>9:00 AM - 1:00 PM</p>
              </div>
              <div className="horario-tiempo">
                <span className="horario-icon">🌆</span>
                <p>3:00 PM - 6:00 PM</p>
              </div>
            </div>

            <div className="horario-card">
              <h3>Sábados</h3>
              <div className="horario-tiempo">
                <span className="horario-icon">☀️</span>
                <p>9:00 AM - 2:00 PM</p>
              </div>
            </div>

            <div className="horario-card domingo">
              <h3>Domingos y Feriados</h3>
              <div className="horario-tiempo">
                <span className="horario-icon">🚫</span>
                <p>Cerrado</p>
              </div>
            </div>
          </div>

          <div className="nota-horarios">
            <p>⚠️ <strong>Nota:</strong> Las citas se asignan cada 30 minutos. Por favor, llega 10 minutos antes de tu hora programada.</p>
          </div>
        </div>
      </section>

      {/* Requisitos */}
      <section className="requisitos-cita-section">
        <div className="container">
          <h2 className="section-title">📋 Requisitos para Agendar</h2>

          <div className="requisitos-cita-grid">
            <div className="requisito-cita-item">
              <div className="requisito-check">✓</div>
              <p>Ser mayor de 18 años</p>
            </div>
            <div className="requisito-cita-item">
              <div className="requisito-check">✓</div>
              <p>Proporcionar datos de contacto válidos</p>
            </div>
            <div className="requisito-cita-item">
              <div className="requisito-check">✓</div>
              <p>Confirmar asistencia 24h antes</p>
            </div>
            <div className="requisito-cita-item">
              <div className="requisito-check">✓</div>
              <p>Presentar identificación el día de la cita</p>
            </div>
          </div>
        </div>
      </section>

      {/* Política de Cancelación */}
      <section className="politica-section">
        <div className="container">
          <h2 className="section-title">🔄 Política de Cancelación</h2>
          
          <div className="politica-content">
            <div className="politica-item">
              <h4>Cancelaciones con Aviso</h4>
              <p>Si necesitas cancelar, házlo con al menos <strong>24 horas de anticipación</strong> para que otros puedan usar ese espacio. Puedes reprogramar sin problemas.</p>
            </div>

            <div className="politica-item">
              <h4>No Presentarse (No-Show)</h4>
              <p>Si no te presentas sin avisar <strong>2 veces</strong>, tu cuenta quedará suspendida temporalmente para agendar nuevas citas.</p>
            </div>

            <div className="politica-item">
              <h4>Cómo Cancelar</h4>
              <p>Llámanos al <strong>(02) 123-4567</strong> o envía un email a <strong>citas@animalhome.ec</strong> con tu nombre y número de cita.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">❓ Preguntas Frecuentes</h2>

          <div className="faq-grid">
            <div className="faq-item">
              <h4>¿Puedo conocer varias mascotas en una cita?</h4>
              <p>Para dar atención de calidad, recomendamos una mascota por cita. Si te interesan varias, puedes agendar citas separadas.</p>
            </div>

            <div className="faq-item">
              <h4>¿Cuánto dura la visita?</h4>
              <p>Aproximadamente 45 minutos. Esto incluye tiempo con la mascota y la entrevista informativa.</p>
            </div>

            <div className="faq-item">
              <h4>¿Puedo llevar a mis hijos?</h4>
              <p>¡Sí! De hecho es recomendable si vivirán con la mascota. Niños menores de 12 años deben estar supervisados.</p>
            </div>

            <div className="faq-item">
              <h4>¿Tiene algún costo?</h4>
              <p>No, las citas de conocimiento son completamente gratuitas. Solo pagas si decides continuar con la adopción.</p>
            </div>

            <div className="faq-item">
              <h4>¿Qué pasa si no hay conexión?</h4>
              <p>No pasa nada. Es normal que no todas las mascotas sean compatibles. Te ayudaremos a encontrar otra opción.</p>
            </div>

            <div className="faq-item">
              <h4>¿Puedo adoptar el mismo día?</h4>
              <p>No. Después de la cita viene el proceso de solicitud, evaluación y visita domiciliaria (3-7 días).</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-final-citas">
        <div className="cta-content-citas">
          <h2>¿Listo para Conocer a tu Futuro Compañero?</h2>
          <p>Agenda tu cita ahora y da el primer paso hacia una amistad inolvidable</p>
          <button className="btn-cta-final-citas" onClick={handleAgendarCita}>
            📅 Agendar mi Cita Ahora
          </button>
          <p className="cta-note">Sin compromiso • Totalmente gratis • Atención personalizada</p>
        </div>
      </section>

      {/* Botón volver */}
      <button className="btn-volver-home-citas" onClick={() => navigate("/")}>
        ← Volver al Inicio
      </button>

      {/* Alerta personalizada */}
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
      
      <Footer/>   
    </div>
  );
};

export default InformacionCitas;