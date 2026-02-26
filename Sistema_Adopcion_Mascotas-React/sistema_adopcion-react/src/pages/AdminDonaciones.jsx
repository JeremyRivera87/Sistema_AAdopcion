import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDonaciones.css";

const AdminDonaciones = () => {
  const navigate = useNavigate();
  const [donaciones, setDonaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState("todas");
  const [stats, setStats] = useState({
    total: 0,
    monetarias: 0,
    especie: 0,
    totalRecaudado: 0,
    completadas: 0,
    pendientes: 0
  });

  // 🔹 Cargar todas las donaciones
  useEffect(() => {
    cargarDonaciones();
  }, []);

  const cargarDonaciones = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/donaciones");
      const data = await response.json();
      setDonaciones(data);
      calcularEstadisticas(data);
    } catch (error) {
      console.error("Error al cargar donaciones:", error);
      alert("Error al cargar las donaciones");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Calcular estadísticas
  const calcularEstadisticas = (data) => {
    const monetarias = data.filter(d => d.tipo_donacion === "monetaria").length;
    const especie = data.length - monetarias;
    const totalRecaudado = data
      .filter(d => d.tipo_donacion === "monetaria")
      .reduce((sum, d) => sum + parseFloat(d.monto || 0), 0);
    const completadas = data.filter(d => d.estado === "completada").length;
    const pendientes = data.filter(d => d.estado === "pendiente").length;

    setStats({
      total: data.length,
      monetarias,
      especie,
      totalRecaudado: totalRecaudado.toFixed(2),
      completadas,
      pendientes
    });
  };

  // 🔹 Cambiar estado de la donación
  const cambiarEstado = async (donacionId, nuevoEstado) => {
    try {
      const response = await fetch(`http://localhost:4000/api/donaciones/${donacionId}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado })
      });

      if (response.ok) {
        alert(`Donación marcada como ${nuevoEstado}`);
        cargarDonaciones();
      } else {
        alert("Error al cambiar el estado");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  // 🔹 Filtrar donaciones
  const donacionesFiltradas = donaciones.filter(donacion => {
    if (filtro === "todas") return true;
    if (filtro === "monetaria") return donacion.tipo_donacion === "monetaria";
    if (filtro === "especie") return donacion.tipo_donacion !== "monetaria";
    return donacion.estado === filtro;
  });

  // 🔹 Formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    const soloFecha = fecha.split('T')[0];
    const [año, mes, dia] = soloFecha.split('-');
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    return `${dia} ${meses[parseInt(mes) - 1]} ${año}`;
  };

  // 🔹 Obtener clase de estado
  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return 'badge-pendiente';
      case 'completada': return 'badge-completada';
      case 'verificada': return 'badge-verificada';
      default: return 'badge-pendiente';
    }
  };

  return (
    <div className="admin-donaciones-container">
      
      {/* Header */}
      <div className="admin-donaciones-header">
        <div className="header-top">
          <h1>Gestión de Donaciones</h1>
          <button className="btn-regresar" onClick={() => navigate('/admin')}>
            ← Regresar
          </button>
        </div>

        {/* Estadísticas */}
        <div className="estadisticas-donaciones">
          <div className="stat-box">
            <span className="stat-icon">💰</span>
            <div>
              <p className="stat-label">Total Recaudado</p>
              <p className="stat-value">${stats.totalRecaudado}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">📊</span>
            <div>
              <p className="stat-label">Total Donaciones</p>
              <p className="stat-value">{stats.total}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">💵</span>
            <div>
              <p className="stat-label">Monetarias</p>
              <p className="stat-value">{stats.monetarias}</p>
            </div>
          </div>
          <div className="stat-box">
            <span className="stat-icon">🎁</span>
            <div>
              <p className="stat-label">En Especie</p>
              <p className="stat-value">{stats.especie}</p>
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
            className={filtro === "monetaria" ? "filtro-activo" : ""}
            onClick={() => setFiltro("monetaria")}
          >
            Monetarias ({stats.monetarias})
          </button>
          <button 
            className={filtro === "especie" ? "filtro-activo" : ""}
            onClick={() => setFiltro("especie")}
          >
            En Especie ({stats.especie})
          </button>
          <button 
            className={filtro === "completada" ? "filtro-activo" : ""}
            onClick={() => setFiltro("completada")}
          >
            Completadas ({stats.completadas})
          </button>
          <button 
            className={filtro === "pendiente" ? "filtro-activo" : ""}
            onClick={() => setFiltro("pendiente")}
          >
            Pendientes ({stats.pendientes})
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading">Cargando donaciones...</div>
      ) : donacionesFiltradas.length === 0 ? (
        <div className="sin-resultados">
          <p>No hay donaciones {filtro !== "todas" ? filtro : ""}</p>
        </div>
      ) : (
        <div className="tabla-container">
          <table className="donaciones-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Donante</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Método</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Comprobante</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {donacionesFiltradas.map((donacion) => (
                <tr key={donacion.id}>
                  <td>#{donacion.id}</td>
                  <td>
                    <div className="donante-info">
                      <strong>{donacion.nombre_donante}</strong>
                      <small>{donacion.email_donante}</small>
                    </div>
                  </td>
                  <td>
                    <span className="tipo-badge">
                      {donacion.tipo_donacion}
                    </span>
                  </td>
                  <td>
                    {donacion.tipo_donacion === "monetaria" 
                      ? `$${parseFloat(donacion.monto).toFixed(2)}`
                      : "N/A"}
                  </td>
                  <td>{donacion.metodo_pago}</td>
                  <td>{formatearFecha(donacion.created_at)}</td>
                  <td>
                    <span className={`badge ${obtenerClaseEstado(donacion.estado)}`}>
                      {donacion.estado}
                    </span>
                  </td>
                  <td>
                    {donacion.comprobante_url ? (
                      <a 
                        href={`http://localhost:4000${donacion.comprobante_url}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="ver-comprobante"
                      >
                        Ver 📄
                      </a>
                    ) : (
                      <span className="sin-comprobante">Sin comprobante</span>
                    )}
                  </td>
                  <td>
                    <div className="acciones">
                      {donacion.estado === "pendiente" && (
                        <button 
                          className="btn-recibir"
                          onClick={() => cambiarEstado(donacion.id, "completada")}
                          title="Marcar como recibida"
                        >
                          ✓ Recibir
                        </button>
                      )}
                      {donacion.estado === "completada" && (
                        <button 
                          className="btn-verificar"
                          onClick={() => cambiarEstado(donacion.id, "verificada")}
                          title="Verificar donación"
                        >
                          ✓ Verificar
                        </button>
                      )}
                      {donacion.estado === "verificada" && (
                        <span className="texto-final">Verificada ✓</span>
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

export default AdminDonaciones;