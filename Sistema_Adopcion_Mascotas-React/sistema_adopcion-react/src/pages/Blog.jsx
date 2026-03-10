import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Blog.css";

const Blog = () => {
  const navigate = useNavigate();
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [busqueda, setBusqueda] = useState("");

  // Datos de artículos del blog
  const articulos = [
    {
      id: 1,
      categoria: "salud",
      titulo: "5 Señales de que tu Mascota Necesita ir al Veterinario",
      extracto: "Aprende a identificar los síntomas que requieren atención veterinaria inmediata para proteger la salud de tu compañero.",
      autor: "Dr. Carlos Mendoza",
      fecha: "15 de Febrero, 2026",
      imagen: "🩺",
      color: "#10b981",
      tiempoLectura: "5 min",
      contenido: `
        <p>Como dueños responsables, debemos estar atentos a las señales que nos indican que nuestra mascota necesita atención veterinaria. Aquí te presentamos las 5 señales más importantes:</p>
        
        <h3>1. Pérdida de Apetito Prolongada</h3>
        <p>Si tu mascota rechaza la comida por más de 24 horas, puede ser señal de un problema serio. Los animales tienen un instinto natural de comer, así que la falta de apetito no debe tomarse a la ligera.</p>
        
        <h3>2. Cambios en el Comportamiento</h3>
        <p>Letargo extremo, agresividad inusual, o esconderse constantemente pueden indicar dolor o malestar. Los animales no pueden decirnos con palabras cuando se sienten mal, pero sus acciones hablan.</p>
        
        <h3>3. Vómito o Diarrea Persistente</h3>
        <p>Un episodio ocasional puede ser normal, pero si se repite más de 2 veces en 24 horas o si ves sangre, busca ayuda veterinaria inmediatamente.</p>
        
        <h3>4. Dificultad para Respirar</h3>
        <p>Respiración agitada, tos persistente, o jadeo excesivo sin razón aparente son emergencias médicas que requieren atención inmediata.</p>
        
        <h3>5. Cambios en Hábitos de Baño</h3>
        <p>Dificultad para orinar o defecar, cambios drásticos en la frecuencia, o sangre en orina/heces requieren evaluación veterinaria urgente.</p>
        
        <p><strong>Recuerda:</strong> Ante la duda, siempre es mejor consultar. La detección temprana puede salvar la vida de tu mascota.</p>
      `
    },
    {
      id: 2,
      categoria: "comportamiento",
      titulo: "Cómo Corregir el Comportamiento Destructivo en Perros",
      extracto: "Soluciones prácticas para manejar y corregir conductas destructivas como masticar muebles o cavar en el jardín.",
      autor: "Laura Martínez",
      fecha: "10 de Febrero, 2026",
      imagen: "🐕",
      color: "#3b82f6",
      tiempoLectura: "7 min",
      contenido: `
        <p>El comportamiento destructivo en perros es uno de los problemas más comunes que enfrentan los dueños. La buena noticia es que casi siempre tiene solución.</p>
        
        <h3>¿Por qué los Perros se Comportan Destructivamente?</h3>
        <p>Las causas más comunes incluyen:</p>
        <ul>
          <li>Aburrimiento y falta de estimulación mental</li>
          <li>Ansiedad por separación</li>
          <li>Exceso de energía no liberada</li>
          <li>Dentición en cachorros</li>
          <li>Búsqueda de atención</li>
        </ul>
        
        <h3>Soluciones Efectivas</h3>
        
        <h4>1. Ejercicio Adecuado</h4>
        <p>Un perro cansado es un perro feliz. Asegúrate de que tu perro reciba suficiente ejercicio diario según su raza y edad. Caminatas, juegos de buscar, y actividades de agilidad son excelentes opciones.</p>
        
        <h4>2. Estimulación Mental</h4>
        <p>Los juguetes interactivos, rompecabezas para perros, y sesiones de entrenamiento mantienen su mente ocupada. Un perro mentalmente estimulado tiene menos probabilidades de buscar "entretenimiento" destructivo.</p>
        
        <h4>3. Proporciona Alternativas Apropiadas</h4>
        <p>Dale a tu perro juguetes para masticar seguros y apropiados. Rota los juguetes semanalmente para mantener su interés.</p>
        
        <h4>4. Maneja la Ansiedad por Separación</h4>
        <p>Entrena gradualmente a tu perro a estar solo. Comienza con ausencias cortas y aumenta el tiempo gradualmente. Considera usar música relajante o feromonas calmantes.</p>
        
        <h4>5. Supervisa y Redirige</h4>
        <p>Cuando veas que tu perro está a punto de masticar algo inapropiado, redirige su atención a un juguete permitido y recompénsalo cuando lo use.</p>
        
        <p><strong>Nunca uses castigo físico.</strong> Esto puede empeorar el problema y dañar tu relación con tu perro. La paciencia y la consistencia son clave.</p>
      `
    },
    {
      id: 3,
      categoria: "nutricion",
      titulo: "Alimentación Natural para Mascotas: Guía Completa",
      extracto: "Descubre los beneficios de la alimentación natural y cómo implementarla de forma segura para tu perro o gato.",
      autor: "Dra. Ana Rodríguez",
      fecha: "5 de Febrero, 2026",
      imagen: "🥩",
      color: "#f59e0b",
      tiempoLectura: "10 min",
      contenido: `
        <p>La alimentación natural para mascotas ha ganado popularidad en los últimos años. Pero, ¿es adecuada para tu compañero? Aquí te contamos todo lo que necesitas saber.</p>
        
        <h3>¿Qué es la Alimentación Natural?</h3>
        <p>La alimentación natural consiste en proporcionar alimentos frescos y minimamente procesados, similares a lo que los ancestros de nuestras mascotas consumirían en la naturaleza. Esto incluye carnes, vísceras, huesos carnosos, vegetales y frutas.</p>
        
        <h3>Beneficios Potenciales</h3>
        <ul>
          <li>Pelaje más brillante y piel más sana</li>
          <li>Mejor digestión y heces más pequeñas</li>
          <li>Mayor energía y vitalidad</li>
          <li>Dientes más limpios</li>
          <li>Sistema inmunológico más fuerte</li>
        </ul>
        
        <h3>Componentes de una Dieta Natural Balanceada</h3>
        
        <h4>Para Perros:</h4>
        <ul>
          <li><strong>Proteína (70%):</strong> Pollo, res, pavo, pescado, cordero</li>
          <li><strong>Huesos carnosos (10%):</strong> Para calcio y limpieza dental</li>
          <li><strong>Vísceras (10%):</strong> Hígado, riñones (ricos en nutrientes)</li>
          <li><strong>Vegetales y frutas (10%):</strong> Zanahoria, calabaza, manzana, arándanos</li>
        </ul>
        
        <h4>Para Gatos:</h4>
        <ul>
          <li><strong>Proteína (80-85%):</strong> Pollo, pavo, conejo, pescado</li>
          <li><strong>Huesos carnosos (10%):</strong> Pequeños y apropiados para gatos</li>
          <li><strong>Vísceras (5-10%):</strong> Especialmente hígado</li>
          <li><strong>Suplementos:</strong> Taurina (esencial para gatos)</li>
        </ul>
        
        <h3>Precauciones Importantes</h3>
        <p>⚠️ <strong>Consulta siempre con un veterinario</strong> antes de cambiar la dieta de tu mascota.</p>
        <p>⚠️ Evita: huesos cocidos (pueden astillarse), cebolla, ajo, uvas, chocolate, aguacate.</p>
        <p>⚠️ La transición debe ser gradual (1-2 semanas) para evitar problemas digestivos.</p>
        <p>⚠️ Asegura un balance nutricional correcto - una dieta mal balanceada puede causar deficiencias.</p>
        
        <h3>Alternativas</h3>
        <p>Si la alimentación completamente natural no es viable, considera alimentos comerciales de alta calidad con ingredientes naturales, o combina ambos enfoques bajo supervisión veterinaria.</p>
      `
    },
    {
      id: 4,
      categoria: "adiestramiento",
      titulo: "Entrenamiento con Refuerzo Positivo: La Clave del Éxito",
      extracto: "Aprende por qué el refuerzo positivo es el método más efectivo y humano para entrenar a tu mascota.",
      autor: "Roberto Silva",
      fecha: "1 de Febrero, 2026",
      imagen: "🎓",
      color: "#8b5cf6",
      tiempoLectura: "6 min",
      contenido: `
        <p>El entrenamiento con refuerzo positivo ha revolucionado la forma en que educamos a nuestras mascotas. Este método se basa en recompensar los comportamientos deseados en lugar de castigar los no deseados.</p>
        
        <h3>¿Qué es el Refuerzo Positivo?</h3>
        <p>Es una técnica de entrenamiento que consiste en añadir algo agradable (premio, elogio, juego) inmediatamente después de que la mascota realiza el comportamiento deseado, aumentando la probabilidad de que lo repita.</p>
        
        <h3>Beneficios del Refuerzo Positivo</h3>
        <ul>
          <li>Fortalece el vínculo entre tú y tu mascota</li>
          <li>Reduce el estrés y la ansiedad</li>
          <li>Crea una mascota más confiada y segura</li>
          <li>Es más efectivo a largo plazo</li>
          <li>Hace que el aprendizaje sea divertido</li>
        </ul>
        
        <h3>Cómo Implementarlo</h3>
        
        <h4>1. Timing Perfecto</h4>
        <p>La recompensa debe darse INMEDIATAMENTE (en 1-2 segundos) después del comportamiento correcto. Esto ayuda a tu mascota a asociar la acción con la recompensa.</p>
        
        <h4>2. Elige las Recompensas Adecuadas</h4>
        <p>Usa lo que tu mascota más valore: premios de comida de alto valor, juguetes favoritos, elogios entusiastas, o tiempo de juego. Varía las recompensas para mantener el interés.</p>
        
        <h4>3. Sé Consistente</h4>
        <p>Todos en la familia deben usar las mismas palabras y señales para los comandos. La inconsistencia confunde a tu mascota.</p>
        
        <h4>4. Comienza Fácil</h4>
        <p>Divide comportamientos complejos en pasos pequeños. Recompensa cada pequeño progreso hacia el objetivo final.</p>
        
        <h4>5. Paciencia y Práctica</h4>
        <p>El aprendizaje toma tiempo. Sesiones cortas (5-10 minutos) varias veces al día son más efectivas que una sesión larga.</p>
        
        <h3>Errores Comunes a Evitar</h3>
        <ul>
          <li>❌ Recompensar demasiado tarde</li>
          <li>❌ Usar castigos o fuerza</li>
          <li>❌ Ser inconsistente</li>
          <li>❌ Esperar resultados inmediatos</li>
          <li>❌ Entrenar cuando tú o tu mascota están estresados</li>
        </ul>
        
        <h3>Ejemplo Práctico: Enseñar "Sentado"</h3>
        <p>1. Sostén un premio cerca de la nariz de tu perro<br>
        2. Mueve tu mano hacia arriba, su cabeza seguirá el premio y su trasero tocará el suelo<br>
        3. En el momento que se siente, di "sentado" y dale el premio<br>
        4. Repite varias veces<br>
        5. Practica en diferentes lugares y con diferentes distracciones</p>
        
        <p><strong>Recuerda:</strong> Nunca uses dolor o miedo para entrenar. El refuerzo positivo no solo es más humano, sino también más efectivo.</p>
      `
    },
    {
      id: 5,
      categoria: "adopcion",
      titulo: "Preparando tu Hogar para la Llegada de una Mascota Adoptada",
      extracto: "Lista completa de todo lo que necesitas preparar antes de traer a tu nuevo compañero a casa.",
      autor: "María González",
      fecha: "28 de Enero, 2026",
      imagen: "🏠",
      color: "#ec4899",
      tiempoLectura: "8 min",
      contenido: `
        <p>Adoptar una mascota es emocionante, pero requiere preparación. Aquí te mostramos cómo preparar tu hogar para garantizar una transición suave.</p>
        
        <h3>Antes de la Adopción</h3>
        
        <h4>1. Seguridad del Hogar</h4>
        <ul>
          <li>Asegura cables eléctricos</li>
          <li>Retira plantas tóxicas (lirios, filodendro, azaleas)</li>
          <li>Guarda productos de limpieza en alto</li>
          <li>Asegura medicamentos humanos</li>
          <li>Protege balcones y ventanas</li>
          <li>Retira objetos pequeños que puedan tragar</li>
        </ul>
        
        <h4>2. Compras Esenciales</h4>
        
        <p><strong>Para todos:</strong></p>
        <ul>
          <li>Platos para agua y comida (acero inoxidable o cerámica)</li>
          <li>Alimento de calidad (pregunta al refugio qué comen)</li>
          <li>Cama o manta cómoda</li>
          <li>Collar con placa de identificación</li>
          <li>Juguetes apropiados</li>
          <li>Transportadora</li>
        </ul>
        
        <p><strong>Para perros:</strong></p>
        <ul>
          <li>Correa resistente</li>
          <li>Bolsas para desechos</li>
          <li>Premios para entrenamiento</li>
        </ul>
        
        <p><strong>Para gatos:</strong></p>
        <ul>
          <li>Arenero (1 por gato + 1 extra)</li>
          <li>Arena para gatos</li>
          <li>Rascadores</li>
          <li>Torre o perchas para trepar</li>
        </ul>
        
        <h3>Los Primeros Días</h3>
        
        <h4>Día 1: La Llegada</h4>
        <ul>
          <li>Mantén la calma - tu mascota estará nerviosa</li>
          <li>Muéstrale su zona de comida y agua</li>
          <li>Para perros: primer paseo corto para hacer sus necesidades</li>
          <li>Para gatos: muéstrale el arenero inmediatamente</li>
          <li>Dale espacio para explorar a su ritmo</li>
          <li>Limita las visitas de amigos/familia la primera semana</li>
        </ul>
        
        <h4>Primera Semana: Adaptación</h4>
        <ul>
          <li>Establece una rutina consistente de comidas</li>
          <li>Para perros: comienza con el entrenamiento básico</li>
          <li>Observa comportamientos y necesidades</li>
          <li>Agenda la primera visita veterinaria</li>
          <li>Sé paciente con accidentes - es normal</li>
        </ul>
        
        <h3>Regla de los 3-3-3</h3>
        <p>Un concepto útil para entender la adaptación:</p>
        <ul>
          <li><strong>3 días:</strong> Desorientación, puede estar asustado o esconderse</li>
          <li><strong>3 semanas:</strong> Comienza a sentirse cómodo, muestra su personalidad</li>
          <li><strong>3 meses:</strong> Completamente adaptado, verdadera personalidad emerge</li>
        </ul>
        
        <h3>Si Tienes Otras Mascotas</h3>
        <ul>
          <li>Presenta gradualmente en territorio neutral</li>
          <li>Supervisa todas las interacciones iniciales</li>
          <li>Mantén separados al principio si hay tensión</li>
          <li>Asegura que cada mascota tenga su propio espacio y recursos</li>
          <li>Ten paciencia - pueden tomar semanas en adaptarse entre sí</li>
        </ul>
        
        <h3>Red de Apoyo</h3>
        <p>Ten a mano:</p>
        <ul>
          <li>Número de tu veterinario</li>
          <li>Clínica de emergencias 24/7</li>
          <li>Número del refugio para preguntas</li>
          <li>Paseador de perros o cuidador de confianza</li>
        </ul>
        
        <p><strong>Recuerda:</strong> La paciencia es clave. Cada mascota se adapta a su propio ritmo. Dale tiempo, amor y estructura, y pronto tendrás un compañero feliz y bien adaptado.</p>
      `
    },
    {
      id: 6,
      categoria: "salud",
      titulo: "Vacunas para Mascotas: Calendario Completo y Recomendaciones",
      extracto: "Guía detallada sobre todas las vacunas que tu mascota necesita para mantenerse saludable y protegida.",
      autor: "Dr. Carlos Mendoza",
      fecha: "20 de Enero, 2026",
      imagen: "💉",
      color: "#06b6d4",
      tiempoLectura: "9 min",
      contenido: `
        <p>Las vacunas son una de las herramientas más importantes para proteger la salud de tu mascota. Aquí te explicamos todo lo que necesitas saber.</p>
        
        <h3>¿Por qué son Importantes las Vacunas?</h3>
        <p>Las vacunas preparan el sistema inmunológico de tu mascota para combatir enfermedades potencialmente mortales. Son más seguras y efectivas que tratar la enfermedad una vez que ocurre.</p>
        
        <h3>Vacunas para Perros</h3>
        
        <h4>Vacunas Esenciales (Core)</h4>
        <p>Recomendadas para TODOS los perros:</p>
        
        <p><strong>1. Parvovirus</strong></p>
        <ul>
          <li>Enfermedad viral altamente contagiosa</li>
          <li>Causa vómitos severos, diarrea con sangre</li>
          <li>Puede ser mortal, especialmente en cachorros</li>
          <li>Calendario: 6-8, 10-12, 14-16 semanas; refuerzo anual</li>
        </ul>
        
        <p><strong>2. Moquillo Canino</strong></p>
        <ul>
          <li>Virus que afecta múltiples sistemas del cuerpo</li>
          <li>Síntomas: fiebre, secreción nasal, tos, convulsiones</li>
          <li>Alta tasa de mortalidad</li>
          <li>Calendario: mismo que parvovirus</li>
        </ul>
        
        <p><strong>3. Hepatitis Infecciosa Canina</strong></p>
        <ul>
          <li>Afecta hígado, riñones, ojos</li>
          <li>Se transmite por contacto con fluidos corporales</li>
          <li>Calendario: mismo que parvovirus</li>
        </ul>
        
        <p><strong>4. Rabia</strong></p>
        <ul>
          <li>Enfermedad viral mortal que afecta el sistema nervioso</li>
          <li>Se transmite a humanos (zoonosis)</li>
          <li>Requerida por ley en la mayoría de países</li>
          <li>Calendario: 12-16 semanas; refuerzo anual o trienal según regulación local</li>
        </ul>
        
        <h4>Vacunas No Esenciales (Non-Core)</h4>
        <p>Según estilo de vida y riesgo:</p>
        
        <ul>
          <li><strong>Leptospirosis:</strong> Si tiene contacto con agua estancada, vida silvestre</li>
          <li><strong>Bordetella (tos de las perreras):</strong> Si va a guarderías, parques para perros</li>
          <li><strong>Enfermedad de Lyme:</strong> Si vive en área endémica de garrapatas</li>
        </ul>
        
        <h3>Vacunas para Gatos</h3>
        
        <h4>Vacunas Esenciales</h4>
        
        <p><strong>1. Triple Felina (FVRCP)</strong></p>
        <p>Protege contra tres enfermedades:</p>
        <ul>
          <li><strong>Panleucopenia:</strong> "parvo felino", altamente contagioso</li>
          <li><strong>Rinotraqueitis:</strong> herpes virus felino</li>
          <li><strong>Calicivirus:</strong> causa problemas respiratorios</li>
          <li>Calendario: 8, 12, 16 semanas; refuerzo anual</li>
        </ul>
        
        <p><strong>2. Rabia</strong></p>
        <ul>
          <li>Mortal, se transmite a humanos</li>
          <li>Requerida por ley</li>
          <li>Calendario: 12-16 semanas; refuerzo anual o trienal</li>
        </ul>
        
        <h4>Vacunas No Esenciales</h4>
        
        <ul>
          <li><strong>Leucemia Felina (FeLV):</strong> Para gatos que salen al exterior o conviven con gatos FeLV+</li>
          <li><strong>FIV:</strong> Disponible pero no ampliamente recomendada</li>
        </ul>
        
        <h3>Calendario Resumido</h3>
        
        <h4>Cachorros/Gatitos</h4>
        <ul>
          <li>6-8 semanas: Primera dosis core</li>
          <li>10-12 semanas: Segunda dosis core</li>
          <li>14-16 semanas: Tercera dosis core + rabia</li>
          <li>1 año: Refuerzo de todas</li>
        </ul>
        
        <h4>Adultos</h4>
        <ul>
          <li>Core: Anualmente o cada 3 años según protocolo veterinario</li>
          <li>Non-core: Según riesgo individual</li>
        </ul>
        
        <h3>Efectos Secundarios</h3>
        <p>La mayoría son leves y temporales:</p>
        <ul>
          <li>Dolor en el sitio de inyección</li>
          <li>Fiebre leve</li>
          <li>Letargo por 24-48 horas</li>
          <li>Pérdida leve de apetito</li>
        </ul>
        
        <p>⚠️ Busca atención veterinaria inmediata si observas:</p>
        <ul>
          <li>Vómitos o diarrea severos</li>
          <li>Hinchazón facial</li>
          <li>Dificultad para respirar</li>
          <li>Colapso</li>
        </ul>
        
        <h3>Mitos Comunes</h3>
        <p>❌ "Las mascotas de interior no necesitan vacunas" - FALSO. Los virus pueden entrar en tu hogar en tu ropa/zapatos.</p>
        <p>❌ "Una vez vacunado, protegido de por vida" - FALSO. Los refuerzos son necesarios.</p>
        <p>❌ "Las vacunas causan autismo/otras enfermedades" - FALSO. No hay evidencia científica.</p>
        
        <p><strong>Consulta siempre con tu veterinario</strong> para establecer el calendario de vacunación más apropiado para tu mascota según su edad, salud y estilo de vida.</p>
      `
    }
  ];

  const articulosFiltrados = articulos.filter(art => {
    const cumpleCategoria = categoriaActiva === "todas" || art.categoria === categoriaActiva;
    const cumpleBusqueda = busqueda === "" || 
      art.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      art.extracto.toLowerCase().includes(busqueda.toLowerCase()) ||
      art.autor.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleCategoria && cumpleBusqueda;
  });

  const categorias = [
    { id: "todas", nombre: "Todas", icono: "📚", count: articulos.length },
    { id: "salud", nombre: "Salud", icono: "💊", count: articulos.filter(a => a.categoria === "salud").length },
    { id: "nutricion", nombre: "Nutrición", icono: "🥩", count: articulos.filter(a => a.categoria === "nutricion").length },
    { id: "comportamiento", nombre: "Comportamiento", icono: "🐾", count: articulos.filter(a => a.categoria === "comportamiento").length },
    { id: "adiestramiento", nombre: "Adiestramiento", icono: "🎓", count: articulos.filter(a => a.categoria === "adiestramiento").length },
    { id: "adopcion", nombre: "Adopción", icono: "🏠", count: articulos.filter(a => a.categoria === "adopcion").length }
  ];

  const [articuloExpandido, setArticuloExpandido] = useState(null);

  const verArticulo = (articulo) => {
    setArticuloExpandido(articulo);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cerrarArticulo = () => {
    setArticuloExpandido(null);
  };

  return (
    <div className="blog-page">
      <Navbar />
      
      <main className="blog-container">
        
        {!articuloExpandido ? (
          <>
            {/* Hero Section */}
            <section className="hero-blog">
              <div className="hero-blog-content">
                <h1>Blog Animal Home</h1>
                <p className="hero-blog-subtitle">
                  Consejos, noticias y artículos sobre el bienestar animal
                </p>
              </div>
            </section>

            {/* Búsqueda */}
            <section className="busqueda-blog">
              <div className="busqueda-blog-container">
                <h2>Buscar Artículos</h2>
                <div className="busqueda-blog-input-container">
                  <span className="busqueda-blog-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Buscar por título, autor o tema..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  {busqueda && (
                    <button className="btn-limpiar-blog-busqueda" onClick={() => setBusqueda("")}>
                      ✕
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Categorías */}
            <section className="categorias-blog">
              <div className="categorias-blog-container">
                <h3>Explora por categoría:</h3>
                <div className="categorias-blog-grid">
                  {categorias.map(cat => (
                    <button
                      key={cat.id}
                      className={`categoria-blog-btn ${categoriaActiva === cat.id ? "active" : ""}`}
                      onClick={() => setCategoriaActiva(cat.id)}
                    >
                      <span className="cat-blog-icono">{cat.icono}</span>
                      <span className="cat-blog-nombre">{cat.nombre}</span>
                      <span className="cat-blog-count">({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Grid de Artículos */}
            <section className="articulos-section">
              <div className="articulos-container">
                {articulosFiltrados.length === 0 ? (
                  <div className="sin-articulos">
                    <div className="sin-articulos-icon">📝</div>
                    <h3>No encontramos artículos</h3>
                    <p>Intenta con otros términos de búsqueda o explora diferentes categorías</p>
                    <button className="btn-limpiar-blog" onClick={() => { setBusqueda(""); setCategoriaActiva("todas"); }}>
                      Ver Todos los Artículos
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="articulos-info">
                      <p>Mostrando <strong>{articulosFiltrados.length}</strong> {articulosFiltrados.length === 1 ? 'artículo' : 'artículos'}</p>
                    </div>

                    <div className="articulos-grid">
                      {articulosFiltrados.map((articulo) => (
                        <div key={articulo.id} className="articulo-card">
                          <div className="articulo-imagen" style={{ backgroundColor: articulo.color }}>
                            <div className="articulo-emoji">{articulo.imagen}</div>
                          </div>

                          <div className="articulo-content">
                            <div className="articulo-meta">
                              <span className="articulo-categoria">{categorias.find(c => c.id === articulo.categoria)?.nombre}</span>
                              <span className="articulo-tiempo">{articulo.tiempoLectura} lectura</span>
                            </div>

                            <h3>{articulo.titulo}</h3>
                            <p className="articulo-extracto">{articulo.extracto}</p>

                            <div className="articulo-footer">
                              <div className="articulo-autor">
                                <span className="autor-icon">✍️</span>
                                <span>{articulo.autor}</span>
                              </div>
                              <span className="articulo-fecha">{articulo.fecha}</span>
                            </div>

                            <button className="btn-leer-articulo" onClick={() => verArticulo(articulo)}>
                              Leer Artículo →
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </section>

            {/* Newsletter */}
            <section className="newsletter-blog">
              <div className="newsletter-blog-content">
                <h2>Suscríbete a Nuestro Newsletter</h2>
                <p>Recibe los últimos artículos y noticias sobre bienestar animal directamente en tu email</p>
                <div className="newsletter-form">
                  <input type="email" placeholder="tu@email.com" />
                  <button className="btn-suscribir">Suscribirme</button>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* Vista de Artículo Completo */
          <div className="articulo-completo">
            <button className="btn-volver-blog" onClick={cerrarArticulo}>
              ← Volver al Blog
            </button>

            <article className="articulo-completo-content">
              <div className="articulo-completo-header" style={{ backgroundColor: articuloExpandido.color }}>
                <div className="articulo-completo-emoji">{articuloExpandido.imagen}</div>
              </div>

              <div className="articulo-completo-info">
                <span className="articulo-completo-categoria">
                  {categorias.find(c => c.id === articuloExpandido.categoria)?.nombre}
                </span>
                <h1>{articuloExpandido.titulo}</h1>
                
                <div className="articulo-completo-meta">
                  <span className="meta-item">✍️ {articuloExpandido.autor}</span>
                  <span className="meta-item">📅 {articuloExpandido.fecha}</span>
                  <span className="meta-item">⏱️ {articuloExpandido.tiempoLectura} lectura</span>
                </div>
              </div>

              <div 
                className="articulo-completo-contenido"
                dangerouslySetInnerHTML={{ __html: articuloExpandido.contenido }}
              />

              <div className="articulo-completo-footer">
                <button className="btn-compartir">📤 Compartir</button>
                <button className="btn-volver-blog-footer" onClick={cerrarArticulo}>
                  ← Volver al Blog
                </button>
              </div>
            </article>

            {/* Artículos Relacionados */}
            <section className="articulos-relacionados">
              <h2>Artículos Relacionados</h2>
              <div className="relacionados-grid">
                {articulos
                  .filter(a => a.categoria === articuloExpandido.categoria && a.id !== articuloExpandido.id)
                  .slice(0, 3)
                  .map(art => (
                    <div key={art.id} className="relacionado-card" onClick={() => verArticulo(art)}>
                      <div className="relacionado-emoji" style={{ backgroundColor: art.color }}>
                        {art.imagen}
                      </div>
                      <h4>{art.titulo}</h4>
                      <span className="relacionado-tiempo">{art.tiempoLectura} lectura</span>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Blog;