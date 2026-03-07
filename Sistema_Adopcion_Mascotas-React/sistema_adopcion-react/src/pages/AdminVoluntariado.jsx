import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/AdminVoluntariado.css";

const AdminVoluntariado = () => {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const [solicitudes, setSolicitudes] = useState([]);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [modalDetalleAbierto, setModalDetalleAbierto] = useState(false);
  const [loading, setLoading] = useState(false);

  const [filtroEstado, setFiltroEstado] = useState("todos");
  const [busqueda, setBusqueda] = useState("");

  const [estadisticas, setEstadisticas] = useState({
    total: 0,
    pendientes: 0,
    aprobados: 0,
    rechazados: 0
  });

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // Verificar que sea admin
  useEffect(() => {
    if (!usuario || usuario.rol !== "admin") {
      navigate("/login");
    } else {
      cargarSolicitudes();
      cargarEstadisticas();
    }
  }, []);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const url = filtroEstado === "todos" 
        ? "http://localhost:4000/api/voluntariado"
        : `http://localhost:4000/api/voluntariado?estado=${filtroEstado}`;

      const response = await fetch(url);
      const data = await response.json();
      setSolicitudes(data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
    } finally {
      setLoading(false);
    }
  };

  const cargarEstadisticas = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/voluntariado/stats/general");
      const data = await response.json();
      setEstadisticas(data);
    } catch (error) {
      console.error("Error al cargar estadísticas:", error);
    }
  };

  useEffect(() => {
    if (usuario && usuario.rol === "admin") {
      cargarSolicitudes();
    }
  }, [filtroEstado]);

  const abrirDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setModalDetalleAbierto(true);
  };

  const cerrarDetalle = () => {
    setModalDetalleAbierto(false);
    setSolicitudSeleccionada(null);
  };

  const cambiarEstado = async (id, nuevoEstado, notas = "") => {
    try {
      const response = await fetch(`http://localhost:4000/api/voluntariado/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          estado: nuevoEstado,
          notas_admin: notas
        })
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "Estado Actualizado",
          message: `Solicitud ${nuevoEstado} correctamente`,
          type: "success"
        });
        cargarSolicitudes();
        cargarEstadisticas();
        cerrarDetalle();
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "No se pudo actualizar el estado",
        type: "error"
      });
    }
  };

  const eliminarSolicitud = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar esta solicitud?")) return;

    try {
      const response = await fetch(`http://localhost:4000/api/voluntariado/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "Eliminado",
          message: "Solicitud eliminada correctamente",
          type: "success"
        });
        cargarSolicitudes();
        cargarEstadisticas();
        cerrarDetalle();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    try {
      const partes = fecha.split('T')[0].split('-');
      if (partes.length !== 3) return "Fecha no disponible";
      const [año, mes, dia] = partes;
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
    } catch (error) {
      return "Fecha no disponible";
    }
  };

  const solicitudesFiltradas = solicitudes.filter(sol => {
    const coincideBusqueda = sol.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
                            sol.email.toLowerCase().includes(busqueda.toLowerCase()) ||
                            sol.cedula.includes(busqueda);
    return coincideBusqueda;
  });

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <div className="admin-voluntariado-page">
      
      {/* Header */}
      <div className="admin-vol-header">
        <div className="header-content">
          <button className="btn-volver" onClick={() => navigate("/admin")}>
            ← Volver al Dashboard
          </button>
          <h1>Gestión de Voluntariado</h1>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="stats-vol-container">
        <div className="stat-vol-card total">
          <div className="stat-vol-icon">📊</div>
          <div className="stat-vol-info">
            <h3>{estadisticas.total || 0}</h3>
            <p>Total Solicitudes</p>
          </div>
        </div>

        <div className="stat-vol-card pendientes">
          <div className="stat-vol-icon">⏳</div>
          <div className="stat-vol-info">
            <h3>{estadisticas.pendientes || 0}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        <div className="stat-vol-card aprobados">
          <div className="stat-vol-icon">✅</div>
          <div className="stat-vol-info">
            <h3>{estadisticas.aprobados || 0}</h3>
            <p>Aprobados</p>
          </div>
        </div>

        <div className="stat-vol-card rechazados">
          <div className="stat-vol-icon">❌</div>
          <div className="stat-vol-info">
            <h3>{estadisticas.rechazados || 0}</h3>
            <p>Rechazados</p>
          </div>
        </div>
      </div>

      {/* Filtros y Búsqueda */}
      <div className="filtros-container">
        <div className="filtros-tabs">
          <button
            className={filtroEstado === "todos" ? "active" : ""}
            onClick={() => setFiltroEstado("todos")}
          >
            Todos
          </button>
          <button
            className={filtroEstado === "pendiente" ? "active" : ""}
            onClick={() => setFiltroEstado("pendiente")}
          >
            Pendientes
          </button>
          <button
            className={filtroEstado === "aprobado" ? "active" : ""}
            onClick={() => setFiltroEstado("aprobado")}
          >
            Aprobados
          </button>
          <button
            className={filtroEstado === "rechazado" ? "active" : ""}
            onClick={() => setFiltroEstado("rechazado")}
          >
            Rechazados
          </button>
        </div>

        <div className="busqueda-container">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, email o cédula..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* Tabla de Solicitudes */}
      <div className="tabla-container">
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Cargando solicitudes...</p>
          </div>
        ) : solicitudesFiltradas.length === 0 ? (
          <div className="empty-state">
            <p>No hay solicitudes para mostrar</p>
          </div>
        ) : (
          <table className="tabla-voluntariado">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Ciudad</th>
                <th>Fecha Solicitud</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.id}>
                  <td>
                    <strong>{solicitud.nombre}</strong>
                    <br />
                    <small>CI: {solicitud.cedula}</small>
                  </td>
                  <td>{solicitud.email}</td>
                  <td>{solicitud.telefono || "N/A"}</td>
                  <td>{solicitud.ciudad || "N/A"}</td>
                  <td>{formatearFecha(solicitud.created_at)}</td>
                  <td>
                    <span className={`badge-estado ${solicitud.estado}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn-ver-detalle"
                      onClick={() => abrirDetalle(solicitud)}
                    >
                      Ver Detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Detalle */}
      {modalDetalleAbierto && solicitudSeleccionada && (
        <div className="modal-overlay" onClick={cerrarDetalle}>
          <div className="modal-detalle" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <h2>Detalle de Solicitud</h2>
              <button className="btn-cerrar" onClick={cerrarDetalle}>✕</button>
            </div>

            <div className="modal-body">
              
              {/* Datos Personales */}
              <section className="detalle-section">
                <h3>📋 Datos Personales</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <strong>Nombre:</strong>
                    <p>{solicitudSeleccionada.nombre}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Cédula:</strong>
                    <p>{solicitudSeleccionada.cedula}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Email:</strong>
                    <p>{solicitudSeleccionada.email}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Teléfono:</strong>
                    <p>{solicitudSeleccionada.telefono || "No proporcionado"}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Fecha de Nacimiento:</strong>
                    <p>{solicitudSeleccionada.fecha_nacimiento ? formatearFecha(solicitudSeleccionada.fecha_nacimiento) : "No proporcionado"}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Ciudad:</strong>
                    <p>{solicitudSeleccionada.ciudad || "No proporcionado"}</p>
                  </div>
                  <div className="detalle-item full-width">
                    <strong>Dirección:</strong>
                    <p>{solicitudSeleccionada.direccion || "No proporcionado"}</p>
                  </div>
                </div>
              </section>

              {/* Académico/Profesional */}
              <section className="detalle-section">
                <h3>🎓 Información Académica/Profesional</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <strong>Nivel de Educación:</strong>
                    <p>{solicitudSeleccionada.nivel_educacion || "No proporcionado"}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Profesión/Ocupación:</strong>
                    <p>{solicitudSeleccionada.profesion_ocupacion || "No proporcionado"}</p>
                  </div>
                </div>
              </section>

              {/* Disponibilidad */}
              <section className="detalle-section">
                <h3>📅 Disponibilidad</h3>
                <div className="detalle-grid">
                  <div className="detalle-item full-width">
                    <strong>Días Disponibles:</strong>
                    <p>{JSON.parse(solicitudSeleccionada.disponibilidad_dias || "[]").join(", ") || "No especificado"}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Horario Preferido:</strong>
                    <p>{solicitudSeleccionada.disponibilidad_horario || "No especificado"}</p>
                  </div>
                  <div className="detalle-item">
                    <strong>Horas Semanales:</strong>
                    <p>{solicitudSeleccionada.horas_semanales || "No especificado"}</p>
                  </div>
                </div>
              </section>

              {/* Experiencia */}
              <section className="detalle-section">
                <h3>🌟 Experiencia</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <strong>Experiencia Previa:</strong>
                    <p>{solicitudSeleccionada.experiencia_previa ? "Sí" : "No"}</p>
                  </div>
                  {solicitudSeleccionada.experiencia_previa && (
                    <div className="detalle-item full-width">
                      <strong>Detalle de Experiencia:</strong>
                      <p>{solicitudSeleccionada.detalle_experiencia || "No proporcionado"}</p>
                    </div>
                  )}
                  <div className="detalle-item full-width">
                    <strong>Habilidades Especiales:</strong>
                    <p>{solicitudSeleccionada.habilidades_especiales || "No proporcionado"}</p>
                  </div>
                </div>
              </section>

              {/* Áreas de Interés */}
              <section className="detalle-section">
                <h3>💡 Áreas de Interés</h3>
                <div className="areas-tags">
                  {JSON.parse(solicitudSeleccionada.areas_interes || "[]").map((area, index) => (
                    <span key={index} className="area-tag">{area}</span>
                  ))}
                </div>
              </section>

              {/* Motivación */}
              <section className="detalle-section">
                <h3>💭 Motivación</h3>
                <div className="motivacion-box">
                  <p>{solicitudSeleccionada.por_que_voluntario}</p>
                </div>
              </section>

              {/* Referencias */}
              {solicitudSeleccionada.tiene_referencias && (
                <section className="detalle-section">
                  <h3>👥 Referencias</h3>
                  <div className="detalle-grid">
                    {solicitudSeleccionada.nombre_referencia_1 && (
                      <>
                        <div className="detalle-item">
                          <strong>Referencia 1 - Nombre:</strong>
                          <p>{solicitudSeleccionada.nombre_referencia_1}</p>
                        </div>
                        <div className="detalle-item">
                          <strong>Teléfono:</strong>
                          <p>{solicitudSeleccionada.telefono_referencia_1}</p>
                        </div>
                      </>
                    )}
                    {solicitudSeleccionada.nombre_referencia_2 && (
                      <>
                        <div className="detalle-item">
                          <strong>Referencia 2 - Nombre:</strong>
                          <p>{solicitudSeleccionada.nombre_referencia_2}</p>
                        </div>
                        <div className="detalle-item">
                          <strong>Teléfono:</strong>
                          <p>{solicitudSeleccionada.telefono_referencia_2}</p>
                        </div>
                      </>
                    )}
                  </div>
                </section>
              )}

              {/* Estado Actual */}
              <section className="detalle-section">
                <h3>📊 Estado y Gestión</h3>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <strong>Estado Actual:</strong>
                    <span className={`badge-estado ${solicitudSeleccionada.estado}`}>
                      {solicitudSeleccionada.estado}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <strong>Fecha de Solicitud:</strong>
                    <p>{formatearFecha(solicitudSeleccionada.created_at)}</p>
                  </div>
                  {solicitudSeleccionada.fecha_aprobacion && (
                    <div className="detalle-item">
                      <strong>Fecha de Aprobación:</strong>
                      <p>{formatearFecha(solicitudSeleccionada.fecha_aprobacion)}</p>
                    </div>
                  )}
                  {solicitudSeleccionada.notas_admin && (
                    <div className="detalle-item full-width">
                      <strong>Notas del Administrador:</strong>
                      <p>{solicitudSeleccionada.notas_admin}</p>
                    </div>
                  )}
                </div>
              </section>

            </div>

            {/* Acciones */}
            <div className="modal-footer">
              {solicitudSeleccionada.estado === "pendiente" && (
                <>
                  <button
                    className="btn-aprobar"
                    onClick={() => cambiarEstado(solicitudSeleccionada.id, "aprobado")}
                  >
                    ✅ Aprobar
                  </button>
                  <button
                    className="btn-rechazar"
                    onClick={() => cambiarEstado(solicitudSeleccionada.id, "rechazado")}
                  >
                    ❌ Rechazar
                  </button>
                </>
              )}
              
              <button
                className="btn-eliminar"
                onClick={() => eliminarSolicitud(solicitudSeleccionada.id)}
              >
                🗑️ Eliminar
              </button>
              
              <button className="btn-cerrar-modal" onClick={cerrarDetalle}>
                Cerrar
              </button>
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

    </div>
  );
};

export default AdminVoluntariado;