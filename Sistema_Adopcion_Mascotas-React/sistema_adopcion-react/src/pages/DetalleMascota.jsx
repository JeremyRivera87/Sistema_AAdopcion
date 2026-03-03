import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/DetalleMascota.css";

const DetalleMascota = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [mascota, setMascota] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  useEffect(() => {
    const cargarMascota = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:4000/api/mascotas/${id}`);
        
        if (!response.ok) {
          throw new Error("Mascota no encontrada");
        }

        const data = await response.json();
        setMascota(data);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    cargarMascota();
  }, [id]);

  // 🔹 Función para verificar sesión antes de adoptar
  const handleAdoptar = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (!usuario) {
      setAlert({
        isOpen: true,
        title: "Sesión requerida",
        message: "Debes iniciar sesión o registrarte para adoptar una mascota",
        type: "warning"
      });
    } else {
      navigate(`/adoptar/${id}`);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
    
    // Si era alerta de sesión, redirigir a login
    if (alert.type === "warning" && alert.title === "Sesión requerida") {
      navigate("/login");
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "No especificada";
    const date = new Date(fecha + 'T00:00:00');
    return date.toLocaleDateString('es-EC', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="detalle-loading">
        <div className="loader-spinner"></div>
        <p>Cargando información...</p>
      </div>
    );
  }

  if (error || !mascota) {
    return (
      <div className="detalle-error">
        <h2>😔 Mascota no encontrada</h2>
        <p>{error}</p>
        <button className="btn-volver" onClick={() => navigate("/Mascotas")}>
          Volver a ver mascotas
        </button>
      </div>
    );
  }

  return (
    <div className="detalle-mascota-page">
      
      {/* Header con navegación */}
      <div className="detalle-header">
        <button className="btn-atras" onClick={() => navigate("/Mascotas")}>
          ← Volver al Catálogo
        </button>
      </div>

      {/* Información principal */}
      <div className="detalle-container">
        
        {/* Columna izquierda - Imagen */}
        <div className="detalle-imagen-section">
          <div className="imagen-principal">
            <img 
              src={
                mascota.foto_url 
                  ? `http://localhost:4000${mascota.foto_url}` 
                  : "https://images.unsplash.com/photo-1558788353-f76d92427f16"
              }
              alt={mascota.nombre}
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1558788353-f76d92427f16";
              }}
            />
          </div>
          
          {/* Botón de adopción destacado - CON VALIDACIÓN */}
          <button 
            className="btn-adoptar-grande"
            onClick={handleAdoptar}
          >
            ❤️ Quiero Adoptar a {mascota.nombre}
          </button>
        </div>

        {/* Columna derecha - Información */}
        <div className="detalle-info-section">
          
          {/* Nombre y especie */}
          <div className="detalle-nombre">
            <h1>{mascota.nombre}</h1>
            <span className="especie-badge">{mascota.especie}</span>
          </div>

          {/* Información básica */}
          <div className="info-basica">
            <div className="info-item">
              <span className="info-label">🎂 Edad:</span>
              <span className="info-value">{mascota.edad || "No especificada"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">⚧ Sexo:</span>
              <span className="info-value">{mascota.sexo || "No especificado"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🐾 Raza:</span>
              <span className="info-value">{mascota.raza || "Mestizo"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">📏 Tamaño:</span>
              <span className="info-value">{mascota.tamaño || "No especificado"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">⚖️ Peso:</span>
              <span className="info-value">{mascota.peso || "No especificado"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">🎨 Color:</span>
              <span className="info-value">{mascota.color || "No especificado"}</span>
            </div>
          </div>

          {/* Descripción */}
          {mascota.descripcion && (
            <div className="descripcion-completa">
              <h3>📖 Sobre {mascota.nombre}</h3>
              <p>{mascota.descripcion}</p>
            </div>
          )}

          {/* Estado de salud */}
          <div className="estado-salud">
            <h3>🏥 Estado de Salud</h3>
            <div className="salud-items">
              <div className={`salud-item ${mascota.vacunado ? 'activo' : 'inactivo'}`}>
                <span className="salud-icon">{mascota.vacunado ? '✅' : '❌'}</span>
                <span>Vacunado</span>
              </div>
              <div className={`salud-item ${mascota.esterilizado ? 'activo' : 'inactivo'}`}>
                <span className="salud-icon">{mascota.esterilizado ? '✅' : '❌'}</span>
                <span>Esterilizado</span>
              </div>
              <div className={`salud-item ${mascota.desparasitado ? 'activo' : 'inactivo'}`}>
                <span className="salud-icon">{mascota.desparasitado ? '✅' : '❌'}</span>
                <span>Desparasitado</span>
              </div>
            </div>
          </div>

          {/* Historial Médico */}
          <div className="historial-medico-section">
            <h3>📋 Historial Médico</h3>
            
            {mascota.historial_medico && mascota.historial_medico.length > 0 ? (
              <div className="historial-lista">
                {mascota.historial_medico.map((registro) => (
                  <div key={registro.id} className="historial-item">
                    <div className="historial-header">
                      <span className="historial-tipo">{registro.tipo}</span>
                      <span className="historial-fecha">{formatearFecha(registro.fecha)}</span>
                    </div>
                    <p className="historial-descripcion">{registro.descripcion}</p>
                    {registro.veterinario && (
                      <p className="historial-veterinario">👨‍⚕️ Dr/a. {registro.veterinario}</p>
                    )}
                    {registro.proxima_cita && (
                      <p className="historial-proxima">
                        📅 Próxima cita: {formatearFecha(registro.proxima_cita)}
                      </p>
                    )}
                    {registro.notas && (
                      <p className="historial-notas">📝 {registro.notas}</p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="sin-historial">No hay registros médicos disponibles</p>
            )}
          </div>

        </div>
      </div>

      {/* Banner final de adopción - CON VALIDACIÓN */}
      <div className="banner-adopcion">
        <h2>¿{mascota.nombre} robó tu corazón? 💚</h2>
        <p>Inicia el proceso de adopción y dale el hogar que merece</p>
        <button 
          className="btn-adoptar-banner"
          onClick={handleAdoptar}
        >
          Iniciar Proceso de Adopción
        </button>
      </div>

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

export default DetalleMascota;