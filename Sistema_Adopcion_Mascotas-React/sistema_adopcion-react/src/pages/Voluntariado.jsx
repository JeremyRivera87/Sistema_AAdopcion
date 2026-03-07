import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/Voluntariado.css";

const Voluntariado = () => {
  const navigate = useNavigate();
  const [paso, setPaso] = useState(1);
  const totalPasos = 4;

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [formData, setFormData] = useState({
    // Datos Personales
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    fecha_nacimiento: "",
    direccion: "",
    ciudad: "",

    // Información Académica/Profesional
    nivel_educacion: "",
    profesion_ocupacion: "",

    // Disponibilidad
    disponibilidad_dias: [],
    disponibilidad_horario: "",
    horas_semanales: "",

    // Experiencia
    experiencia_previa: false,
    detalle_experiencia: "",
    habilidades_especiales: "",

    // Áreas de Interés
    areas_interes: [],

    // Motivación
    por_que_voluntario: "",

    // Referencias
    tiene_referencias: false,
    nombre_referencia_1: "",
    telefono_referencia_1: "",
    nombre_referencia_2: "",
    telefono_referencia_2: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleCheckboxArray = (e, field) => {
    const { value, checked } = e.target;
    const currentArray = formData[field];

    if (checked) {
      setFormData({
        ...formData,
        [field]: [...currentArray, value]
      });
    } else {
      setFormData({
        ...formData,
        [field]: currentArray.filter(item => item !== value)
      });
    }
  };

  const validarPaso = () => {
    switch (paso) {
      case 1:
        if (!formData.nombre || !formData.cedula || !formData.email) {
          setAlert({
            isOpen: true,
            title: "Campos Incompletos",
            message: "Por favor completa todos los campos obligatorios",
            type: "warning"
          });
          return false;
        }
        break;
      case 2:
        if (formData.disponibilidad_dias.length === 0 || !formData.disponibilidad_horario) {
          setAlert({
            isOpen: true,
            title: "Campos Incompletos",
            message: "Por favor indica tu disponibilidad",
            type: "warning"
          });
          return false;
        }
        break;
      case 3:
        if (formData.areas_interes.length === 0) {
          setAlert({
            isOpen: true,
            title: "Campos Incompletos",
            message: "Por favor selecciona al menos un área de interés",
            type: "warning"
          });
          return false;
        }
        break;
      case 4:
        if (!formData.por_que_voluntario) {
          setAlert({
            isOpen: true,
            title: "Campos Incompletos",
            message: "Por favor cuéntanos por qué quieres ser voluntario",
            type: "warning"
          });
          return false;
        }
        break;
    }
    return true;
  };

  const siguientePaso = () => {
    if (validarPaso()) {
      setPaso(paso + 1);
      window.scrollTo(0, 0);
    }
  };

  const anteriorPaso = () => {
    setPaso(paso - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarPaso()) return;

    try {
      const response = await fetch("http://localhost:4000/api/voluntariado", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "¡Solicitud Enviada! 🎉",
          message: "Tu solicitud ha sido recibida. Te contactaremos pronto.",
          type: "success"
        });

        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setAlert({
          isOpen: true,
          title: "Error",
          message: "Hubo un problema al enviar tu solicitud",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "Error de conexión con el servidor",
        type: "error"
      });
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <div className="voluntariado-page">

      <main className="voluntariado-container">
        
          {/* Botón Regresar */}
        <div className="btn-regresar-container">
          <button className="btn-regresar-vol" onClick={() => navigate("/")}>
          ← Volver al Inicio
          </button>
        </div>
        {/* Hero */}
        <section className="hero-voluntariado">
          <h1>Únete Como Voluntario</h1>
          <p>Forma parte de nuestro equipo y ayuda a cambiar vidas</p>
        </section>

        {/* Información Previa */}
        <section className="info-voluntariado">
          <div className="info-content">
            <h2>¿Por qué ser voluntario?</h2>
            <div className="beneficios-grid">
              <div className="beneficio-item">
                <span className="beneficio-icon">❤️</span>
                <h3>Haz la Diferencia</h3>
                <p>Cambia vidas de animales necesitados</p>
              </div>
              <div className="beneficio-item">
                <span className="beneficio-icon">🤝</span>
                <h3>Conoce Personas</h3>
                <p>Únete a una comunidad apasionada</p>
              </div>
              <div className="beneficio-item">
                <span className="beneficio-icon">📚</span>
                <h3>Aprende</h3>
                <p>Desarrolla nuevas habilidades</p>
              </div>
              <div className="beneficio-item">
                <span className="beneficio-icon">😊</span>
                <h3>Satisfacción Personal</h3>
                <p>Experimenta la alegría de ayudar</p>
              </div>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section className="formulario-section">
          <div className="formulario-container">
            
            {/* Progreso */}
            <div className="progreso-container">
              <div className="progreso-bar">
                <div 
                  className="progreso-fill" 
                  style={{ width: `${(paso / totalPasos) * 100}%` }}
                ></div>
              </div>
              <p className="progreso-texto">Paso {paso} de {totalPasos}</p>
            </div>

            <form onSubmit={handleSubmit}>

              {/* PASO 1: Datos Personales */}
              {paso === 1 && (
                <div className="paso-content">
                  <h2>📋 Datos Personales</h2>
                  <p className="paso-descripcion">Cuéntanos quién eres</p>

                  <div className="form-grid">
                    <div className="form-group-vol">
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

                    <div className="form-group-vol">
                      <label>Cédula de Identidad *</label>
                      <input
                        type="text"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleChange}
                        placeholder="1234567890"
                        required
                      />
                    </div>

                    <div className="form-group-vol">
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

                    <div className="form-group-vol">
                      <label>Teléfono</label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="0999999999"
                      />
                    </div>

                    <div className="form-group-vol">
                      <label>Fecha de Nacimiento</label>
                      <input
                        type="date"
                        name="fecha_nacimiento"
                        value={formData.fecha_nacimiento}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group-vol">
                      <label>Ciudad</label>
                      <input
                        type="text"
                        name="ciudad"
                        value={formData.ciudad}
                        onChange={handleChange}
                        placeholder="Tu ciudad"
                      />
                    </div>

                    <div className="form-group-vol full-width">
                      <label>Dirección</label>
                      <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Calle, número, sector"
                      />
                    </div>

                    <div className="form-group-vol">
                      <label>Nivel de Educación</label>
                      <select
                        name="nivel_educacion"
                        value={formData.nivel_educacion}
                        onChange={handleChange}
                      >
                        <option value="">Selecciona...</option>
                        <option value="secundaria">Secundaria</option>
                        <option value="tecnico">Técnico</option>
                        <option value="universitario">Universitario</option>
                        <option value="postgrado">Postgrado</option>
                      </select>
                    </div>

                    <div className="form-group-vol">
                      <label>Profesión u Ocupación</label>
                      <input
                        type="text"
                        name="profesion_ocupacion"
                        value={formData.profesion_ocupacion}
                        onChange={handleChange}
                        placeholder="Estudiante, Ingeniero, etc."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 2: Disponibilidad */}
              {paso === 2 && (
                <div className="paso-content">
                  <h2>📅 Disponibilidad</h2>
                  <p className="paso-descripcion">¿Cuándo puedes ayudarnos?</p>

                  <div className="form-group-vol">
                    <label>Días Disponibles *</label>
                    <div className="checkbox-group">
                      {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(dia => (
                        <label key={dia} className="checkbox-label">
                          <input
                            type="checkbox"
                            value={dia}
                            checked={formData.disponibilidad_dias.includes(dia)}
                            onChange={(e) => handleCheckboxArray(e, 'disponibilidad_dias')}
                          />
                          <span>{dia}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="form-group-vol">
                    <label>Horario Preferido *</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="disponibilidad_horario"
                          value="Mañana (8am - 12pm)"
                          checked={formData.disponibilidad_horario === "Mañana (8am - 12pm)"}
                          onChange={handleChange}
                        />
                        <span>Mañana (8am - 12pm)</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="disponibilidad_horario"
                          value="Tarde (12pm - 6pm)"
                          checked={formData.disponibilidad_horario === "Tarde (12pm - 6pm)"}
                          onChange={handleChange}
                        />
                        <span>Tarde (12pm - 6pm)</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="disponibilidad_horario"
                          value="Noche (6pm - 9pm)"
                          checked={formData.disponibilidad_horario === "Noche (6pm - 9pm)"}
                          onChange={handleChange}
                        />
                        <span>Noche (6pm - 9pm)</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="disponibilidad_horario"
                          value="Flexible"
                          checked={formData.disponibilidad_horario === "Flexible"}
                          onChange={handleChange}
                        />
                        <span>Flexible</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-group-vol">
                    <label>Horas Semanales que Puedes Dedicar</label>
                    <select
                      name="horas_semanales"
                      value={formData.horas_semanales}
                      onChange={handleChange}
                    >
                      <option value="">Selecciona...</option>
                      <option value="2-4 horas">2-4 horas</option>
                      <option value="4-8 horas">4-8 horas</option>
                      <option value="8-12 horas">8-12 horas</option>
                      <option value="Más de 12 horas">Más de 12 horas</option>
                    </select>
                  </div>
                </div>
              )}

              {/* PASO 3: Experiencia y Áreas de Interés */}
              {paso === 3 && (
                <div className="paso-content">
                  <h2>🌟 Experiencia y Áreas de Interés</h2>
                  <p className="paso-descripcion">¿En qué te gustaría ayudar?</p>

                  <div className="form-group-vol">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="experiencia_previa"
                        checked={formData.experiencia_previa}
                        onChange={handleChange}
                      />
                      <span>Tengo experiencia previa con animales</span>
                    </label>
                  </div>

                  {formData.experiencia_previa && (
                    <div className="form-group-vol">
                      <label>Cuéntanos sobre tu experiencia</label>
                      <textarea
                        name="detalle_experiencia"
                        value={formData.detalle_experiencia}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Describe tu experiencia trabajando con animales..."
                      ></textarea>
                    </div>
                  )}

                  <div className="form-group-vol">
                    <label>Habilidades Especiales</label>
                    <textarea
                      name="habilidades_especiales"
                      value={formData.habilidades_especiales}
                      onChange={handleChange}
                      rows="3"
                      placeholder="Ej: Fotografía, diseño gráfico, veterinaria, redes sociales, construcción, etc."
                    ></textarea>
                  </div>

                  <div className="form-group-vol">
                    <label>Áreas de Interés *</label>
                    <div className="checkbox-group">
                      {[
                        "Cuidado de Animales",
                        "Limpieza y Mantenimiento",
                        "Paseos y Socialización",
                        "Eventos de Adopción",
                        "Recaudación de Fondos",
                        "Redes Sociales y Marketing",
                        "Fotografía",
                        "Transporte de Animales",
                        "Educación y Talleres",
                        "Administración"
                      ].map(area => (
                        <label key={area} className="checkbox-label">
                          <input
                            type="checkbox"
                            value={area}
                            checked={formData.areas_interes.includes(area)}
                            onChange={(e) => handleCheckboxArray(e, 'areas_interes')}
                          />
                          <span>{area}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 4: Motivación y Referencias */}
              {paso === 4 && (
                <div className="paso-content">
                  <h2>💭 Motivación y Referencias</h2>
                  <p className="paso-descripcion">Última información</p>

                  <div className="form-group-vol">
                    <label>¿Por qué quieres ser voluntario en Animal Home? *</label>
                    <textarea
                      name="por_que_voluntario"
                      value={formData.por_que_voluntario}
                      onChange={handleChange}
                      rows="5"
                      placeholder="Cuéntanos tu motivación para unirte a nuestro equipo..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-group-vol">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        name="tiene_referencias"
                        checked={formData.tiene_referencias}
                        onChange={handleChange}
                      />
                      <span>Puedo proporcionar referencias personales</span>
                    </label>
                  </div>

                  {formData.tiene_referencias && (
                    <>
                      <div className="referencias-section">
                        <h3>Referencia Personal 1</h3>
                        <div className="form-grid">
                          <div className="form-group-vol">
                            <label>Nombre Completo</label>
                            <input
                              type="text"
                              name="nombre_referencia_1"
                              value={formData.nombre_referencia_1}
                              onChange={handleChange}
                              placeholder="Nombre de la referencia"
                            />
                          </div>
                          <div className="form-group-vol">
                            <label>Teléfono</label>
                            <input
                              type="tel"
                              name="telefono_referencia_1"
                              value={formData.telefono_referencia_1}
                              onChange={handleChange}
                              placeholder="0999999999"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="referencias-section">
                        <h3>Referencia Personal 2</h3>
                        <div className="form-grid">
                          <div className="form-group-vol">
                            <label>Nombre Completo</label>
                            <input
                              type="text"
                              name="nombre_referencia_2"
                              value={formData.nombre_referencia_2}
                              onChange={handleChange}
                              placeholder="Nombre de la referencia"
                            />
                          </div>
                          <div className="form-group-vol">
                            <label>Teléfono</label>
                            <input
                              type="tel"
                              name="telefono_referencia_2"
                              value={formData.telefono_referencia_2}
                              onChange={handleChange}
                              placeholder="0999999999"
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Botones de Navegación */}
              <div className="form-navigation">
                {paso > 1 && (
                  <button type="button" className="btn-anterior" onClick={anteriorPaso}>
                    ← Anterior
                  </button>
                )}
                
                {paso < totalPasos ? (
                  <button type="button" className="btn-siguiente" onClick={siguientePaso}>
                    Siguiente →
                  </button>
                ) : (
                  <button type="submit" className="btn-enviar">
                    Enviar Solicitud 🚀
                  </button>
                )}
              </div>

            </form>
          </div>
        </section>

      </main>

      <CustomAlert
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
    </div>
  );
};

export default Voluntariado;