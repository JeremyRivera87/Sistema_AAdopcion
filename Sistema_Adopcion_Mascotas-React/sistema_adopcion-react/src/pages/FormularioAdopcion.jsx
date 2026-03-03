import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/FormularioAdopcion.css";

const FormularioAdopcion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [paso, setPaso] = useState(1);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [form, setForm] = useState({
    // DATOS PERSONALES
    nombre_completo: "",
    cedula: "",
    fecha_nacimiento: "",
    estado_civil: "",
    ocupacion: "",
    email: "",
    telefono_celular: "",
    telefono_fijo: "",
    
    // DIRECCIÓN
    provincia: "",
    ciudad: "",
    sector: "",
    direccion_completa: "",
    referencia_direccion: "",
    
    // VIVIENDA
    tipo_vivienda: "",
    vivienda_es: "",
    tamaño_vivienda: "",
    tiene_jardin: false,
    tamaño_jardin: "",
    tiene_patio: false,
    esta_cerrado: false,
    altura_cerca: "",
    
    // FAMILIA
    vive_solo: false,
    numero_adultos: 0,
    numero_niños: 0,
    edades_niños: "",
    todos_acuerdo: false,
    quien_se_opone: "",
    
    // MASCOTAS ACTUALES
    tiene_mascotas_actuales: false,
    numero_perros: 0,
    numero_gatos: 0,
    otras_mascotas: "",
    detalles_mascotas: "",
    mascotas_esterilizadas: false,
    mascotas_vacunadas: false,
    
    // EXPERIENCIA
    ha_tenido_mascotas: false,
    que_paso_mascotas_anteriores: "",
    experiencia_con_especie: false,
    descripcion_experiencia: "",
    
    // MOTIVACIÓN
    motivo_adopcion: "",
    que_busca_mascota: "",
    caracteristicas_deseadas: "",
    esta_dispuesto_gastos: false,
    presupuesto_mensual: "",
    
    // CUIDADOS
    quien_cuidara: "",
    horas_solo_diarias: "",
    donde_estara_mascota: "",
    donde_dormira: "",
    
    // SITUACIONES
    que_haria_si_viaja: "",
    que_haria_si_enferma: "",
    que_haria_si_problemas_conducta: "",
    dispuesto_entrenamiento: false,
    dispuesto_seguimiento: false,
    
    // VETERINARIO
    tiene_veterinario: false,
    nombre_veterinario: "",
    telefono_veterinario: "",
    
    // REFERENCIAS
    referencia1_nombre: "",
    referencia1_telefono: "",
    referencia1_relacion: "",
    referencia2_nombre: "",
    referencia2_telefono: "",
    referencia2_relacion: "",
    
    // DOCUMENTOS
    cedula_file: null,
    servicio_basico_file: null,
    foto_vivienda_file: null,
    foto_jardin_file: null,
    
    // TÉRMINOS
    acepta_visita_domiciliaria: false,
    acepta_seguimiento: false,
    acepta_terminos: false
  });

  // Cargar mascota y usuario
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Verificar sesión
        const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
        if (!usuarioLocal) {
          setAlert({
            isOpen: true,
            title: "Sesión requerida",
            message: "Debes iniciar sesión para adoptar una mascota",
            type: "warning"
          });
          return;
        }
        setUsuario(usuarioLocal);

        // Prellenar datos del usuario
        setForm(prev => ({
          ...prev,
          nombre_completo: usuarioLocal.nombre || "",
          email: usuarioLocal.email || ""
        }));

        // Cargar datos de la mascota
        const response = await fetch(`http://localhost:4000/api/mascotas/${id}`);
        if (response.ok) {
          const data = await response.json();
          setMascota(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    cargarDatos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Agregar todos los campos del formulario
      formData.append("usuario_id", usuario.id);
      formData.append("mascota_id", id);
      
      Object.keys(form).forEach(key => {
        if (key.endsWith('_file')) {
          const fileName = key.replace('_file', '');
          if (form[key]) {
            formData.append(fileName, form[key]);
          }
        } else {
          formData.append(key, form[key]);
        }
      });

      const response = await fetch("http://localhost:4000/api/solicitudes", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "¡Solicitud Enviada!",
          message: "Tu solicitud de adopción ha sido recibida. Nos pondremos en contacto contigo pronto.",
          type: "success"
        });
      } else {
        const error = await response.json();
        setAlert({
          isOpen: true,
          title: "Error",
          message: error.message || "No se pudo enviar la solicitud",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        isOpen: true,
        title: "Error de conexión",
        message: "No se pudo conectar con el servidor",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
    
    if (alert.type === "success") {
      navigate("/");
    } else if (alert.type === "warning" && alert.title === "Sesión requerida") {
      navigate("/login");
    }
  };

  const siguientePaso = () => {
    setPaso(paso + 1);
    window.scrollTo(0, 0);
  };

  const pasoAnterior = () => {
    setPaso(paso - 1);
    window.scrollTo(0, 0);
  };

  if (!mascota) {
    return <div className="loading-form">Cargando...</div>;
  }

  return (
    <div className="formulario-adopcion-page">
      
      {/* Header con info de la mascota */}
      <div className="form-header">
        <button className="btn-volver" onClick={() => navigate(`/mascota/${id}`)}>
          ← Volver
        </button>
        <h1>Solicitud de Adopción</h1>
        <div className="mascota-info-header">
          <img 
            src={mascota.foto_url ? `http://localhost:4000${mascota.foto_url}` : "https://via.placeholder.com/100"}
            alt={mascota.nombre}
          />
          <div>
            <h3>{mascota.nombre}</h3>
            <p>{mascota.especie} • {mascota.edad}</p>
          </div>
        </div>
      </div>

      {/* Indicador de pasos */}
      <div className="pasos-indicador">
        <div className={`paso-item ${paso >= 1 ? 'activo' : ''} ${paso > 1 ? 'completado' : ''}`}>
          <span className="paso-numero">1</span>
          <span className="paso-label">Datos Personales</span>
        </div>
        <div className={`paso-item ${paso >= 2 ? 'activo' : ''} ${paso > 2 ? 'completado' : ''}`}>
          <span className="paso-numero">2</span>
          <span className="paso-label">Vivienda</span>
        </div>
        <div className={`paso-item ${paso >= 3 ? 'activo' : ''} ${paso > 3 ? 'completado' : ''}`}>
          <span className="paso-numero">3</span>
          <span className="paso-label">Familia y Mascotas</span>
        </div>
        <div className={`paso-item ${paso >= 4 ? 'activo' : ''} ${paso > 4 ? 'completado' : ''}`}>
          <span className="paso-numero">4</span>
          <span className="paso-label">Motivación</span>
        </div>
        <div className={`paso-item ${paso >= 5 ? 'activo' : ''} ${paso > 5 ? 'completado' : ''}`}>
          <span className="paso-numero">5</span>
          <span className="paso-label">Cuidados</span>
        </div>
        <div className={`paso-item ${paso >= 6 ? 'activo' : ''}`}>
          <span className="paso-numero">6</span>
          <span className="paso-label">Documentos</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="formulario-adopcion">

{/* PASO 1: DATOS PERSONALES */}
        {paso === 1 && (
          <div className="paso-content">
            <h2>📋 Datos Personales</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Nombre Completo *</label>
                <input
                  type="text"
                  name="nombre_completo"
                  value={form.nombre_completo}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Cédula de Identidad *</label>
                <input
                  type="text"
                  name="cedula"
                  value={form.cedula}
                  onChange={handleChange}
                  placeholder="1234567890"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Fecha de Nacimiento *</label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={form.fecha_nacimiento}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Estado Civil *</label>
                <select
                  name="estado_civil"
                  value={form.estado_civil}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="soltero">Soltero/a</option>
                  <option value="casado">Casado/a</option>
                  <option value="divorciado">Divorciado/a</option>
                  <option value="viudo">Viudo/a</option>
                  <option value="union_libre">Unión Libre</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ocupación *</label>
                <input
                  type="text"
                  name="ocupacion"
                  value={form.ocupacion}
                  onChange={handleChange}
                  placeholder="Ingeniero, Estudiante, etc."
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Teléfono Celular *</label>
                <input
                  type="tel"
                  name="telefono_celular"
                  value={form.telefono_celular}
                  onChange={handleChange}
                  placeholder="0991234567"
                  required
                />
              </div>

              <div className="form-group">
                <label>Teléfono Fijo (opcional)</label>
                <input
                  type="tel"
                  name="telefono_fijo"
                  value={form.telefono_fijo}
                  onChange={handleChange}
                  placeholder="022345678"
                />
              </div>
            </div>

            <h3>📍 Dirección</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Provincia *</label>
                <select
                  name="provincia"
                  value={form.provincia}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Pichincha">Pichincha</option>
                  <option value="Guayas">Guayas</option>
                  <option value="Azuay">Azuay</option>
                  <option value="Manabí">Manabí</option>
                  <option value="El Oro">El Oro</option>
                  <option value="Los Ríos">Los Ríos</option>
                  <option value="Imbabura">Imbabura</option>
                  <option value="Tungurahua">Tungurahua</option>
                  <option value="Esmeraldas">Esmeraldas</option>
                  <option value="Santo Domingo">Santo Domingo de los Tsáchilas</option>
                  <option value="Otra">Otra</option>
                </select>
              </div>

              <div className="form-group">
                <label>Ciudad *</label>
                <input
                  type="text"
                  name="ciudad"
                  value={form.ciudad}
                  onChange={handleChange}
                  placeholder="Quito, Guayaquil, etc."
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Sector *</label>
              <input
                type="text"
                name="sector"
                value={form.sector}
                onChange={handleChange}
                placeholder="La Carolina, Kennedy, etc."
                required
              />
            </div>

            <div className="form-group">
              <label>Dirección Completa *</label>
              <textarea
                name="direccion_completa"
                value={form.direccion_completa}
                onChange={handleChange}
                placeholder="Calle principal, número de casa, intersecciones..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>Referencia de Dirección</label>
              <input
                type="text"
                name="referencia_direccion"
                value={form.referencia_direccion}
                onChange={handleChange}
                placeholder="Cerca del parque, frente al supermercado..."
              />
            </div>

            <div className="form-actions">
              <button type="button" className="btn-siguiente" onClick={siguientePaso}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* PASO 2: VIVIENDA */}
        {paso === 2 && (
          <div className="paso-content">
            <h2>🏠 Información de Vivienda</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Tipo de Vivienda *</label>
                <select
                  name="tipo_vivienda"
                  value={form.tipo_vivienda}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="casa">Casa</option>
                  <option value="departamento">Departamento</option>
                  <option value="quinta">Quinta</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="form-group">
                <label>La vivienda es *</label>
                <select
                  name="vivienda_es"
                  value={form.vivienda_es}
                  onChange={handleChange}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="propia">Propia</option>
                  <option value="arrendada">Arrendada</option>
                  <option value="familiar">Familiar</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Tamaño de la vivienda *</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="tamaño_vivienda"
                    value="pequeña"
                    checked={form.tamaño_vivienda === "pequeña"}
                    onChange={handleChange}
                  />
                  Pequeña (menos de 80m²)
                </label>
                <label>
                  <input
                    type="radio"
                    name="tamaño_vivienda"
                    value="mediana"
                    checked={form.tamaño_vivienda === "mediana"}
                    onChange={handleChange}
                  />
                  Mediana (80-150m²)
                </label>
                <label>
                  <input
                    type="radio"
                    name="tamaño_vivienda"
                    value="grande"
                    checked={form.tamaño_vivienda === "grande"}
                    onChange={handleChange}
                  />
                  Grande (más de 150m²)
                </label>
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="tiene_jardin"
                  checked={form.tiene_jardin}
                  onChange={handleChange}
                />
                ¿Tiene jardín?
              </label>
            </div>

            {form.tiene_jardin && (
              <div className="form-group">
                <label>Tamaño del jardín</label>
                <select
                  name="tamaño_jardin"
                  value={form.tamaño_jardin}
                  onChange={handleChange}
                >
                  <option value="">Seleccione...</option>
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
            )}

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="tiene_patio"
                  checked={form.tiene_patio}
                  onChange={handleChange}
                />
                ¿Tiene patio?
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="esta_cerrado"
                  checked={form.esta_cerrado}
                  onChange={handleChange}
                />
                ¿El patio/jardín está completamente cerrado?
              </label>
            </div>

            {form.esta_cerrado && (
              <div className="form-group">
                <label>Altura aproximada de la cerca</label>
                <input
                  type="text"
                  name="altura_cerca"
                  value={form.altura_cerca}
                  onChange={handleChange}
                  placeholder="Ej: 1.5 metros, 2 metros"
                />
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-anterior" onClick={pasoAnterior}>
                ← Anterior
              </button>
              <button type="button" className="btn-siguiente" onClick={siguientePaso}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* PASO 3: FAMILIA Y MASCOTAS */}
        {paso === 3 && (
          <div className="paso-content">
            <h2>👨‍👩‍👧‍👦 Composición Familiar</h2>
            
            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="vive_solo"
                  checked={form.vive_solo}
                  onChange={handleChange}
                />
                ¿Vive solo/a?
              </label>
            </div>

            {!form.vive_solo && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Número de adultos en el hogar</label>
                    <input
                      type="number"
                      name="numero_adultos"
                      value={form.numero_adultos}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Número de niños en el hogar</label>
                    <input
                      type="number"
                      name="numero_niños"
                      value={form.numero_niños}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                {form.numero_niños > 0 && (
                  <div className="form-group">
                    <label>Edades de los niños</label>
                    <input
                      type="text"
                      name="edades_niños"
                      value={form.edades_niños}
                      onChange={handleChange}
                      placeholder="Ej: 5, 8, 12 años"
                    />
                  </div>
                )}

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="todos_acuerdo"
                      checked={form.todos_acuerdo}
                      onChange={handleChange}
                    />
                    ¿Todos los miembros de la familia están de acuerdo con la adopción?
                  </label>
                </div>

                {!form.todos_acuerdo && (
                  <div className="form-group">
                    <label>¿Quién se opone y por qué?</label>
                    <textarea
                      name="quien_se_opone"
                      value={form.quien_se_opone}
                      onChange={handleChange}
                      rows="3"
                    ></textarea>
                  </div>
                )}
              </>
            )}

            <h3>🐾 Mascotas Actuales</h3>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="tiene_mascotas_actuales"
                  checked={form.tiene_mascotas_actuales}
                  onChange={handleChange}
                />
                ¿Tiene mascotas actualmente?
              </label>
            </div>

            {form.tiene_mascotas_actuales && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Número de perros</label>
                    <input
                      type="number"
                      name="numero_perros"
                      value={form.numero_perros}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>

                  <div className="form-group">
                    <label>Número de gatos</label>
                    <input
                      type="number"
                      name="numero_gatos"
                      value={form.numero_gatos}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Otras mascotas</label>
                  <input
                    type="text"
                    name="otras_mascotas"
                    value={form.otras_mascotas}
                    onChange={handleChange}
                    placeholder="Ej: Conejos, aves, etc."
                  />
                </div>

                <div className="form-group">
                  <label>Detalles de las mascotas (razas, edades, sexo)</label>
                  <textarea
                    name="detalles_mascotas"
                    value={form.detalles_mascotas}
                    onChange={handleChange}
                    rows="3"
                  ></textarea>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="mascotas_esterilizadas"
                      checked={form.mascotas_esterilizadas}
                      onChange={handleChange}
                    />
                    ¿Sus mascotas están esterilizadas?
                  </label>
                </div>

                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="mascotas_vacunadas"
                      checked={form.mascotas_vacunadas}
                      onChange={handleChange}
                    />
                    ¿Sus mascotas están al día con vacunas?
                  </label>
                </div>
              </>
            )}

            <h3>📚 Experiencia Previa</h3>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="ha_tenido_mascotas"
                  checked={form.ha_tenido_mascotas}
                  onChange={handleChange}
                />
                ¿Ha tenido mascotas anteriormente?
              </label>
            </div>

            {form.ha_tenido_mascotas && (
              <div className="form-group">
                <label>¿Qué pasó con sus mascotas anteriores? *</label>
                <textarea
                  name="que_paso_mascotas_anteriores"
                  value={form.que_paso_mascotas_anteriores}
                  onChange={handleChange}
                  placeholder="Ej: Falleció de vejez, se perdió, se regaló..."
                  rows="3"
                  required
                ></textarea>
              </div>
            )}

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="experiencia_con_especie"
                  checked={form.experiencia_con_especie}
                  onChange={handleChange}
                />
                ¿Tiene experiencia con {mascota.especie}s?
              </label>
            </div>

            {form.experiencia_con_especie && (
              <div className="form-group">
                <label>Describa su experiencia</label>
                <textarea
                  name="descripcion_experiencia"
                  value={form.descripcion_experiencia}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
            )}

            <div className="form-actions">
              <button type="button" className="btn-anterior" onClick={pasoAnterior}>
                ← Anterior
              </button>
              <button type="button" className="btn-siguiente" onClick={siguientePaso}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* PASO 4: MOTIVACIÓN */}
        {paso === 4 && (
          <div className="paso-content">
            <h2>💭 Motivación para Adoptar</h2>
            
            <div className="form-group">
              <label>¿Por qué desea adoptar a {mascota.nombre}? *</label>
              <textarea
                name="motivo_adopcion"
                value={form.motivo_adopcion}
                onChange={handleChange}
                placeholder="Explique sus razones para adoptar..."
                rows="4"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>¿Qué busca en una mascota? *</label>
              <textarea
                name="que_busca_mascota"
                value={form.que_busca_mascota}
                onChange={handleChange}
                placeholder="Compañía, protección, para los niños, etc."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>¿Qué características considera importantes?</label>
              <textarea
                name="caracteristicas_deseadas"
                value={form.caracteristicas_deseadas}
                onChange={handleChange}
                placeholder="Tamaño, nivel de energía, comportamiento..."
                rows="3"
              ></textarea>
            </div>

            <h3>💰 Responsabilidad Económica</h3>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="esta_dispuesto_gastos"
                  checked={form.esta_dispuesto_gastos}
                  onChange={handleChange}
                  required
                />
                ¿Está dispuesto/a a asumir los gastos de alimentación, veterinario, vacunas y cuidados? *
              </label>
            </div>

            <div className="form-group">
              <label>Presupuesto mensual aproximado para la mascota *</label>
              <select
                name="presupuesto_mensual"
                value={form.presupuesto_mensual}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="30-50">$30 - $50</option>
                <option value="50-100">$50 - $100</option>
                <option value="100-150">$100 - $150</option>
                <option value="150+">Más de $150</option>
              </select>
              <small>Incluye: comida, veterinario, accesorios, emergencias</small>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-anterior" onClick={pasoAnterior}>
                ← Anterior
              </button>
              <button type="button" className="btn-siguiente" onClick={siguientePaso}>
                Siguiente →
              </button>
            </div>
          </div>
        )}
{/* PASO 5: CUIDADOS Y SITUACIONES */}
        {paso === 5 && (
          <div className="paso-content">
            <h2>🏥 Cuidados y Responsabilidades</h2>
            
            <div className="form-group">
              <label>¿Quién será el principal responsable del cuidado de {mascota.nombre}? *</label>
              <input
                type="text"
                name="quien_cuidara"
                value={form.quien_cuidara}
                onChange={handleChange}
                placeholder="Yo, mi esposo/a, mi hijo/a, etc."
                required
              />
            </div>

            <div className="form-group">
              <label>¿Cuántas horas al día estará solo/a la mascota? *</label>
              <select
                name="horas_solo_diarias"
                value={form.horas_solo_diarias}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="0-2">0-2 horas</option>
                <option value="2-4">2-4 horas</option>
                <option value="4-6">4-6 horas</option>
                <option value="6-8">6-8 horas</option>
                <option value="8+">Más de 8 horas</option>
              </select>
            </div>

            <div className="form-group">
              <label>¿Dónde permanecerá la mascota durante el día? *</label>
              <select
                name="donde_estara_mascota"
                value={form.donde_estara_mascota}
                onChange={handleChange}
                required
              >
                <option value="">Seleccione...</option>
                <option value="dentro_casa">Dentro de la casa</option>
                <option value="patio">En el patio</option>
                <option value="jardin">En el jardín</option>
                <option value="mixto">Mixto (dentro y fuera)</option>
              </select>
            </div>

            <div className="form-group">
              <label>¿Dónde dormirá la mascota? *</label>
              <input
                type="text"
                name="donde_dormira"
                value={form.donde_dormira}
                onChange={handleChange}
                placeholder="Ej: En su cama dentro de casa, en el patio, en mi habitación..."
                required
              />
            </div>

            <h3>🚨 Situaciones Especiales</h3>

            <div className="form-group">
              <label>¿Qué haría con la mascota si tiene que viajar? *</label>
              <textarea
                name="que_haria_si_viaja"
                value={form.que_haria_si_viaja}
                onChange={handleChange}
                placeholder="Ej: La llevaría conmigo, la dejaría con familiares, contrataría cuidador..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>¿Qué haría si la mascota se enferma gravemente? *</label>
              <textarea
                name="que_haria_si_enferma"
                value={form.que_haria_si_enferma}
                onChange={handleChange}
                placeholder="Considere gastos veterinarios, tratamientos, emergencias..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group">
              <label>¿Qué haría si la mascota presenta problemas de conducta? *</label>
              <textarea
                name="que_haria_si_problemas_conducta"
                value={form.que_haria_si_problemas_conducta}
                onChange={handleChange}
                placeholder="Ej: Buscaría un entrenador, tendría paciencia, consultaría al veterinario..."
                rows="3"
                required
              ></textarea>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="dispuesto_entrenamiento"
                  checked={form.dispuesto_entrenamiento}
                  onChange={handleChange}
                />
                ¿Está dispuesto/a a invertir en entrenamiento profesional si fuera necesario?
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="dispuesto_seguimiento"
                  checked={form.dispuesto_seguimiento}
                  onChange={handleChange}
                  required
                />
                ¿Está dispuesto/a a recibir seguimiento del refugio durante el primer año? *
              </label>
            </div>

            <h3>🏥 Veterinario</h3>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="tiene_veterinario"
                  checked={form.tiene_veterinario}
                  onChange={handleChange}
                />
                ¿Tiene un veterinario de confianza?
              </label>
            </div>

            {form.tiene_veterinario && (
              <>
                <div className="form-row">
                  <div className="form-group">
                    <label>Nombre del Veterinario o Clínica</label>
                    <input
                      type="text"
                      name="nombre_veterinario"
                      value={form.nombre_veterinario}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Teléfono del Veterinario</label>
                    <input
                      type="tel"
                      name="telefono_veterinario"
                      value={form.telefono_veterinario}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </>
            )}

            <h3>👥 Referencias Personales</h3>
            <p className="help-text">Por favor, proporcione 2 referencias personales (no familiares)</p>

            <div className="referencia-box">
              <h4>Referencia 1</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="referencia1_nombre"
                    value={form.referencia1_nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="referencia1_telefono"
                    value={form.referencia1_telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Relación *</label>
                <input
                  type="text"
                  name="referencia1_relacion"
                  value={form.referencia1_relacion}
                  onChange={handleChange}
                  placeholder="Amigo, compañero de trabajo, vecino..."
                  required
                />
              </div>
            </div>

            <div className="referencia-box">
              <h4>Referencia 2</h4>
              <div className="form-row">
                <div className="form-group">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="referencia2_nombre"
                    value={form.referencia2_nombre}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Teléfono *</label>
                  <input
                    type="tel"
                    name="referencia2_telefono"
                    value={form.referencia2_telefono}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Relación *</label>
                <input
                  type="text"
                  name="referencia2_relacion"
                  value={form.referencia2_relacion}
                  onChange={handleChange}
                  placeholder="Amigo, compañero de trabajo, vecino..."
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-anterior" onClick={pasoAnterior}>
                ← Anterior
              </button>
              <button type="button" className="btn-siguiente" onClick={siguientePaso}>
                Siguiente →
              </button>
            </div>
          </div>
        )}

        {/* PASO 6: DOCUMENTOS Y TÉRMINOS */}
        {paso === 6 && (
          <div className="paso-content">
            <h2>📎 Documentos Requeridos</h2>
            
            <div className="documentos-info">
              <p>📌 Por favor, adjunte los siguientes documentos escaneados o fotografiados:</p>
              <ul>
                <li>✓ Cédula de identidad (obligatorio)</li>
                <li>✓ Copia de servicio básico (obligatorio)</li>
                <li>✓ Foto de la vivienda por fuera (obligatorio)</li>
                <li>✓ Foto del patio/jardín (si aplica)</li>
              </ul>
            </div>

            <div className="form-group">
              <label>Cédula de Identidad * 
                <span className="file-format">(Formatos: JPG, PNG, PDF - Max: 5MB)</span>
              </label>
              <input
                type="file"
                name="cedula_file"
                accept="image/*,.pdf"
                onChange={handleChange}
                required
              />
              {form.cedula_file && (
                <div className="file-preview">
                  ✓ Archivo seleccionado: {form.cedula_file.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Copia de Servicio Básico * 
                <span className="file-format">(Formatos: JPG, PNG, PDF - Max: 5MB)</span>
              </label>
              <input
                type="file"
                name="servicio_basico_file"
                accept="image/*,.pdf"
                onChange={handleChange}
                required
              />
              {form.servicio_basico_file && (
                <div className="file-preview">
                  ✓ Archivo seleccionado: {form.servicio_basico_file.name}
                </div>
              )}
            </div>

            <div className="form-group">
              <label>Foto de la Vivienda (exterior) * 
                <span className="file-format">(Formatos: JPG, PNG - Max: 5MB)</span>
              </label>
              <input
                type="file"
                name="foto_vivienda_file"
                accept="image/*"
                onChange={handleChange}
                required
              />
              {form.foto_vivienda_file && (
                <div className="file-preview">
                  ✓ Archivo seleccionado: {form.foto_vivienda_file.name}
                </div>
              )}
            </div>

            {(form.tiene_jardin || form.tiene_patio) && (
              <div className="form-group">
                <label>Foto del Patio/Jardín 
                  <span className="file-format">(Formatos: JPG, PNG - Max: 5MB)</span>
                </label>
                <input
                  type="file"
                  name="foto_jardin_file"
                  accept="image/*"
                  onChange={handleChange}
                />
                {form.foto_jardin_file && (
                  <div className="file-preview">
                    ✓ Archivo seleccionado: {form.foto_jardin_file.name}
                  </div>
                )}
              </div>
            )}

            <h3>📋 Términos y Condiciones</h3>

            <div className="terminos-box">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="acepta_visita_domiciliaria"
                    checked={form.acepta_visita_domiciliaria}
                    onChange={handleChange}
                    required
                  />
                  Acepto que el refugio realice una visita domiciliaria previa a la entrega de la mascota *
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="acepta_seguimiento"
                    checked={form.acepta_seguimiento}
                    onChange={handleChange}
                    required
                  />
                  Acepto recibir seguimiento del refugio durante el primer año de adopción *
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="acepta_terminos"
                    checked={form.acepta_terminos}
                    onChange={handleChange}
                    required
                  />
                  Declaro que toda la información proporcionada es verdadera y acepto los términos y condiciones de adopción *
                </label>
              </div>
            </div>

            <div className="importante-box">
              <h4>⚠️ Importante:</h4>
              <ul>
                <li>La solicitud de adopción no garantiza la entrega inmediata de la mascota</li>
                <li>El proceso de aprobación puede tomar entre 3 a 7 días hábiles</li>
                <li>Nos pondremos en contacto contigo para coordinar la visita domiciliaria</li>
                <li>Si tu solicitud es aprobada, firmarás un contrato de adopción</li>
                <li>El refugio se reserva el derecho de rechazar solicitudes sin dar explicaciones</li>
              </ul>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-anterior" onClick={pasoAnterior}>
                ← Anterior
              </button>
              <button 
                type="submit" 
                className="btn-enviar-solicitud"
                disabled={loading}
              >
                {loading ? "Enviando..." : "✓ Enviar Solicitud de Adopción"}
              </button>
            </div>
          </div>
        )}

      </form>

      {/* Alerta personalizada */}
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

export default FormularioAdopcion;          