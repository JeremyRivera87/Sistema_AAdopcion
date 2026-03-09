import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/HistoriasExito.css";

const HistoriasExito = () => {
  const navigate = useNavigate();

  // Datos de historias (puedes moverlo a base de datos después)
  const historias = [
    {
      id: 1,
      mascota: "Max",
      familia: "Familia Rodríguez",
      tipo: "Perro",
      fecha: "Enero 2024",
      historia: "Max llegó a nuestro refugio con miedo y desconfianza. Había sido abandonado en la calle y no confiaba en las personas. Los Rodríguez se enamoraron de él al instante y con mucha paciencia y amor, Max se transformó en un perro feliz, juguetón y cariñoso. Ahora disfruta de largos paseos en el parque y es el mejor amigo de los niños de la familia.",
      imagen: "🐕",
      color: "#fbbf24"
    },
    {
      id: 2,
      mascota: "Luna",
      familia: "Familia Morales",
      tipo: "Gato",
      fecha: "Febrero 2024",
      historia: "Luna fue rescatada de una situación de maltrato. Era tímida y asustadiza. La familia Morales le brindó un hogar lleno de amor y comprensión. Hoy Luna es una gata confiada, le encanta acurrucarse en el sofá y ronronear mientras la acarician. Se ha convertido en la reina de la casa.",
      imagen: "🐱",
      color: "#a78bfa"
    },
    {
      id: 3,
      mascota: "Rocky",
      familia: "Familia Gómez",
      tipo: "Perro",
      fecha: "Marzo 2024",
      historia: "Rocky fue encontrado vagando por las calles, desnutrido y con problemas de salud. Después de recibir atención veterinaria y mucho cariño en el refugio, la familia Gómez decidió adoptarlo. Rocky ahora es un perro fuerte, saludable y lleno de energía. Es el compañero perfecto para hacer ejercicio y su familia no puede imaginar la vida sin él.",
      imagen: "🐕‍🦺",
      color: "#34d399"
    },
    {
      id: 4,
      mascota: "Michi",
      familia: "Familia Torres",
      tipo: "Gato",
      fecha: "Abril 2024",
      historia: "Michi llegó al refugio siendo apenas un gatito abandonado. Era muy pequeño y necesitaba cuidados especiales. Los Torres, una pareja sin hijos, decidieron darle una oportunidad. Michi creció rodeado de amor y hoy es un gato adulto, elegante y cariñoso que ha llenado de alegría el hogar de sus adoptantes.",
      imagen: "🐈",
      color: "#f472b6"
    },
    {
      id: 5,
      mascota: "Bella",
      familia: "Familia Sánchez",
      tipo: "Perro",
      fecha: "Mayo 2024",
      historia: "Bella es una perrita mestiza que fue rescatada de la lluvia. Estaba embarazada y necesitaba urgentemente un hogar temporal. La familia Sánchez la acogió y se enamoraron tanto de ella que decidieron adoptarla junto con sus cachorritos. Bella es ahora una madre feliz y protectora, y su familia adoptiva ha encontrado en ella a su mejor compañera.",
      imagen: "🐩",
      color: "#fb923c"
    },
    {
      id: 6,
      mascota: "Simba",
      familia: "Familia Vargas",
      tipo: "Gato",
      fecha: "Junio 2024",
      historia: "Simba llegó al refugio con una pata lesionada después de un accidente. Tras una cirugía exitosa y rehabilitación, los Vargas decidieron adoptarlo. A pesar de su lesión pasada, Simba es un gato activo y juguetón. Le encanta trepar y explorar cada rincón de su nuevo hogar. Es prueba viviente de que el amor y los cuidados pueden transformar vidas.",
      imagen: "🦁",
      color: "#60a5fa"
    }
  ];

  return (
    <div className="historias-exito-page">
      <Navbar />
      
      <main className="historias-container">
        
        {/* Hero Section */}
        <section className="hero-historias">
          <div className="hero-historias-content">
            <h1>Historias de Éxito</h1>
            <p className="hero-historias-subtitle">
              Cada adopción es una historia de amor, esperanza y segundas oportunidades
            </p>
          </div>
        </section>

        {/* Introducción */}
        <section className="intro-historias">
          <div className="intro-historias-content">
            <h2>Finales Felices que Inspiran</h2>
            <div className="intro-line"></div>
            <p>
              Detrás de cada mascota adoptada hay una historia única de transformación y amor. 
              Estas son algunas de las historias que nos llenan de orgullo y nos motivan a 
              continuar nuestra misión cada día.
            </p>
          </div>
        </section>

        {/* Estadísticas */}
        <section className="stats-historias">
          <div className="stats-grid">
            <div className="stat-historia">
              <div className="stat-numero">800+</div>
              <p>Adopciones Exitosas</p>
            </div>
            <div className="stat-historia">
              <div className="stat-numero">95%</div>
              <p>Satisfacción de Familias</p>
            </div>
            <div className="stat-historia">
              <div className="stat-numero">100%</div>
              <p>Amor Incondicional</p>
            </div>
          </div>
        </section>

        {/* Grid de Historias */}
        <section className="historias-grid-section">
          <h2>Nuestras Historias</h2>
          
          <div className="historias-grid">
            {historias.map((historia, index) => (
              <div key={historia.id} className="historia-card">
                <div className="historia-header" style={{ backgroundColor: historia.color }}>
                  <div className="historia-imagen-emoji">{historia.imagen}</div>
                  <div className="historia-badge">{historia.tipo}</div>
                </div>
                
                <div className="historia-content">
                  <div className="historia-info-header">
                    <h3>{historia.mascota}</h3>
                    <span className="historia-fecha">{historia.fecha}</span>
                  </div>
                  
                  <p className="historia-familia">
                    <strong>Adoptado por:</strong> {historia.familia}
                  </p>
                  
                  <p className="historia-texto">{historia.historia}</p>
                  
                  <div className="historia-footer">
                    <span className="corazon">💚</span>
                    <span className="mensaje-final">Un final feliz</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios Destacados */}
        <section className="testimonios-destacados">
          <h2>Lo Que Dicen Nuestras Familias</h2>
          
          <div className="testimonios-grid">
            <div className="testimonio-destacado">
              <div className="comillas-grandes">"</div>
              <p className="testimonio-texto">
                Adoptar a Max fue la mejor decisión que tomamos como familia. 
                Nos ha dado tanto amor y alegría. Gracias Animal Home por hacer 
                que esto fuera posible.
              </p>
              <div className="testimonio-autor">
                <strong>- Familia Rodríguez</strong>
              </div>
            </div>

            <div className="testimonio-destacado">
              <div className="comillas-grandes">"</div>
              <p className="testimonio-texto">
                Luna transformó nuestra casa en un hogar. Su ronroneo es la 
                mejor melodía que podemos escuchar. Estamos eternamente agradecidos.
              </p>
              <div className="testimonio-autor">
                <strong>- Familia Morales</strong>
              </div>
            </div>

            <div className="testimonio-destacado">
              <div className="comillas-grandes">"</div>
              <p className="testimonio-texto">
                Rocky llegó para quedarse en nuestros corazones. Es increíble 
                ver cómo un animal puede cambiar tu vida para mejor.
              </p>
              <div className="testimonio-autor">
                <strong>- Familia Gómez</strong>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-historias">
          <div className="cta-historias-content">
            <h2>¿Listo Para Escribir Tu Propia Historia?</h2>
            <p>Hay muchas mascotas esperando por su final feliz. Tú puedes ser parte de su historia.</p>
            <div className="cta-historias-buttons">
              <button className="cta-historias-btn primary" onClick={() => navigate("/mascotas")}>
                Ver Mascotas Disponibles
              </button>
              <button className="cta-historias-btn secondary" onClick={() => navigate("/info-mascotas")}>
                Proceso de Adopción
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default HistoriasExito;