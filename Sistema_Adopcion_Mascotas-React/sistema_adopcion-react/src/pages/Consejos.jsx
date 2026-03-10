import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Consejos.css";

const Consejos = () => {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
  const [consejoExpandido, setConsejoExpandido] = useState(null);

  // Datos de consejos organizados por categorías
  const consejos = [
    {
      id: 1,
      categoria: "alimentacion",
      titulo: "Alimentación Balanceada para tu Mascota",
      icono: "🍖",
      color: "#fbbf24",
      resumen: "La alimentación adecuada es fundamental para la salud de tu mascota.",
      contenido: `
        <h3>Perros:</h3>
        <ul>
          <li><strong>Cachorros (2-12 meses):</strong> 3-4 comidas al día con alimento específico para cachorros rico en proteínas y calcio.</li>
          <li><strong>Adultos:</strong> 2 comidas al día, porciones según el peso y nivel de actividad.</li>
          <li><strong>Seniors:</strong> Alimento bajo en calorías, alto en fibra, 2 comidas al día.</li>
        </ul>
        
        <h3>Gatos:</h3>
        <ul>
          <li><strong>Gatitos:</strong> 4 comidas pequeñas al día hasta los 6 meses.</li>
          <li><strong>Adultos:</strong> 2-3 comidas diarias con alimento de calidad premium.</li>
          <li><strong>Agua fresca:</strong> Siempre disponible, los gatos necesitan hidratación constante.</li>
        </ul>
        
        <h3>Alimentos prohibidos:</h3>
        <p>❌ Chocolate, uvas, cebolla, ajo, aguacate, alcohol, café, dulces con xilitol.</p>
      `
    },
    {
      id: 2,
      categoria: "salud",
      titulo: "Calendario de Vacunación y Desparasitación",
      icono: "💉",
      color: "#10b981",
      resumen: "Mantén a tu mascota protegida con un calendario de vacunación adecuado.",
      contenido: `
        <h3>Perros - Vacunas esenciales:</h3>
        <ul>
          <li><strong>6-8 semanas:</strong> Primera dosis de parvovirus y moquillo</li>
          <li><strong>10-12 semanas:</strong> Segunda dosis + leptospirosis</li>
          <li><strong>14-16 semanas:</strong> Tercera dosis + rabia</li>
          <li><strong>Anual:</strong> Refuerzo de todas las vacunas</li>
        </ul>
        
        <h3>Gatos - Vacunas esenciales:</h3>
        <ul>
          <li><strong>8 semanas:</strong> Triple felina (panleucopenia, rinotraqueitis, calicivirus)</li>
          <li><strong>12 semanas:</strong> Refuerzo triple felina + leucemia</li>
          <li><strong>16 semanas:</strong> Rabia</li>
          <li><strong>Anual:</strong> Refuerzos</li>
        </ul>
        
        <h3>Desparasitación:</h3>
        <p>🔸 Interna: cada 3 meses</p>
        <p>🔸 Externa (pulgas y garrapatas): mensual o según producto</p>
      `
    },
    {
      id: 3,
      categoria: "entrenamiento",
      titulo: "Entrenamiento Básico y Socialización",
      icono: "🎓",
      color: "#3b82f6",
      resumen: "Enseña a tu mascota buenos hábitos desde temprana edad.",
      contenido: `
        <h3>Comandos básicos para perros:</h3>
        <ul>
          <li><strong>Sentado:</strong> Sostén un premio sobre su nariz y muévelo hacia atrás, di "sentado" cuando se siente.</li>
          <li><strong>Quieto:</strong> Con la palma abierta frente a él, di "quieto" y recompensa cuando obedezca.</li>
          <li><strong>Ven:</strong> Usa tono alegre, agáchate y di "ven", premia cuando llegue.</li>
          <li><strong>Junto:</strong> Mantén premio a tu lado, camina y recompensa cuando camine contigo.</li>
        </ul>
        
        <h3>Consejos de entrenamiento:</h3>
        <p>✅ Sesiones cortas (5-10 minutos)</p>
        <p>✅ Usa refuerzo positivo siempre</p>
        <p>✅ Sé consistente con las órdenes</p>
        <p>✅ Paciencia y repetición</p>
        
        <h3>Socialización:</h3>
        <p>Expón a tu mascota a diferentes personas, animales, sonidos y entornos desde cachorro (3-14 semanas es crítico).</p>
      `
    },
    {
      id: 4,
      categoria: "higiene",
      titulo: "Higiene y Cuidado Personal",
      icono: "🛁",
      color: "#8b5cf6",
      resumen: "Mantén a tu mascota limpia y saludable con rutinas de higiene.",
      contenido: `
        <h3>Baño:</h3>
        <ul>
          <li><strong>Perros:</strong> Cada 4-6 semanas con shampoo especial para perros</li>
          <li><strong>Gatos:</strong> Generalmente no necesitan baños, se asean solos. Solo en casos especiales.</li>
        </ul>
        
        <h3>Cepillado:</h3>
        <ul>
          <li><strong>Pelo corto:</strong> 1-2 veces por semana</li>
          <li><strong>Pelo largo:</strong> Diario para evitar nudos</li>
          <li><strong>Beneficio:</strong> Reduce pelo muerto y mejora circulación</li>
        </ul>
        
        <h3>Cuidado dental:</h3>
        <p>🦷 Cepilla los dientes 2-3 veces por semana con pasta dental para mascotas</p>
        <p>🦴 Ofrece juguetes dentales o premios que ayuden a limpiar</p>
        
        <h3>Uñas:</h3>
        <p>Corta cada 3-4 semanas si no se desgastan naturalmente. Cuidado con no cortar el nervio (parte rosa).</p>
        
        <h3>Orejas:</h3>
        <p>Limpia semanalmente con solución especial, especialmente en razas de orejas caídas.</p>
      `
    },
    {
      id: 5,
      categoria: "comportamiento",
      titulo: "Entendiendo el Comportamiento de tu Mascota",
      icono: "🐾",
      color: "#ec4899",
      resumen: "Aprende a interpretar las señales y comportamientos de tu compañero.",
      contenido: `
        <h3>Lenguaje corporal de perros:</h3>
        <ul>
          <li><strong>Cola alta y moviéndose:</strong> Felicidad, confianza</li>
          <li><strong>Cola entre patas:</strong> Miedo, sumisión</li>
          <li><strong>Orejas hacia adelante:</strong> Alerta, interesado</li>
          <li><strong>Orejas hacia atrás:</strong> Miedo o sumisión</li>
          <li><strong>Boca abierta, lengua relajada:</strong> Tranquilo, feliz</li>
          <li><strong>Gruñido con dientes visibles:</strong> Advertencia, incomodidad</li>
        </ul>
        
        <h3>Lenguaje de gatos:</h3>
        <ul>
          <li><strong>Ronroneo:</strong> Generalmente felicidad (pero también puede ser estrés)</li>
          <li><strong>Cola vertical:</strong> Saludo amistoso</li>
          <li><strong>Cola esponjada:</strong> Miedo o agresión</li>
          <li><strong>Amasar con patas:</strong> Comodidad, contentamiento</li>
          <li><strong>Orejas hacia atrás:</strong> Molestia, miedo</li>
          <li><strong>Maullido:</strong> Comunicación con humanos (no entre gatos)</li>
        </ul>
        
        <h3>Problemas comunes:</h3>
        <p>🔸 <strong>Ansiedad por separación:</strong> Entrenamiento gradual, juguetes interactivos</p>
        <p>🔸 <strong>Ladridos excesivos:</strong> Identificar causa, entrenamiento, ejercicio adecuado</p>
        <p>🔸 <strong>Marcaje territorial:</strong> Esterilización, limpieza con enzimas, entrenamiento</p>
      `
    },
    {
      id: 6,
      categoria: "ejercicio",
      titulo: "Ejercicio y Actividad Física",
      icono: "⚽",
      color: "#f59e0b",
      resumen: "La actividad física es esencial para la salud mental y física.",
      contenido: `
        <h3>Necesidades según raza de perros:</h3>
        <ul>
          <li><strong>Razas muy activas</strong> (Border Collie, Husky): 2+ horas diarias</li>
          <li><strong>Razas activas</strong> (Labrador, Golden): 1-2 horas diarias</li>
          <li><strong>Razas moderadas</strong> (Bulldog, Pug): 30-60 minutos diarios</li>
          <li><strong>Razas pequeñas</strong> (Chihuahua): 30-45 minutos diarios</li>
        </ul>
        
        <h3>Actividades recomendadas:</h3>
        <p>🎾 Juegos de buscar y traer</p>
        <p>🏃 Caminatas o trote ligero</p>
        <p>🌊 Natación (excelente ejercicio de bajo impacto)</p>
        <p>🧩 Juegos de inteligencia y búsqueda de premios</p>
        <p>🐕 Socialización en parques para perros</p>
        
        <h3>Ejercicio para gatos:</h3>
        <ul>
          <li><strong>Juguetes interactivos:</strong> Varitas con plumas, ratones, pelotas</li>
          <li><strong>Rascadores y torres:</strong> Permiten trepar y rascar</li>
          <li><strong>Sesiones de juego:</strong> 2-3 veces al día, 10-15 minutos cada una</li>
          <li><strong>Cajas y túneles:</strong> Estimulan el instinto de caza</li>
        </ul>
        
        <h3>⚠️ Precauciones:</h3>
        <p>• Evita ejercicio intenso en horas de mucho calor</p>
        <p>• Siempre lleva agua fresca</p>
        <p>• Incrementa intensidad gradualmente</p>
        <p>• Consulta al vet antes de iniciar rutina con mascotas mayores</p>
      `
    },
    {
      id: 7,
      categoria: "emergencias",
      titulo: "Primeros Auxilios y Emergencias",
      icono: "🚨",
      color: "#ef4444",
      resumen: "Saber qué hacer en una emergencia puede salvar la vida de tu mascota.",
      contenido: `
        <h3>🆘 Señales de emergencia - Acude al vet inmediatamente:</h3>
        <ul>
          <li>❗ Dificultad para respirar</li>
          <li>❗ Sangrado que no para</li>
          <li>❗ Convulsiones</li>
          <li>❗ Imposibilidad para orinar o defecar</li>
          <li>❗ Vómito o diarrea con sangre</li>
          <li>❗ Trauma (caída, atropellamiento)</li>
          <li>❗ Envenenamiento sospechado</li>
          <li>❗ Colapso o pérdida de consciencia</li>
        </ul>
        
        <h3>Botiquín básico para mascotas:</h3>
        <p>✓ Gasas estériles y vendas</p>
        <p>✓ Solución salina</p>
        <p>✓ Termómetro digital</p>
        <p>✓ Pinzas</p>
        <p>✓ Guantes desechables</p>
        <p>✓ Números de emergencia veterinaria</p>
        <p>✓ Manta térmica</p>
        <p>✓ Jeringa (sin aguja) para dar medicamentos orales</p>
        
        <h3>Primeros auxilios básicos:</h3>
        <p><strong>Heridas:</strong> Limpia con solución salina, aplica presión con gasa si sangra, cubre y acude al vet.</p>
        <p><strong>Golpe de calor:</strong> Mover a sombra, mojar con agua fresca (no fría), vet urgente.</p>
        <p><strong>Atragantamiento:</strong> Abre la boca, si ves el objeto retíralo con cuidado. Si no puedes, maniobra de Heimlich y vet.</p>
        <p><strong>Intoxicación:</strong> NO induzcas vómito sin consultar, llama al vet inmediatamente.</p>
      `
    },
    {
      id: 8,
      categoria: "salud",
      titulo: "Señales de Enfermedad y Cuándo Ir al Veterinario",
      icono: "🩺",
      color: "#06b6d4",
      resumen: "Reconoce los síntomas que requieren atención veterinaria.",
      contenido: `
        <h3>Síntomas que requieren consulta veterinaria:</h3>
        <ul>
          <li>🔸 Pérdida de apetito por más de 24 horas</li>
          <li>🔸 Vómito frecuente (más de 2 veces en 24h)</li>
          <li>🔸 Diarrea persistente (más de 24h)</li>
          <li>🔸 Letargo o debilidad inusual</li>
          <li>🔸 Tos persistente</li>
          <li>🔸 Dificultad para caminar o cojera</li>
          <li>🔸 Cambios en consumo de agua (mucha sed o ninguna)</li>
          <li>🔸 Cambios en patrón de orina/defecación</li>
          <li>🔸 Bultos o hinchazones nuevas</li>
          <li>🔸 Rascado excesivo o pérdida de pelo</li>
        </ul>
        
        <h3>Chequeos preventivos recomendados:</h3>
        <p>🔸 <strong>Cachorros/gatitos:</strong> Cada 3-4 semanas hasta completar vacunas</p>
        <p>🔸 <strong>Adultos jóvenes (1-7 años):</strong> Anualmente</p>
        <p>🔸 <strong>Seniors (7+ años):</strong> Cada 6 meses</p>
        
        <h3>Exámenes de rutina:</h3>
        <p>• Examen físico completo</p>
        <p>• Análisis de sangre (anual)</p>
        <p>• Examen dental</p>
        <p>• Chequeo de peso</p>
        <p>• Revisión de vacunas</p>
      `
    },
    {
      id: 9,
      categoria: "alimentacion",
      titulo: "Premios y Snacks Saludables",
      icono: "🦴",
      color: "#a855f7",
      resumen: "Aprende a darle premios saludables sin comprometer su dieta.",
      contenido: `
        <h3>Regla general:</h3>
        <p>Los premios no deben exceder el 10% de las calorías diarias totales.</p>
        
        <h3>Premios saludables para perros:</h3>
        <ul>
          <li>✓ Zanahoria cruda (baja en calorías, limpia dientes)</li>
          <li>✓ Manzana sin semillas (vitaminas y fibra)</li>
          <li>✓ Arándanos (antioxidantes)</li>
          <li>✓ Calabaza cocida (buena para digestión)</li>
          <li>✓ Pollo cocido sin hueso ni piel</li>
          <li>✓ Batata cocida</li>
        </ul>
        
        <h3>Premios para gatos:</h3>
        <ul>
          <li>✓ Pollo o pavo cocido sin condimentos</li>
          <li>✓ Atún enlatado en agua (ocasionalmente)</li>
          <li>✓ Premios comerciales liofilizados</li>
          <li>✓ Hierba gatera (catnip) - no es comida pero les encanta</li>
        </ul>
        
        <h3>❌ Evitar:</h3>
        <p>• Premios con colorantes artificiales</p>
        <p>• Huesos cocidos (pueden astillarse)</p>
        <p>• Exceso de premios de carne procesada</p>
        <p>• Premios con alto contenido de sal o azúcar</p>
        
        <h3>Premios caseros:</h3>
        <p>Puedes hacer galletas caseras con harina de avena, calabaza y un poco de mantequilla de maní (sin xilitol).</p>
      `
    },
    {
      id: 10,
      categoria: "hogar",
      titulo: "Preparando tu Hogar para una Mascota",
      icono: "🏠",
      color: "#14b8a6",
      resumen: "Crea un ambiente seguro y acogedor para tu nuevo compañero.",
      contenido: `
        <h3>Elementos esenciales:</h3>
        <p>🔸 Cama o manta cómoda</p>
        <p>🔸 Platos para agua y comida (acero inoxidable o cerámica)</p>
        <p>🔸 Collar con placa de identificación</p>
        <p>🔸 Correa (perros)</p>
        <p>🔸 Arenero (gatos)</p>
        <p>🔸 Juguetes seguros</p>
        <p>🔸 Transportadora</p>
        
        <h3>Seguridad en casa:</h3>
        <ul>
          <li>✓ Asegura cables eléctricos</li>
          <li>✓ Guarda productos de limpieza en alto</li>
          <li>✓ Retira plantas tóxicas (lirios, filodendro, azaleas)</li>
          <li>✓ Asegura medicamentos humanos</li>
          <li>✓ Protege balcones y ventanas</li>
          <li>✓ Esconde cables y objetos pequeños que puedan tragar</li>
        </ul>
        
        <h3>Zona de descanso:</h3>
        <p>Crea un espacio tranquilo donde tu mascota pueda retirarse y sentirse segura. Debe estar en un área con poco tráfico pero donde aún pueda verte.</p>
        
        <h3>Para gatos específicamente:</h3>
        <p>• Rascadores verticales y horizontales</p>
        <p>• Perchas o torres para trepar</p>
        <p>• Escondites (cajas, túneles)</p>
        <p>• Arenero en lugar tranquilo (1 por gato + 1 extra)</p>
      `
    },
    {
      id: 11,
      categoria: "entrenamiento",
      titulo: "Corrección de Conductas No Deseadas",
      icono: "🚫",
      color: "#f43f5e",
      resumen: "Técnicas efectivas para corregir comportamientos problemáticos.",
      contenido: `
        <h3>Principios básicos:</h3>
        <p>✅ Nunca uses castigo físico</p>
        <p>✅ Recompensa el comportamiento deseado</p>
        <p>✅ Redirige la conducta no deseada</p>
        <p>✅ Sé consistente</p>
        <p>✅ Ten paciencia</p>
        
        <h3>Problemas comunes y soluciones:</h3>
        
        <p><strong>Morder muebles/zapatos:</strong></p>
        <p>• Proporciona juguetes apropiados para morder</p>
        <p>• Usa repelentes seguros para mascotas</p>
        <p>• Redirige a juguete cuando muerda algo incorrecto</p>
        <p>• Asegura suficiente ejercicio y estimulación mental</p>
        
        <p><strong>Saltar sobre personas:</strong></p>
        <p>• Ignora completamente el salto (no contacto visual ni verbal)</p>
        <p>• Recompensa cuando las 4 patas estén en el piso</p>
        <p>• Enseña comando "abajo" o "sentado" al saludar</p>
        
        <p><strong>Tirar de la correa:</strong></p>
        <p>• Detente cuando tire, continúa cuando afloje</p>
        <p>• Usa refuerzo positivo cuando camine junto a ti</p>
        <p>• Considera arnés anti-tirones</p>
        
        <p><strong>Arañar muebles (gatos):</strong></p>
        <p>• Proporciona múltiples rascadores</p>
        <p>• Usa catnip en rascadores</p>
        <p>• Cubre temporalmente con papel aluminio áreas problemáticas</p>
        <p>• Recorta uñas regularmente</p>
      `
    },
    {
      id: 12,
      categoria: "hogar",
      titulo: "Viajes y Transporte Seguro",
      icono: "✈️",
      color: "#0ea5e9",
      resumen: "Consejos para viajar de forma segura con tu mascota.",
      contenido: `
        <h3>En automóvil:</h3>
        <ul>
          <li>✓ Usa transportadora asegurada o arnés de seguridad para auto</li>
          <li>✓ NUNCA dejes mascota suelta en el auto</li>
          <li>✓ No permitas que saque la cabeza por la ventana</li>
          <li>✓ Haz paradas cada 2-3 horas en viajes largos</li>
          <li>✓ NUNCA dejes mascota sola en auto (especialmente en calor)</li>
        </ul>
        
        <h3>Preparación para viaje:</h3>
        <p>🔸 Lleva registro de vacunas actualizado</p>
        <p>🔸 Microchip y placa de identificación con info de contacto</p>
        <p>🔸 Medicamentos necesarios + recetas</p>
        <p>🔸 Comida y agua suficiente</p>
        <p>🔸 Platos portátiles</p>
        <p>🔸 Correa extra</p>
        <p>🔸 Bolsas para desechos</p>
        <p>🔸 Cama o manta familiar</p>
        <p>🔸 Juguete favorito</p>
        
        <h3>Viaje en avión:</h3>
        <p>• Consulta políticas de aerolínea con anticipación</p>
        <p>• Transportadora aprobada por aerolínea</p>
        <p>• Certificado de salud veterinario (usualmente válido 10 días)</p>
        <p>• Evita tranquilizantes sin consultar vet</p>
        <p>• Viaja en temporada fresca si es posible</p>
        
        <h3>Alojamiento:</h3>
        <p>Verifica que hoteles/alojamientos acepten mascotas. Lleva una manta para proteger muebles y mantén a tu mascota supervisada.</p>
      `
    }
  ];

  const consejosFiltrados = categoriaActiva === "todos" 
    ? consejos 
    : consejos.filter(c => c.categoria === categoriaActiva);

  const toggleConsejo = (id) => {
    setConsejoExpandido(consejoExpandido === id ? null : id);
  };

  const categorias = [
    { id: "todos", nombre: "Todos", icono: "📚" },
    { id: "alimentacion", nombre: "Alimentación", icono: "🍖" },
    { id: "salud", nombre: "Salud", icono: "💊" },
    { id: "entrenamiento", nombre: "Entrenamiento", icono: "🎓" },
    { id: "higiene", nombre: "Higiene", icono: "🛁" },
    { id: "comportamiento", nombre: "Comportamiento", icono: "🐾" },
    { id: "ejercicio", nombre: "Ejercicio", icono: "⚽" },
    { id: "emergencias", nombre: "Emergencias", icono: "🚨" },
    { id: "hogar", nombre: "Hogar", icono: "🏠" }
  ];

  return (
    <div className="consejos-page">
      <Navbar />
      
      <main className="consejos-container">
        
        {/* Hero Section */}
        <section className="hero-consejos">
          <div className="hero-consejos-content">
            <h1>Consejos de Cuidado</h1>
            <p className="hero-consejos-subtitle">
              Guías prácticas para el bienestar y cuidado óptimo de tu mascota
            </p>
          </div>
        </section>

        {/* Introducción */}
        <section className="intro-consejos">
          <div className="intro-consejos-content">
            <h2>Tu Guía Completa de Cuidado Animal</h2>
            <div className="intro-line-consejos"></div>
            <p>
              Ser un dueño responsable va más allá de amor y cariño. Requiere conocimiento sobre 
              alimentación, salud, comportamiento y cuidados específicos. Aquí encontrarás toda la 
              información que necesitas para garantizar el bienestar de tu compañero.
            </p>
          </div>
        </section>

        {/* Filtros de categoría */}
        <section className="filtros-consejos">
          <div className="filtros-consejos-container">
            <h3>Explora por categoría:</h3>
            <div className="categorias-consejos-buttons">
              {categorias.map(cat => (
                <button
                  key={cat.id}
                  className={categoriaActiva === cat.id ? "active" : ""}
                  onClick={() => setCategoriaActiva(cat.id)}
                >
                  <span className="cat-consejos-icono">{cat.icono}</span>
                  <span className="cat-consejos-nombre">{cat.nombre}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Grid de Consejos */}
        <section className="consejos-grid-section">
          <div className="consejos-grid">
            {consejosFiltrados.map((consejo) => (
              <div key={consejo.id} className="consejo-card">
                <div className="consejo-header" style={{ backgroundColor: consejo.color }}>
                  <div className="consejo-icono">{consejo.icono}</div>
                </div>

                <div className="consejo-content">
                  <h3>{consejo.titulo}</h3>
                  <p className="consejo-resumen">{consejo.resumen}</p>

                  <button 
                    className="btn-leer-mas"
                    onClick={() => toggleConsejo(consejo.id)}
                  >
                    {consejoExpandido === consejo.id ? "Leer menos ▲" : "Leer más ▼"}
                  </button>

                  {consejoExpandido === consejo.id && (
                    <div 
                      className="consejo-contenido-completo"
                      dangerouslySetInnerHTML={{ __html: consejo.contenido }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recursos Adicionales */}
        <section className="recursos-adicionales">
          <h2>Recursos Adicionales</h2>
          
          <div className="recursos-grid">
            <div className="recurso-card">
              <div className="recurso-icono">📞</div>
              <h3>Consulta con Expertos</h3>
              <p>¿Tienes dudas específicas? Nuestro equipo veterinario puede ayudarte.</p>
              <button className="btn-recurso" onClick={() => navigate("/contacto")}>
                Contactar
              </button>
            </div>

            <div className="recurso-card">
              <div className="recurso-icono">📅</div>
              <h3>Agenda una Cita</h3>
              <p>Programa chequeos preventivos o consultas veterinarias.</p>
              <button className="btn-recurso" onClick={() => navigate("/info-citas")}>
                Agendar Cita
              </button>
            </div>

            <div className="recurso-card">
              <div className="recurso-icono">💬</div>
              <h3>Comunidad</h3>
              <p>Únete a nuestros talleres y charlas sobre cuidado animal.</p>
              <button className="btn-recurso" onClick={() => navigate("/voluntariado")}>
                Más Información
              </button>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-consejos">
          <div className="cta-consejos-content">
            <h2>¿Buscas Adoptar?</h2>
            <p>Ahora que conoces todo sobre el cuidado de mascotas, ¿estás listo para dar el paso?</p>
            <button className="btn-cta-consejos" onClick={() => navigate("/mascotas")}>
              Ver Mascotas Disponibles
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Consejos;