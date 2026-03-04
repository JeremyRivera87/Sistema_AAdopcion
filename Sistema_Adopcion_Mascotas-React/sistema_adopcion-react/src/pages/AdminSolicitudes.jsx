import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminSolicitudes.css";

const AdminSolicitudes = () => {
  const navigate = useNavigate();
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas");
  const [stats, setStats] = useState({
    total: 0,
    pendientes: 0,
    en_revision: 0,
    aprobadas: 0,
    rechazadas: 0
  });

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const cargarSolicitudes = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/solicitudes");
      const data = await response.json();
      setSolicitudes(data);
      calcularEstadisticas(data);
    } catch (error) {
      console.error("Error al cargar solicitudes:", error);
      alert("Error al cargar las solicitudes");
    } finally {
      setLoading(false);
    }
  };

  const calcularEstadisticas = (data) => {
    setStats({
      total: data.length,
      pendientes: data.filter(s => s.estado === "pendiente").length,
      en_revision: data.filter(s => s.estado === "en_revision").length,
      aprobadas: data.filter(s => s.estado === "aprobada").length,
      rechazadas: data.filter(s => s.estado === "rechazada").length
    });
  };

  const cambiarEstado = async (solicitudId, nuevoEstado, notas = "") => {
    try {
      const response = await fetch(`http://localhost:4000/api/solicitudes/${solicitudId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado, notas_admin: notas })
      });

      if (response.ok) {
        alert(`Solicitud marcada como ${nuevoEstado}`);
        cargarSolicitudes();
      } else {
        alert("Error al cambiar el estado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  const solicitudesFiltradas = solicitudes.filter(solicitud => {
    if (filtro === "todas") return true;
    return solicitud.estado === filtro;
  });

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    const date = new Date(fecha);
    return date.toLocaleDateString('es-EC', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return 'badge-pendiente';
      case 'en_revision': return 'badge-revision';
      case 'aprobada': return 'badge-aprobada';
      case 'rechazada': return 'badge-rechazada';
      default: return 'badge-pendiente';
    }
  };

  return (
    <div className="admin-solicitudes-container">
      
      {/* Header */}
      <div className="admin-solicitudes-header">
        <div className="header-top">
          <h1>Gestión de Solicitudes de Adopción</h1>
          <button className="btn-regresar" onClick={() => navigate('/admin')}>
            ← Regresar
          </button>
        </div>

        {/* Estadísticas */}
        <div className="estadisticas-solicitudes">
          <div className="stat-box">
            <span className="stat-icon">📊</span>
            <div>
              <p className="stat-label">Total Solicitudes</p>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">⏳</span>
            <div>
              <p className="stat-label">Pendientes</p>
              <p className="stat-value">{stats.pendientes}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🔍</span>
            <div>
              <p className="stat-label">En Revisión</p>
              <p className="stat-value">{stats.en_revision}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">✅</span>
            <div>
              <p className="stat-label">Aprobadas</p>
              <p className="stat-value">{stats.aprobadas}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">❌</span>
            <div>
              <p className="stat-label">Rechazadas</p>
              <p className="stat-value">{stats.rechazadas}</p>
            </div>
          </div>
        </div>

        {/* Filtros */}
        <div className="filtros">
          <button 
            className={filtro === "todas" ? "filtro-activo" : ""}
            onClick={() => setFiltro("todas")}
          >
            Todas ({stats.total})
          </button>
          <button 
            className={filtro === "pendiente" ? "filtro-activo" : ""}
            onClick={() => setFiltro("pendiente")}
          >
            Pendientes ({stats.pendientes})
          </button>
          <button 
            className={filtro === "en_revision" ? "filtro-activo" : ""}
            onClick={() => setFiltro("en_revision")}
          >
            En Revisión ({stats.en_revision})
          </button>
          <button 
            className={filtro === "aprobada" ? "filtro-activo" : ""}
            onClick={() => setFiltro("aprobada")}
          >
            Aprobadas ({stats.aprobadas})
          </button>
          <button 
            className={filtro === "rechazada" ? "filtro-activo" : ""}
            onClick={() => setFiltro("rechazada")}
          >
            Rechazadas ({stats.rechazadas})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Cargando solicitudes...</div>
      ) : solicitudesFiltradas.length === 0 ? (
        <div className="sin-resultados">
          <p>No hay solicitudes {filtro !== "todas" ? filtro : ""}</p>
        </div>
      ) : (
        <div className="tabla-container">
          <table className="solicitudes-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Solicitante</th>
                <th>Mascota</th>
                <th>Contacto</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Documentos</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {solicitudesFiltradas.map((solicitud) => (
                <tr key={solicitud.id}>
                  <td>#{solicitud.id}</td>
                  <td>
                    <div className="solicitante-info">
                      <strong>{solicitud.nombre_completo}</strong>
                      <small>Cédula: {solicitud.cedula}</small>
                    </div>
                  </td>
                  <td>
                    <div className="mascota-info">
                      <strong>{solicitud.mascota_nombre}</strong>
                      <small>{solicitud.mascota_especie}</small>
                    </div>
                  </td>
                  <td>
                    <div className="contacto-info">
                      <small>📧 {solicitud.email}</small>
                      <small>📱 {solicitud.telefono_celular}</small>
                    </div>
                  </td>
                  <td>{formatearFecha(solicitud.created_at)}</td>
                  <td>
                    <span className={`badge ${obtenerClaseEstado(solicitud.estado)}`}>
                      {solicitud.estado}
                    </span>
                  </td>
                  <td>
                    <div className="documentos-links">
                      {solicitud.cedula_url && (
                        <a href={`http://localhost:4000${solicitud.cedula_url}`} target="_blank" rel="noopener noreferrer">
                          📄 Cédula
                        </a>
                      )}
                      {solicitud.servicio_basico_url && (
                        <a href={`http://localhost:4000${solicitud.servicio_basico_url}`} target="_blank" rel="noopener noreferrer">
                          📄 Servicio
                        </a>
                      )}
                      {solicitud.foto_vivienda_url && (
                        <a href={`http://localhost:4000${solicitud.foto_vivienda_url}`} target="_blank" rel="noopener noreferrer">
                          🏠 Vivienda
                        </a>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="acciones">
                      <button 
                        className="btn-ver-detalle"
                        onClick={() => navigate(`/admin/solicitud/${solicitud.id}`)}
                      >
                        👁️ Ver
                      </button>
                      
                      {solicitud.estado === "pendiente" && (
                        <button 
                          className="btn-revisar"
                          onClick={() => cambiarEstado(solicitud.id, "en_revision")}
                        >
                          🔍 Revisar
                        </button>
                      )}
                      
                      {solicitud.estado === "en_revision" && (
                        <>
                          <button 
                            className="btn-aprobar"
                            onClick={() => cambiarEstado(solicitud.id, "aprobada")}
                          >
                            ✅ Aprobar
                          </button>
                          <button 
                            className="btn-rechazar"
                            onClick={() => {
                              const motivo = prompt("Motivo del rechazo:");
                              if (motivo) cambiarEstado(solicitud.id, "rechazada", motivo);
                            }}
                          >
                            ❌ Rechazar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminSolicitudes;