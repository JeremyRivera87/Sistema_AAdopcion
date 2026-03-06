import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/AdminAvisos.css";

const AdminAvisos = () => {
  const navigate = useNavigate();
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [avisoEditando, setAvisoEditando] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    imagen: null,
    imagen_url: "",
    activo: true,
    orden: 0
  });

  // Cargar avisos
  useEffect(() => {
    cargarAvisos();
  }, []);

  const cargarAvisos = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/avisos/admin");
      const data = await res.json();
      setAvisos(data);
    } catch (error) {
      console.error("Error al cargar avisos:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "No se pudieron cargar los avisos",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  // Abrir modal (crear o editar)
  const abrirModal = (aviso = null) => {
    if (aviso) {
      // Modo edición
      setAvisoEditando(aviso);
      setFormData({
        titulo: aviso.titulo,
        descripcion: aviso.descripcion,
        imagen: null,
        imagen_url: aviso.imagen_url || "",
        activo: aviso.activo,
        orden: aviso.orden
      });
      setPrevisualizacion(aviso.imagen_url ? `http://localhost:4000${aviso.imagen_url}` : null);
    } else {
      // Modo creación
      setAvisoEditando(null);
      setFormData({
        titulo: "",
        descripcion: "",
        imagen: null,
        imagen_url: "",
        activo: true,
        orden: avisos.length + 1
      });
      setPrevisualizacion(null);
    }
    setModalAbierto(true);
  };

  // Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setAvisoEditando(null);
    setFormData({
      titulo: "",
      descripcion: "",
      imagen: null,
      imagen_url: "",
      activo: true,
      orden: 0
    });
    setPrevisualizacion(null);
  };

  // Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  // Manejar archivo de imagen
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFormData({
        ...formData,
        imagen: archivo
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  // Guardar aviso (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("titulo", formData.titulo);
      formDataToSend.append("descripcion", formData.descripcion);
      formDataToSend.append("activo", formData.activo);
      formDataToSend.append("orden", formData.orden);
      
      if (formData.imagen) {
        formDataToSend.append("imagen", formData.imagen);
      } else if (formData.imagen_url) {
        formDataToSend.append("imagen_url", formData.imagen_url);
      }

      const url = avisoEditando
        ? `http://localhost:4000/api/avisos/${avisoEditando.id}`
        : "http://localhost:4000/api/avisos";

      const method = avisoEditando ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formDataToSend
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "Éxito",
          message: avisoEditando ? "Aviso actualizado" : "Aviso creado",
          type: "success"
        });
        cerrarModal();
        cargarAvisos();
      } else {
        const error = await response.json();
        setAlert({
          isOpen: true,
          title: "Error",
          message: error.message || "Error al guardar el aviso",
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

  // Eliminar aviso
  const eliminarAviso = async (id, titulo) => {
    if (!window.confirm(`¿Estás seguro de eliminar el aviso "${titulo}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/avisos/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "Eliminado",
          message: "Aviso eliminado correctamente",
          type: "success"
        });
        cargarAvisos();
      } else {
        setAlert({
          isOpen: true,
          title: "Error",
          message: "No se pudo eliminar el aviso",
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

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  if (loading) {
    return (
      <div className="avisos-loading">
        <div className="loader-spinner"></div>
        <p>Cargando avisos...</p>
      </div>
    );
  }

  return (
    <div className="admin-avisos-container">
      
      {/* Header */}
      <div className="avisos-header">
        <div className="header-info">
          <h1>Gestión de Avisos del Carousel</h1>
          <p>Administra los avisos importantes que se muestran en la página principal</p>
        </div>
        <div className="header-acciones">
          <button className="btn-agregar-aviso" onClick={() => abrirModal()}>
            + Agregar Aviso
          </button>
          <button className="btn-volver-avisos" onClick={() => navigate("/admin")}>
            ← Volver
          </button>
        </div>
      </div>

      {/* Lista de avisos */}
      <div className="avisos-content">
        {avisos.length === 0 ? (
          <div className="sin-avisos">
            <div className="sin-avisos-icon">📢</div>
            <h3>No hay avisos</h3>
            <p>Crea el primer aviso para el carousel</p>
            <button className="btn-agregar-primero" onClick={() => abrirModal()}>
              Crear Aviso
            </button>
          </div>
        ) : (
          <div className="avisos-grid">
            {avisos.map((aviso) => (
              <div key={aviso.id} className={`aviso-card ${!aviso.activo ? 'inactivo' : ''}`}>
                <div className="aviso-imagen">
                  {aviso.imagen_url ? (
                    <img src={`http://localhost:4000${aviso.imagen_url}`} alt={aviso.titulo} />
                  ) : (
                    <div className="sin-imagen">
                      <span>📢</span>
                      <p>Sin imagen</p>
                    </div>
                  )}
                </div>

                <div className="aviso-info">
                  <div className="aviso-header-card">
                    <h3>{aviso.titulo}</h3>
                    <div className="aviso-badges">
                      <span className={`badge-estado ${aviso.activo ? 'activo' : 'inactivo'}`}>
                        {aviso.activo ? '✓ Activo' : '✗ Inactivo'}
                      </span>
                      <span className="badge-orden">#{aviso.orden}</span>
                    </div>
                  </div>
                  <p className="aviso-descripcion">{aviso.descripcion}</p>
                </div>

                <div className="aviso-acciones">
                  <button 
                    className="btn-editar-aviso"
                    onClick={() => abrirModal(aviso)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn-eliminar-aviso"
                    onClick={() => eliminarAviso(aviso.id, aviso.titulo)}
                  >
                    🗑️ Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-overlay-avisos" onClick={cerrarModal}>
          <div className="modal-content-avisos" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-avisos">
              <h2>{avisoEditando ? "Editar Aviso" : "Nuevo Aviso"}</h2>
              <button className="btn-cerrar-modal-avisos" onClick={cerrarModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form-avisos">
              <div className="form-grid-avisos">
                
                <div className="form-group-avisos full-width">
                  <label>Título *</label>
                  <input
                    type="text"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    placeholder="Ej: Adopta un amigo"
                    required
                    maxLength="200"
                  />
                </div>

                <div className="form-group-avisos full-width">
                  <label>Descripción *</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Descripción del aviso que se mostrará en el carousel..."
                    required
                  ></textarea>
                </div>

                <div className="form-group-avisos">
                  <label>Orden</label>
                  <input
                    type="number"
                    name="orden"
                    value={formData.orden}
                    onChange={handleInputChange}
                    min="0"
                  />
                  <small>Define la posición en el carousel (menor número aparece primero)</small>
                </div>

                <div className="form-group-avisos">
                  <label className="checkbox-label-avisos">
                    <input
                      type="checkbox"
                      name="activo"
                      checked={formData.activo}
                      onChange={handleInputChange}
                    />
                    <span>Aviso activo (visible en el carousel)</span>
                  </label>
                </div>

                <div className="form-group-avisos full-width">
                  <label>Imagen del Aviso</label>
                  <input
                    type="file"
                    name="imagen"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <small>Resolución recomendada: 1200x400px (Máx. 5MB)</small>
                  
                  {previsualizacion && (
                    <div className="preview-imagen-aviso">
                      <img src={previsualizacion} alt="Preview" />
                    </div>
                  )}
                </div>

              </div>

              <div className="modal-footer-avisos">
                <button type="button" className="btn-cancelar-avisos" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar-avisos">
                  {avisoEditando ? "Actualizar" : "Guardar"}
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

export default AdminAvisos;