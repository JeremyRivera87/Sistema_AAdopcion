import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminCitas.css";

const AdminCitas = () => {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas"); // todas, pendiente, confirmada, cancelada, completada

  // 🔹 Cargar todas las citas
  useEffect(() => {
    cargarCitas();
  }, []);

  const cargarCitas = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/citas");
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar citas:", error);
      alert("Error al cargar las citas");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cambiar estado de la cita
  const cambiarEstado = async (citaId, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:4000/api/citas/${citaId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (response.ok) {
        alert(`Cita ${nuevoEstado} exitosamente`);
        cargarCitas(); // Recargar citas
      } else {
        alert("Error al cambiar el estado de la cita");
      }
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      alert("Error de conexión con el servidor");
    }
  };

  // 🔹 Filtrar citas
  const citasFiltradas = citas.filter(cita => {
    if (filtro === "todas") return true;
    return cita.estado === filtro;
  });

 // 🔹 Formatear fecha (CORREGIDO)
  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
  
  // Dividir la fecha en partes (formato: YYYY-MM-DD)
  const partes = fecha.split('T')[0].split('-');
  const año = parseInt(partes[0]);
  const mes = parseInt(partes[1]) - 1; // Los meses en JS van de 0-11
  const dia = parseInt(partes[2]);
  
  // Crear fecha local sin problemas de zona horaria
  const date = new Date(año, mes, dia);
  
  return date.toLocaleDateString('es-EC', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

  // 🔹 Formatear hora
  const formatearHora = (hora) => {
    const [h, m] = hora.split(':');
    const hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  // 🔹 Obtener clase de estado
  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return 'badge-pendiente';
      case 'confirmada': return 'badge-confirmada';
      case 'cancelada': return 'badge-cancelada';
      case 'completada': return 'badge-completada';
      default: return 'badge-pendiente';
    }
  };

  return (
    <div className="admin-citas-container">
      <div className="admin-citas-header">
        <div className="header-top">
          <h1>Gestión de Citas</h1>
          <button className="btn-regresar" onClick={() => navigate('/admin')}>
            ← Regresar
          </button>
        </div>

        {/* Filtros */}
        <div className="filtros">
          <button 
            className={filtro === "todas" ? "filtro-activo" : ""}
            onClick={() => setFiltro("todas")}
          >
            Todas ({citas.length})
          </button>
          <button 
            className={filtro === "pendiente" ? "filtro-activo" : ""}
            onClick={() => setFiltro("pendiente")}
          >
            Pendientes ({citas.filter(c => c.estado === "pendiente").length})
          </button>
          <button 
            className={filtro === "confirmada" ? "filtro-activo" : ""}
            onClick={() => setFiltro("confirmada")}
          >
            Confirmadas ({citas.filter(c => c.estado === "confirmada").length})
          </button>
          <button 
            className={filtro === "completada" ? "filtro-activo" : ""}
            onClick={() => setFiltro("completada")}
          >
            Completadas ({citas.filter(c => c.estado === "completada").length})
          </button>
          <button 
            className={filtro === "cancelada" ? "filtro-activo" : ""}
            onClick={() => setFiltro("cancelada")}
          >
            Canceladas ({citas.filter(c => c.estado === "cancelada").length})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Cargando citas...</div>
      ) : citasFiltradas.length === 0 ? (
        <div className="sin-resultados">
          <p>No hay citas {filtro !== "todas" ? filtro + "s" : ""}</p>
        </div>
      ) : (
        <div className="tabla-container">
          <table className="citas-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Mascota</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Motivo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasFiltradas.map((cita) => (
                <tr key={cita.id}>
                  <td>#{cita.id}</td>
                  <td>
                    <div className="usuario-info">
                      <strong>{cita.usuario_nombre}</strong>
                      <small>{cita.usuario_email}</small>
                    </div>
                  </td>
                  <td>
                    <div className="mascota-info">
                      <strong>{cita.mascota_nombre}</strong>
                      <small>{cita.mascota_especie}</small>
                    </div>
                  </td>
                  <td>{formatearFecha(cita.fecha)}</td>
                  <td>{formatearHora(cita.hora)}</td>
                  <td>{cita.motivo}</td>
                  <td>
                    <span className={`badge ${obtenerClaseEstado(cita.estado)}`}>
                      {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="acciones">
                      {cita.estado === "pendiente" && (
                        <>
                          <button 
                            className="btn-confirmar"
                            onClick={() => cambiarEstado(cita.id, "confirmada")}
                            title="Confirmar cita"
                          >
                            ✓
                          </button>
                          <button 
                            className="btn-cancelar-admin"
                            onClick={() => cambiarEstado(cita.id, "cancelada")}
                            title="Cancelar cita"
                          >
                            ✗
                          </button>
                        </>
                      )}
                      {cita.estado === "confirmada" && (
                        <button 
                          className="btn-completar"
                          onClick={() => cambiarEstado(cita.id, "completada")}
                          title="Marcar como completada"
                        >
                          ✓ Completar
                        </button>
                      )}
                      {(cita.estado === "cancelada" || cita.estado === "completada") && (
                        <span className="texto-final">—</span>
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

export default AdminCitas;