import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomAlert from "../components/CustomAlert";
import "../styles/Apadrina.css";

const Apadrina = () => {
  const navigate = useNavigate();
  const [mascotaSeleccionada, setMascotaSeleccionada] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    monto_mensual: "10",
    mensaje: ""
  });

  // Mascotas disponibles para apadrinamiento
  const mascotasApadrinamiento = [
    {
      id: 1,
      nombre: "Pelusa",
      tipo: "Gato",
      edad: "8 años",
      historia: "Pelusa es una gatita mayor que necesita tratamiento médico continuo para su artritis. Es muy cariñosa y tranquila.",
      necesidad: "Medicamentos mensuales y controles veterinarios",
      emoji: "🐱",
      color: "#a78bfa",
      padrinos: 3
    },
    {
      id: 2,
      nombre: "Thor",
      tipo: "Perro",
      edad: "10 años",
      historia: "Thor es un perro adulto mayor rescatado de la calle. Tiene problemas de cadera y requiere cuidados especiales.",
      necesidad: "Alimento especial y terapia física",
      emoji: "🐕",
      color: "#fbbf24",
      padrinos: 5
    },
    {
      id: 3,
      nombre: "Copito",
      tipo: "Gato",
      edad: "3 años",
      historia: "Copito quedó ciego después de una infección. Es juguetón y adaptado a su condición, pero requiere cuidados continuos.",
      necesidad: "Controles oftalmológicos y alimentación",
      emoji: "🐈‍⬛",
      color: "#60a5fa",
      padrinos: 2
    },
    {
      id: 4,
      nombre: "Manchitas",
      tipo: "Perro",
      edad: "6 años",
      historia: "Manchitas fue rescatado con una pata fracturada. Aunque ya sanó, necesita seguimiento veterinario regular.",
      necesidad: "Revisiones médicas y alimentación",
      emoji: "🐕‍🦺",
      color: "#34d399",
      padrinos: 4
    },
    {
      id: 5,
      nombre: "Mimi",
      tipo: "Gato",
      edad: "12 años",
      historia: "Mimi es la abuelita del refugio. Tiene problemas renales y necesita medicación diaria y dieta especial.",
      necesidad: "Medicamentos y alimento terapéutico",
      emoji: "😺",
      color: "#f472b6",
      padrinos: 6
    },
    {
      id: 6,
      nombre: "Rex",
      tipo: "Perro",
      edad: "7 años",
      historia: "Rex tiene problemas de piel crónicos que requieren tratamiento continuo. Es un perro muy noble y paciente.",
      necesidad: "Tratamiento dermatológico mensual",
      emoji: "🦮",
      color: "#fb923c",
      padrinos: 3
    }
  ];

  const abrirModal = (mascota) => {
    setMascotaSeleccionada(mascota);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setMascotaSeleccionada(null);
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      monto_mensual: "10",
      mensaje: ""
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.email || !formData.telefono) {
      setAlert({
        isOpen: true,
        title: "Campos Incompletos",
        message: "Por favor completa todos los campos obligatorios",
        type: "warning"
      });
      return;
    }

    // Aquí iría la lógica para guardar el apadrinamiento en la BD
    console.log("Apadrinamiento:", {
      mascota: mascotaSeleccionada.nombre,
      ...formData
    });

    setAlert({
      isOpen: true,
      title: "¡Gracias por Apadrinar! 💚",
      message: `Tu apadrinamiento de ${mascotaSeleccionada.nombre} ha sido registrado. Te contactaremos pronto con los detalles.`,
      type: "success"
    });

    setTimeout(() => {
      cerrarModal();
    }, 2000);
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <div className="apadrina-page">
      <Navbar />
      
      <main className="apadrina-container">
        
        {/* Hero Section */}
        <section className="hero-apadrina">
          <div className="hero-apadrina-content">
            <h1>Apadrina una Mascota</h1>
            <p className="hero-apadrina-subtitle">
              Apoya a un animal necesitado con una contribución mensual y sé parte de su historia
            </p>
          </div>
        </section>

        {/* ¿Qué es Apadrinar? */}
        <section className="que-es-apadrinar">
          <div className="que-es-content">
            <h2>¿Qué Significa Apadrinar una Mascota?</h2>
            <div className="que-es-line"></div>
            <p className="que-es-descripcion">
              Apadrinar una mascota es una forma especial de ayudar a los animales que, por diversas razones, 
              necesitan cuidados continuos pero no pueden ser adoptados inmediatamente. Con tu aporte mensual, 
              garantizas que reciban la atención médica, alimentación y amor que merecen mientras permanecen en nuestro refugio.
            </p>

            <div className="beneficios-apadrinar-grid">
              <div className="beneficio-apadrinar">
                <div className="beneficio-icono">💰</div>
                <h3>Apoyo Mensual</h3>
                <p>Tu contribución recurrente garantiza los cuidados continuos que necesitan</p>
              </div>

              <div className="beneficio-apadrinar">
                <div className="beneficio-icono">📸</div>
                <h3>Actualizaciones</h3>
                <p>Recibe fotos y reportes mensuales sobre el progreso de tu ahijado</p>
              </div>

              <div className="beneficio-apadrinar">
                <div className="beneficio-icono">🏥</div>
                <h3>Cuidado Garantizado</h3>
                <p>Aseguras que reciban tratamiento médico, alimentación y bienestar</p>
              </div>

              <div className="beneficio-apadrinar">
                <div className="beneficio-icono">❤️</div>
                <h3>Vínculo Especial</h3>
                <p>Creas una conexión única con tu mascota apadrinada</p>
              </div>

              <div className="beneficio-apadrinar">
                <div className="beneficio-icono">🎁</div>
                <h3>Visitas</h3>
                <p>Puedes visitarlos en el refugio cuando quieras</p>
              </div>

              <div className="beneficio-apadrinar">
                <div className="beneficio-icono">🌟</div>
                <h3>Certificado</h3>
                <p>Recibes un certificado de apadrinamiento personalizado</p>
              </div>
            </div>
          </div>
        </section>

        {/* Planes de Apadrinamiento */}
        <section className="planes-apadrinamiento">
          <h2>Planes de Apadrinamiento</h2>
          <p className="planes-subtitle">Elige el plan que mejor se ajuste a tus posibilidades</p>

          <div className="planes-grid">
            <div className="plan-card basico">
              <div className="plan-header">
                <h3>Plan Básico</h3>
                <div className="plan-precio">
                  <span className="precio">$10</span>
                  <span className="periodo">/mes</span>
                </div>
              </div>
              <ul className="plan-beneficios">
                <li>✓ Alimento de calidad</li>
                <li>✓ Actualización mensual por email</li>
                <li>✓ Certificado digital</li>
                <li>✓ Visitas al refugio</li>
              </ul>
            </div>

            <div className="plan-card estandar destacado">
              <div className="plan-badge">Más Popular</div>
              <div className="plan-header">
                <h3>Plan Estándar</h3>
                <div className="plan-precio">
                  <span className="precio">$25</span>
                  <span className="periodo">/mes</span>
                </div>
              </div>
              <ul className="plan-beneficios">
                <li>✓ Todo lo del Plan Básico</li>
                <li>✓ Atención veterinaria básica</li>
                <li>✓ Fotos mensuales</li>
                <li>✓ Certificado físico personalizado</li>
              </ul>
            </div>

            <div className="plan-card premium">
              <div className="plan-header">
                <h3>Plan Premium</h3>
                <div className="plan-precio">
                  <span className="precio">$50</span>
                  <span className="periodo">/mes</span>
                </div>
              </div>
              <ul className="plan-beneficios">
                <li>✓ Todo lo del Plan Estándar</li>
                <li>✓ Tratamientos médicos especializados</li>
                <li>✓ Video llamadas mensuales</li>
                <li>✓ Kit de bienvenida con foto enmarcada</li>
                <li>✓ Mención en redes sociales</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Mascotas Disponibles */}
        <section className="mascotas-apadrinamiento">
          <h2>Mascotas Esperando un Padrino</h2>
          <p className="mascotas-subtitle">Conoce a los animales que necesitan tu apoyo</p>

          <div className="mascotas-apadrina-grid">
            {mascotasApadrinamiento.map((mascota) => (
              <div key={mascota.id} className="mascota-apadrina-card">
                <div className="mascota-apadrina-header" style={{ backgroundColor: mascota.color }}>
                  <div className="mascota-apadrina-emoji">{mascota.emoji}</div>
                  <div className="mascota-apadrina-badge">{mascota.tipo}</div>
                </div>

                <div className="mascota-apadrina-content">
                  <div className="mascota-apadrina-info-header">
                    <h3>{mascota.nombre}</h3>
                    <span className="mascota-edad">{mascota.edad}</span>
                  </div>

                  <p className="mascota-historia">{mascota.historia}</p>

                  <div className="mascota-necesidad">
                    <strong>Necesita:</strong> {mascota.necesidad}
                  </div>

                  <div className="mascota-padrinos">
                    <span className="padrinos-icon">👥</span>
                    <span>{mascota.padrinos} {mascota.padrinos === 1 ? 'padrino' : 'padrinos'} actualmente</span>
                  </div>

                  <button 
                    className="btn-apadrinar"
                    onClick={() => abrirModal(mascota)}
                  >
                    Apadrinar a {mascota.nombre}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonios de Padrinos */}
        <section className="testimonios-padrinos">
          <h2>Lo Que Dicen Nuestros Padrinos</h2>

          <div className="testimonios-padrinos-grid">
            <div className="testimonio-padrino">
              <div className="comillas-padrino">"</div>
              <p>Apadrinar a Mimi ha sido una experiencia maravillosa. Recibo fotos cada mes y sé que mi aporte está ayudando a que tenga una vida digna. ¡La visitamos cada fin de semana!</p>
              <div className="autor-padrino">
                <strong>- Carmen López</strong>
                <span>Madrina de Mimi</span>
              </div>
            </div>

            <div className="testimonio-padrino">
              <div className="comillas-padrino">"</div>
              <p>No podía adoptar por mi estilo de vida, pero apadrinar a Thor me permite ayudar. Es reconfortante saber que está bien cuidado gracias a mi contribución.</p>
              <div className="autor-padrino">
                <strong>- Roberto Díaz</strong>
                <span>Padrino de Thor</span>
              </div>
            </div>

            <div className="testimonio-padrino">
              <div className="comillas-padrino">"</div>
              <p>Mis hijos están emocionados cada vez que recibimos actualizaciones de Copito. Es una forma hermosa de enseñarles sobre responsabilidad y amor por los animales.</p>
              <div className="autor-padrino">
                <strong>- María Fernández</strong>
                <span>Madrina de Copito</span>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-apadrina">
          <div className="cta-apadrina-content">
            <h2>Cambia una Vida Hoy</h2>
            <p>Cada apadrinamiento marca la diferencia. Únete a nuestra familia de padrinos.</p>
            <button className="btn-cta-apadrina" onClick={() => window.scrollTo({ top: document.querySelector('.mascotas-apadrinamiento').offsetTop - 100, behavior: 'smooth' })}>
              Ver Mascotas Disponibles
            </button>
          </div>
        </section>

      </main>

      {/* Modal de Apadrinamiento */}
      {modalAbierto && mascotaSeleccionada && (
        <div className="modal-apadrina-overlay" onClick={cerrarModal}>
          <div className="modal-apadrina-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-apadrina-header">
              <h2>Apadrinar a {mascotaSeleccionada.nombre}</h2>
              <button className="btn-cerrar-apadrina" onClick={cerrarModal}>✕</button>
            </div>

            <div className="modal-apadrina-body">
              <div className="mascota-modal-info">
                <div className="mascota-modal-emoji" style={{ backgroundColor: mascotaSeleccionada.color }}>
                  {mascotaSeleccionada.emoji}
                </div>
                <div>
                  <h3>{mascotaSeleccionada.nombre}</h3>
                  <p>{mascotaSeleccionada.tipo} • {mascotaSeleccionada.edad}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="form-apadrinamiento">
                <div className="form-group-apadrina">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="form-group-apadrina">
                  <label>Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-group-apadrina">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="0999999999"
                    required
                  />
                </div>

                <div className="form-group-apadrina">
                  <label>Aporte Mensual *</label>
                  <select
                    name="monto_mensual"
                    value={formData.monto_mensual}
                    onChange={handleChange}
                    required
                  >
                    <option value="10">$10 - Plan Básico</option>
                    <option value="25">$25 - Plan Estándar</option>
                    <option value="50">$50 - Plan Premium</option>
                    <option value="otro">Otro monto</option>
                  </select>
                </div>

                <div className="form-group-apadrina">
                  <label>Mensaje para {mascotaSeleccionada.nombre} (opcional)</label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Escribe un mensaje para tu ahijado..."
                  ></textarea>
                </div>

                <div className="modal-apadrina-footer">
                  <button type="button" className="btn-cancelar-apadrina" onClick={cerrarModal}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn-confirmar-apadrina">
                    Confirmar Apadrinamiento
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <CustomAlert
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />

      <Footer />
    </div>
  );
};

export default Apadrina;