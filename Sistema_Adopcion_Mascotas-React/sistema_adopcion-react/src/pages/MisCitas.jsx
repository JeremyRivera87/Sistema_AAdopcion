import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MisCitas.css";

const MisCitas = () => {
  const navigate = useNavigate();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);

  // 🔹 Verificar sesión y cargar citas
  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    
    if (!usuarioLocal) {
      alert("Debes iniciar sesión para ver tus citas");
      navigate("/login");
      return;
    }

    setUsuario(usuarioLocal);
    cargarCitas(usuarioLocal.id);
  }, [navigate]);

  // 🔹 Cargar citas del usuario
  const cargarCitas = async (usuario_id) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:4000/api/citas/usuario/${usuario_id}`);
      const data = await response.json();
      setCitas(data);
    } catch (error) {
      console.error("Error al cargar citas:", error);
      alert("Error al cargar tus citas");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cancelar cita
  const cancelarCita = async (citaId) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar esta cita?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/citas/${citaId}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Cita cancelada exitosamente");
        cargarCitas(usuario.id); // Recargar citas
      } else {
        alert("Error al cancelar la cita");
      }
    } catch (error) {
      console.error("Error al cancelar cita:", error);
      alert("Error de conexión con el servidor");
    }
  };

  // 🔹 Obtener clase de estado
  const obtenerClaseEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return 'estado-pendiente';
      case 'confirmada': return 'estado-confirmada';
      case 'cancelada': return 'estado-cancelada';
      case 'completada': return 'estado-completada';
      default: return 'estado-pendiente';
    }
  };

  // 🔹 Formatear fecha
  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
  
  const soloFecha = fecha.split('T')[0];
  const [año, mes, dia] = soloFecha.split('-');
  
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
  
  return `${dia} de ${meses[parseInt(mes) - 1]} de ${año}`;
};

  // 🔹 Formatear hora
  const formatearHora = (hora) => {
    const [h, m] = hora.split(':');
    const hours = parseInt(h);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hour12 = hours % 12 || 12;
    return `${hour12}:${m} ${ampm}`;
  };

  return (
    <div className="mis-citas-container">
      <div className="mis-citas-header">
        <button className="btn-volver" onClick={() => navigate("/")}>
          ← Volver al Inicio
        </button>
        <h1>Mis Citas Agendadas</h1>
        <p className="subtitle">Aquí puedes ver y gestionar tus citas de adopción</p>
      </div>

      {loading ? (
        <div className="loading">
          <p>Cargando tus citas...</p>
        </div>
      ) : citas.length === 0 ? (
        <div className="sin-citas">
          <div className="sin-citas-icon">📅</div>
          <h2>No tienes citas agendadas</h2>
          <p>¿Te gustaría conocer a tu futura mascota?</p>
          <button className="btn-agendar-nueva" onClick={() => navigate("/agendar-cita")}>
            Agendar una Cita
          </button>
        </div>
      ) : (
        <div className="citas-grid">
          {citas.map((cita) => (
            <div key={cita.id} className="cita-card">
              {/* Imagen de la mascota */}
              <div className="cita-imagen">
                {cita.mascota_foto ? (
                  <img 
                    src={`http://localhost:4000${cita.mascota_foto}`} 
                    alt={cita.mascota_nombre}
                  />
                ) : (
                  <div className="sin-imagen">🐾</div>
                )}
              </div>

              {/* Información de la cita */}
              <div className="cita-info">
                <h3>{cita.mascota_nombre}</h3>
                <p className="cita-especie">{cita.mascota_especie}</p>

                <div className="cita-detalles">
                  <div className="detalle">
                    <span className="icon">📅</span>
                    <span>{formatearFecha(cita.fecha)}</span>
                  </div>
                  <div className="detalle">
                    <span className="icon">🕐</span>
                    <span>{formatearHora(cita.hora)}</span>
                  </div>
                  <div className="detalle">
                    <span className="icon">📋</span>
                    <span>{cita.motivo}</span>
                  </div>
                </div>

                {cita.notas && (
                  <div className="cita-notas">
                    <strong>Notas:</strong>
                    <p>{cita.notas}</p>
                  </div>
                )}

                {/* Estado */}
                <div className={`cita-estado ${obtenerClaseEstado(cita.estado)}`}>
                  {cita.estado.charAt(0).toUpperCase() + cita.estado.slice(1)}
                </div>

                {/* Botones de acción */}
                {cita.estado === 'pendiente' && (
                  <div className="cita-acciones">
                    <button 
                      className="btn-cancelar"
                      onClick={() => cancelarCita(cita.id)}
                    >
                      Cancelar Cita
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botón flotante para agendar nueva cita */}
      {citas.length > 0 && (
        <button 
          className="btn-flotante"
          onClick={() => navigate("/agendar-cita")}
          title="Agendar nueva cita"
        >
          +
        </button>
      )}
    </div>
  );
};

export default MisCitas;