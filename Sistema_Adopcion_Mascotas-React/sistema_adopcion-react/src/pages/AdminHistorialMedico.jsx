import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/AdminHistorialMedico.css";

const AdminHistorialMedico = () => {
  const { mascota_id } = useParams();
  const navigate = useNavigate();
  
  const [mascota, setMascota] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);
  
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [formData, setFormData] = useState({
    fecha: "",
    tipo: "",
    descripcion: "",
    veterinario: "",
    proxima_cita: "",
    notas: "",
    imagen: null,        // ← NUEVO
    imagen_url: ""       // ← NUEVO
  });

  const [previsualizacion, setPrevisualizacion] = useState(null); // ← NUEVO

  // Cargar mascota e historial
  useEffect(() => {
    cargarDatos();
  }, [mascota_id]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      // Cargar datos de la mascota
      const resMascota = await fetch(`http://localhost:4000/api/mascotas/${mascota_id}`);
      const dataMascota = await resMascota.json();
      setMascota(dataMascota);

      // Cargar historial médico
      const resHistorial = await fetch(`http://localhost:4000/api/historial/mascota/${mascota_id}`);
      const dataHistorial = await resHistorial.json();
      setHistorial(dataHistorial);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "No se pudieron cargar los datos",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal (crear o editar)
  const abrirModal = (registro = null) => {
    if (registro) {
      // Modo edición
      setRegistroEditando(registro);
      setFormData({
        fecha: registro.fecha?.split('T')[0] || "",
        tipo: registro.tipo || "",
        descripcion: registro.descripcion || "",
        veterinario: registro.veterinario || "",
        proxima_cita: registro.proxima_cita?.split('T')[0] || "",
        notas: registro.notas || "",
        imagen: null,
        imagen_url: registro.imagen_url || ""
      });
      // Si hay imagen, mostrar preview
      setPrevisualizacion(registro.imagen_url ? `http://localhost:4000${registro.imagen_url}` : null);
    } else {
      // Modo creación
      setRegistroEditando(null);
      setFormData({
        fecha: new Date().toISOString().split('T')[0],
        tipo: "",
        descripcion: "",
        veterinario: "",
        proxima_cita: "",
        notas: "",
        imagen: null,
        imagen_url: ""
      });
      setPrevisualizacion(null);
    }
    setModalAbierto(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setRegistroEditando(null);
    setFormData({
      fecha: "",
      tipo: "",
      descripcion: "",
      veterinario: "",
      proxima_cita: "",
      notas: "",
      imagen: null,
      imagen_url: ""
    });
    setPrevisualizacion(null);
  };

  // Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // ← NUEVO: Manejar archivo de imagen
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFormData({
        ...formData,
        imagen: archivo
      });
      
      // Crear previsualización
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  // Guardar registro (crear o actualizar) - ACTUALIZADO CON FORMDATA
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ← CAMBIADO: Usar FormData para enviar archivos
      const formDataToSend = new FormData();
      formDataToSend.append("mascota_id", parseInt(mascota_id));
      formDataToSend.append("fecha", formData.fecha);
      formDataToSend.append("tipo", formData.tipo);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("veterinario", formData.veterinario);
      formDataToSend.append("proxima_cita", formData.proxima_cita || "");
      formDataToSend.append("notas", formData.notas);
      
      // Agregar imagen si existe
      if (formData.imagen) {
        formDataToSend.append("imagen", formData.imagen);
      } else if (formData.imagen_url) {
        formDataToSend.append("imagen_url", formData.imagen_url);
      }

      const url = registroEditando
        ? `http://localhost:4000/api/historial/${registroEditando.id}`
        : "http://localhost:4000/api/historial";

      const method = registroEditando ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formDataToSend // ⚠️ NO usar headers con FormData
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "Éxito",
          message: registroEditando ? "Registro actualizado" : "Registro creado",
          type: "success"
        });
        cerrarModal();
        cargarDatos();
      } else {
        const error = await response.json();
        setAlert({
          isOpen: true,
          title: "Error",
          message: error.message || "Error al guardar el registro",
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
    }
  };

  // Eliminar registro
  const eliminarRegistro = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este registro médico?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/historial/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "Eliminado",
          message: "Registro eliminado correctamente",
          type: "success"
        });
        cargarDatos();
      } else {
        setAlert({
          isOpen: true,
          title: "Error",
          message: "No se pudo eliminar el registro",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "Error de conexión",
        type: "error"
      });
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-EC', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  if (loading) {
    return (
      <div className="historial-loading">
        <div className="loader-spinner"></div>
        <p>Cargando historial médico...</p>
      </div>
    );
  }

  if (!mascota) {
    return (
      <div className="historial-error">
        <h2>Mascota no encontrada</h2>
        <button onClick={() => navigate("/admin")}>Volver</button>
      </div>
    );
  }

  return (
    <div className="admin-historial-container">
      
      {/* Header */}
      <div className="historial-header">
        <button className="btn-volver-historial" onClick={() => navigate("/admin")}>
          ← Volver al Admin
        </button>

        <div className="mascota-info-header">
          <div className="mascota-avatar">
            {mascota.foto_url ? (
              <img src={`http://localhost:4000${mascota.foto_url}`} alt={mascota.nombre} />
            ) : (
              <div className="sin-foto">🐾</div>
            )}
          </div>
          <div className="mascota-datos">
            <h1>Historial Médico de {mascota.nombre}</h1>
            <p>{mascota.especie} • {mascota.raza || "Mestizo"} • {mascota.edad || "Edad desconocida"}</p>
          </div>
        </div>

        <button className="btn-agregar-registro" onClick={() => abrirModal()}>
          + Agregar Registro
        </button>
      </div>

      {/* Lista de registros */}
      <div className="historial-content">
        {historial.length === 0 ? (
          <div className="sin-registros">
            <div className="sin-registros-icon">🏥</div>
            <h3>No hay registros médicos</h3>
            <p>Agrega el primer registro médico de {mascota.nombre}</p>
            <button className="btn-agregar-primero" onClick={() => abrirModal()}>
              Agregar Registro
            </button>
          </div>
        ) : (
          <div className="registros-timeline">
            {historial.map((registro) => (
              <div key={registro.id} className="registro-item">
                <div className="registro-marker">
                  <div className="registro-icon">
                    {registro.tipo === 'vacuna' && '💉'}
                    {registro.tipo === 'desparasitación' && '💊'}
                    {registro.tipo === 'consulta' && '🩺'}
                    {registro.tipo === 'cirugía' && '⚕️'}
                    {registro.tipo === 'control' && '📋'}
                  </div>
                </div>

                <div className="registro-card">
                  <div className="registro-header-card">
                    <div>
                      <span className={`tipo-badge ${registro.tipo}`}>
                        {registro.tipo}
                      </span>
                      <h3>{formatearFecha(registro.fecha)}</h3>
                    </div>
                    <div className="registro-acciones">
                      <button 
                        className="btn-editar-registro"
                        onClick={() => abrirModal(registro)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-eliminar-registro"
                        onClick={() => eliminarRegistro(registro.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <p className="registro-descripcion">{registro.descripcion}</p>

                  {/* ← NUEVO: Mostrar imagen si existe */}
                  {registro.imagen_url && (
                    <div className="registro-imagen-container">
                      <img 
                        src={`http://localhost:4000${registro.imagen_url}`} 
                        alt="Documento médico"
                        className="registro-imagen"
                        onClick={() => window.open(`http://localhost:4000${registro.imagen_url}`, '_blank')}
                      />
                      <small>Click para ver en tamaño completo</small>
                    </div>
                  )}

                  {registro.veterinario && (
                    <p className="registro-veterinario">
                      👨‍⚕️ <strong>Veterinario:</strong> Dr/a. {registro.veterinario}
                    </p>
                  )}

                  {registro.proxima_cita && (
                    <p className="registro-proxima">
                      📅 <strong>Próxima cita:</strong> {formatearFecha(registro.proxima_cita)}
                    </p>
                  )}

                  {registro.notas && (
                    <div className="registro-notas">
                      <strong>Notas:</strong>
                      <p>{registro.notas}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-overlay-historial" onClick={cerrarModal}>
          <div className="modal-content-historial" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-historial">
              <h2>{registroEditando ? "Editar Registro" : "Nuevo Registro Médico"}</h2>
              <button className="btn-cerrar-modal-historial" onClick={cerrarModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-historial">
              <div className="form-grid-historial">
                
                <div className="form-group-historial">
                  <label>Fecha *</label>
                  <input
                    type="date"
                    name="fecha"
                    value={formData.fecha}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group-historial">
                  <label>Tipo *</label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="vacuna">💉 Vacuna</option>
                    <option value="desparasitación">💊 Desparasitación</option>
                    <option value="consulta">🩺 Consulta</option>
                    <option value="cirugía">⚕️ Cirugía</option>
                    <option value="control">📋 Control</option>
                  </select>
                </div>

                <div className="form-group-historial full-width">
                  <label>Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe el procedimiento o tratamiento realizado..."
                    required
                  ></textarea>
                </div>

                <div className="form-group-historial">
                  <label>Veterinario</label>
                  <input
                    type="text"
                    name="veterinario"
                    value={formData.veterinario}
                    onChange={handleInputChange}
                    placeholder="Dr/a. Nombre del veterinario"
                  />
                </div>

                <div className="form-group-historial">
                  <label>Próxima cita</label>
                  <input
                    type="date"
                    name="proxima_cita"
                    value={formData.proxima_cita}
                    onChange={handleInputChange}
                  />
                </div>

                {/* ← NUEVO: Campo para subir imagen */}
                <div className="form-group-historial full-width">
                  <label>Imagen del historial (opcional)</label>
                  <input
                    type="file"
                    name="imagen"
                    accept="image/*,application/pdf"
                    onChange={handleFileChange}
                  />
                  <small>Sube radiografías, análisis, recetas, etc. (Máx. 10MB)</small>
                  
                  {/* Preview de imagen */}
                  {previsualizacion && (
                    <div className="preview-imagen-historial">
                      <img src={previsualizacion} alt="Preview" />
                    </div>
                  )}
                </div>

                <div className="form-group-historial full-width">
                  <label>Notas adicionales</label>
                  <textarea
                    name="notas"
                    value={formData.notas}
                    onChange={handleInputChange}
                    rows="2"
                    placeholder="Observaciones, recomendaciones o información adicional..."
                  ></textarea>
                </div>

              </div>

              <div className="modal-footer-historial">
                <button type="button" className="btn-cancelar-historial" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar-historial">
                  {registroEditando ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Alerta */}
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

export default AdminHistorialMedico;