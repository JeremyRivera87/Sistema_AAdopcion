import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/PreguntasFrecuentes.css";

const PreguntasFrecuentes = () => {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [preguntaAbierta, setPreguntaAbierta] = useState(null);
  const [busqueda, setBusqueda] = useState("");

  // Datos de preguntas frecuentes
  const preguntas = [
    {
      id: 1,
      categoria: "adopcion",
      pregunta: "¿Cuál es el proceso de adopción?",
      respuesta: "El proceso de adopción consta de 6 pasos: 1) Llena el formulario en línea con tus datos personales y preferencias. 2) Nuestro equipo revisa tu solicitud (2-3 días). 3) Te contactamos para una entrevista telefónica. 4) Visita al refugio para conocer a las mascotas disponibles. 5) Si encuentras tu match perfecto, realizamos una visita domiciliaria. 6) Firma del contrato de adopción y llevas a tu nuevo compañero a casa. Todo el proceso toma aproximadamente 1-2 semanas."
    },
    {
      id: 2,
      categoria: "adopcion",
      pregunta: "¿Cuánto cuesta adoptar una mascota?",
      respuesta: "La tarifa de adopción es de $50 para perros y $30 para gatos. Esta tarifa incluye: esterilización/castración, todas las vacunas al día, desparasitación interna y externa, microchip de identificación, examen veterinario completo, y un kit de bienvenida con alimento inicial y juguetes. Esta tarifa nos ayuda a cubrir los costos básicos de cuidado durante su estancia en el refugio."
    },
    {
      id: 3,
      categoria: "adopcion",
      pregunta: "¿Puedo adoptar si vivo en un apartamento?",
      respuesta: "¡Sí! Muchas de nuestras mascotas se adaptan perfectamente a la vida en apartamento. Durante el proceso de adopción, te ayudamos a encontrar el compañero ideal según tu espacio y estilo de vida. Algunas razas pequeñas de perros y la mayoría de los gatos son excelentes para apartamentos. Lo importante es que puedas proporcionarle ejercicio, estimulación mental y tiempo de calidad."
    },
    {
      id: 4,
      categoria: "adopcion",
      pregunta: "¿Qué pasa si ya tengo otras mascotas en casa?",
      respuesta: "¡Perfecto! Muchas mascotas se llevan bien con otros animales. Durante tu visita al refugio, podemos hacer una presentación controlada entre tu mascota actual y la que deseas adoptar. Si es posible, te recomendamos traer a tu mascota actual para ver cómo interactúan. Nuestro equipo te asesorará sobre la mejor forma de hacer la introducción en casa para garantizar una convivencia armoniosa."
    },
    {
      id: 5,
      categoria: "cuidados",
      pregunta: "¿Qué necesito comprar antes de llevar mi mascota a casa?",
      respuesta: "Elementos esenciales: platos para agua y comida, alimento de calidad (te recomendaremos el mejor según la mascota), cama o manta cómoda, collar con placa de identificación, correa (para perros), arenero con arena (para gatos), juguetes apropiados, transportadora, y productos de limpieza seguros para mascotas. En tu kit de adopción incluimos algunos de estos elementos para que comiences."
    },
    {
      id: 6,
      categoria: "cuidados",
      pregunta: "¿Con qué frecuencia debo llevar a mi mascota al veterinario?",
      respuesta: "Cachorros y gatitos: cada 3-4 semanas hasta completar su esquema de vacunación. Adultos jóvenes (1-7 años): al menos 1 vez al año para chequeo general y vacunas. Seniors (7+ años): cada 6 meses ya que son más propensos a desarrollar problemas de salud. Además, ante cualquier cambio de comportamiento, pérdida de apetito, vómitos, diarrea o síntomas anormales, acude de inmediato al veterinario."
    },
    {
      id: 7,
      categoria: "cuidados",
      pregunta: "¿Es obligatorio esterilizar/castrar a mi mascota?",
      respuesta: "Sí, es parte de nuestro contrato de adopción. Todas nuestras mascotas son entregadas ya esterilizadas/castradas, excepto cuando son muy jóvenes para el procedimiento. En esos casos, firmas un compromiso de esterilización que debe cumplirse cuando la mascota alcance la edad adecuada (generalmente 5-6 meses). La esterilización previene enfermedades, reduce comportamientos problemáticos y ayuda a controlar la sobrepoblación."
    },
    {
      id: 8,
      categoria: "cuidados",
      pregunta: "¿Qué hago si mi mascota se enferma?",
      respuesta: "Si presenta síntomas leves (estornudos ocasionales, cambio leve en apetito), monitorea por 24 horas. Si los síntomas empeoran o aparecen signos de emergencia (vómitos frecuentes, diarrea con sangre, dificultad para respirar, letargo severo, imposibilidad de orinar/defecar), acude inmediatamente a un veterinario. Siempre es mejor consultar ante la duda. Mantén a mano el número de tu veterinario y de una clínica de emergencias 24/7."
    },
    {
      id: 9,
      categoria: "donaciones",
      pregunta: "¿Cómo puedo hacer una donación?",
      respuesta: "Puedes donar de tres formas: 1) Donación monetaria: ingresa a nuestra página de donaciones y elige el monto. Aceptamos transferencias bancarias, tarjetas de crédito/débito y PayPal. 2) Donación en especie: alimento, medicinas, mantas, juguetes, productos de limpieza. Puedes dejarlos directamente en el refugio. 3) Apadrinamiento: contribución mensual recurrente para el cuidado de una mascota específica. Todas las donaciones son deducibles de impuestos."
    },
    {
      id: 10,
      categoria: "donaciones",
      pregunta: "¿Qué artículos necesita el refugio?",
      respuesta: "Siempre necesitamos: alimento seco y húmedo para perros y gatos, arena para gatos, mantas y toallas limpias, juguetes (nuevos o en buen estado), productos de limpieza (desinfectantes seguros para mascotas), periódico, medicamentos (con receta si es necesario), platos de acero inoxidable o cerámica, collares y correas, transportadoras, y alimento para cachorros/gatitos. Revisa nuestra lista actualizada en la página de donaciones."
    },
    {
      id: 11,
      categoria: "voluntariado",
      pregunta: "¿Cómo puedo ser voluntario?",
      respuesta: "Llena el formulario de voluntariado en nuestra página web. Requieres ser mayor de 18 años (o 16-17 con autorización de padres). El proceso incluye: 1) Llenar solicitud en línea, 2) Entrevista con nuestro coordinador de voluntarios, 3) Orientación y capacitación (4 horas), 4) Asignación según tus intereses y disponibilidad. Las áreas disponibles incluyen: cuidado directo de animales, limpieza, eventos de adopción, redes sociales, transporte, y más."
    },
    {
      id: 12,
      categoria: "voluntariado",
      pregunta: "¿Cuánto tiempo debo comprometer como voluntario?",
      respuesta: "Valoramos cualquier tiempo que puedas ofrecer. El mínimo recomendado es 4 horas al mes para que puedas crear un vínculo con los animales y el equipo. Muchos voluntarios vienen semanalmente por 2-4 horas. Algunos ayudan en eventos especiales o proyectos puntuales. La flexibilidad es importante para nosotros, y entendemos que tus disponibilidad puede variar. Lo más importante es el compromiso y la pasión por ayudar."
    },
    {
      id: 13,
      categoria: "voluntariado",
      pregunta: "¿Necesito experiencia previa con animales?",
      respuesta: "¡No! Proporcionamos toda la capacitación necesaria. Lo más importante es tu amor por los animales, tu compromiso y disposición para aprender. Durante la orientación te enseñamos: manejo seguro de animales, lenguaje corporal, protocolos de limpieza, cómo interactuar con adoptantes, y procedimientos de emergencia. Tenemos tareas para todos los niveles de experiencia."
    },
    {
      id: 14,
      categoria: "general",
      pregunta: "¿Puedo visitar el refugio sin cita previa?",
      respuesta: "Preferimos que agendes una cita para garantizarte atención personalizada y tiempo de calidad con las mascotas. Sin embargo, nuestro horario de visitas sin cita es: Lunes a Viernes de 2pm a 6pm, y Sábados de 10am a 4pm. Domingos y feriados estamos cerrados al público pero el personal de cuidado siempre está presente para los animales. Para visitas fuera de estos horarios, por favor agenda con anticipación."
    },
    {
      id: 15,
      categoria: "general",
      pregunta: "¿Qué hago si encuentro un animal callejero?",
      respuesta: "1) Mantén la calma y tu seguridad primero. 2) Si el animal parece amigable y seguro, puedes intentar acercarte con precaución. 3) Revisa si tiene collar con información de contacto. 4) Si está herido o en peligro inmediato, llama a control animal o a nuestro refugio. 5) Si puedes, ofrece agua y un lugar seguro temporalmente. 6) Toma una foto y publícala en grupos locales de mascotas perdidas. 7) Llévalo a un veterinario para escanear microchip. 8) Si no puedes quedarte con él, contáctanos y evaluaremos si podemos recibirlo según nuestra capacidad."
    },
    {
      id: 16,
      categoria: "general",
      pregunta: "¿Aceptan cualquier animal en el refugio?",
      respuesta: "Nos especializamos en perros y gatos. Debido a limitaciones de espacio y recursos, operamos bajo un sistema de admisión por capacidad. Priorizamos animales en situaciones de emergencia, maltrato o abandono. Si encontraste un animal o necesitas entregarlo, por favor contáctanos primero para evaluar tu situación y nuestra capacidad actual. No aceptamos entregas sin previa coordinación. Para otros tipos de animales (aves, conejos, etc.), podemos referirte a organizaciones especializadas."
    },
    {
      id: 17,
      categoria: "adopcion",
      pregunta: "¿Puedo devolver una mascota si no funciona?",
      respuesta: "Entendemos que a veces las circunstancias cambian. Si por alguna razón la adopción no funciona, tienes hasta 30 días para devolver la mascota al refugio sin penalización. Después de este período, aún puedes devolverla, pero evaluaremos la situación individualmente. NUNCA abandones o regales una mascota adoptada de nuestro refugio. Si tienes dificultades de adaptación, contáctanos primero - ofrecemos asesoría gratuita para resolver problemas de comportamiento y adaptación."
    },
    {
      id: 18,
      categoria: "cuidados",
      pregunta: "¿Cuánto ejercicio necesita mi mascota?",
      respuesta: "Depende de la raza, edad y nivel de energía. Perros de alta energía (Border Collie, Husky): 2+ horas diarias. Perros activos (Labrador, Golden): 1-2 horas diarias. Razas moderadas (Bulldog, Pug): 30-60 minutos. Perros pequeños: 30-45 minutos. Gatos: 2-3 sesiones de juego de 10-15 minutos diarias. Los cachorros necesitan sesiones más cortas pero más frecuentes. Los seniors necesitan ejercicio suave y adaptado. Durante tu adopción, te asesoramos sobre las necesidades específicas de tu mascota."
    },
    {
      id: 19,
      categoria: "donaciones",
      pregunta: "¿Mi donación es deducible de impuestos?",
      respuesta: "Sí, Animal Home es una organización sin fines de lucro registrada y todas las donaciones son deducibles de impuestos. Al hacer tu donación, recibirás automáticamente un recibo por email que puedes usar para tu declaración de impuestos. Para donaciones en especie, te proporcionamos un recibo con el valor estimado de los artículos donados. Guarda estos recibos para tu contador o asesor fiscal."
    },
    {
      id: 20,
      categoria: "general",
      pregunta: "¿Cómo puedo reportar maltrato animal?",
      respuesta: "El maltrato animal es un delito grave. Si presencias maltrato: 1) NO intervengas directamente si pone en riesgo tu seguridad. 2) Documenta con fotos/videos si es seguro hacerlo. 3) Llama inmediatamente a control animal local o a la policía. 4) Proporciona toda la información posible: ubicación exacta, descripción del animal y del maltratador, tipo de maltrato observado. 5) Puedes también contactarnos y te guiaremos en el proceso. Los reportes pueden ser anónimos. Tu acción puede salvar una vida."
    }
  ];

  const categorias = [
    { id: "todas", nombre: "Todas", icono: "📋", count: preguntas.length },
    { id: "adopcion", nombre: "Adopción", icono: "🏠", count: preguntas.filter(p => p.categoria === "adopcion").length },
    { id: "cuidados", nombre: "Cuidados", icono: "💊", count: preguntas.filter(p => p.categoria === "cuidados").length },
    { id: "donaciones", nombre: "Donaciones", icono: "💰", count: preguntas.filter(p => p.categoria === "donaciones").length },
    { id: "voluntariado", nombre: "Voluntariado", icono: "🤝", count: preguntas.filter(p => p.categoria === "voluntariado").length },
    { id: "general", nombre: "General", icono: "❓", count: preguntas.filter(p => p.categoria === "general").length }
  ];

  const preguntasFiltradas = preguntas.filter(p => {
    const cumpleCategoria = categoriaActiva === "todas" || p.categoria === categoriaActiva;
    const cumpleBusqueda = busqueda === "" || 
      p.pregunta.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.respuesta.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const togglePregunta = (id) => {
    setPreguntaAbierta(preguntaAbierta === id ? null : id);
  };

  return (
    <div className="faq-page">
      <Navbar />
      
      <main className="faq-container">
        
        {/* Hero Section */}
        <section className="hero-faq">
          <div className="hero-faq-content">
            <h1>Preguntas Frecuentes</h1>
            <p className="hero-faq-subtitle">
              Encuentra respuestas rápidas a las dudas más comunes sobre adopción, cuidados y más
            </p>
          </div>
        </section>

        {/* Búsqueda */}
        <section className="busqueda-faq">
          <div className="busqueda-faq-container">
            <h2>¿Qué estás buscando?</h2>
            <div className="busqueda-input-container">
              <span className="busqueda-icon">🔍</span>
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {busqueda && (
                <button className="btn-limpiar-busqueda" onClick={() => setBusqueda("")}>
                  ✕
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Categorías */}
        <section className="categorias-faq">
          <div className="categorias-faq-container">
            <h3>Explora por categoría:</h3>
            <div className="categorias-faq-grid">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  className={`categoria-faq-btn ${categoriaActiva === cat.id ? "active" : ""}`}
                  onClick={() => setCategoriaActiva(cat.id)}
                >
                  <span className="cat-faq-icono">{cat.icono}</span>
                  <span className="cat-faq-nombre">{cat.nombre}</span>
                  <span className="cat-faq-count">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Lista de Preguntas */}
        <section className="preguntas-section">
          <div className="preguntas-container">
            {preguntasFiltradas.length === 0 ? (
              <div className="sin-resultados">
                <div className="sin-resultados-icon">🔍</div>
                <h3>No encontramos resultados</h3>
                <p>Intenta con otros términos de búsqueda o explora diferentes categorías</p>
                <button className="btn-limpiar" onClick={() => { setBusqueda(""); setCategoriaActiva("todas"); }}>
                  Ver Todas las Preguntas
                </button>
              </div>
            ) : (
              <>
                <div className="resultados-info">
                  <p>Mostrando <strong>{preguntasFiltradas.length}</strong> {preguntasFiltradas.length === 1 ? 'pregunta' : 'preguntas'}</p>
                </div>

                <div className="preguntas-lista">
                  {preguntasFiltradas.map((pregunta) => (
                    <div key={pregunta.id} className="pregunta-item">
                      <div 
                        className="pregunta-header"
                        onClick={() => togglePregunta(pregunta.id)}
                      >
                        <h3>{pregunta.pregunta}</h3>
                        <span className={`toggle-icon ${preguntaAbierta === pregunta.id ? "abierto" : ""}`}>
                          {preguntaAbierta === pregunta.id ? "−" : "+"}
                        </span>
                      </div>

                      {preguntaAbierta === pregunta.id && (
                        <div className="pregunta-respuesta">
                          <p>{pregunta.respuesta}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Sección de Contacto */}
        <section className="contacto-faq">
          <div className="contacto-faq-content">
            <h2>¿No Encontraste tu Respuesta?</h2>
            <p>Nuestro equipo está listo para ayudarte con cualquier duda o consulta que tengas.</p>
            <div className="contacto-faq-buttons">
              <button className="btn-contacto-faq" onClick={() => navigate("/contacto")}>
                📧 Contáctanos
              </button>
              <button className="btn-contacto-faq secondary" onClick={() => navigate("/voluntariado")}>
                🤝 Únete al Equipo
              </button>
            </div>
          </div>
        </section>

        {/* Recursos Rápidos */}
        <section className="recursos-faq">
          <h2>Recursos Útiles</h2>
          <div className="recursos-faq-grid">
            <div className="recurso-faq-card" onClick={() => navigate("/info-mascotas")}>
              <div className="recurso-faq-icon">📝</div>
              <h3>Proceso de Adopción</h3>
              <p>Conoce paso a paso cómo adoptar</p>
            </div>

            <div className="recurso-faq-card" onClick={() => navigate("/consejos")}>
              <div className="recurso-faq-icon">📚</div>
              <h3>Guías de Cuidado</h3>
              <p>Aprende a cuidar a tu mascota</p>
            </div>

            <div className="recurso-faq-card" onClick={() => navigate("/donaciones")}>
              <div className="recurso-faq-icon">💝</div>
              <h3>Cómo Donar</h3>
              <p>Apoya nuestra causa</p>
            </div>

            <div className="recurso-faq-card" onClick={() => navigate("/apadrina")}>
              <div className="recurso-faq-icon">🐾</div>
              <h3>Apadrinamiento</h3>
              <p>Apadrina una mascota</p>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default PreguntasFrecuentes;