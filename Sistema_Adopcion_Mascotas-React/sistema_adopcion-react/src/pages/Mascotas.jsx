import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import Footer from "../components/Footer";
import "../styles/Mascotas.css";

const Mascotas = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // 🔹 Cargar mascotas desde la API
  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/mascotas");
        
        if (!response.ok) {
          throw new Error("Error al cargar las mascotas");
        }

        const data = await response.json();
        setMascotas(data);
        setCargando(false);
      } catch (error) {
        console.error("Error:", error);
        setError("No se pudieron cargar las mascotas");
        setCargando(false);
      }
    };

    cargarMascotas();
  }, []);

  // 🔹 Función para ver detalles
  const verDetalles = (mascotaId) => {
    navigate(`/mascota/${mascotaId}`);
  };

  // 🔹 Función para adoptar (verificar sesión)
  const iniciarAdopcion = (mascotaId) => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (!usuario) {
      setAlert({
        isOpen: true,
        title: "Sesión requerida",
        message: "Debes iniciar sesión o registrarte para adoptar una mascota",
        type: "warning"
      });
    } else {
      navigate(`/adoptar/${mascotaId}`);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
    
    // Si era alerta de sesión, redirigir a login
    if (alert.type === "warning" && alert.title === "Sesión requerida") {
      navigate("/login");
    }
  };

  // 🔹 Mientras carga
  if (cargando) {
    return (
      <section className="mascotas-section">
        <div className="cargando">
          <div className="loader-spinner"></div>
          <p>Cargando mascotas...</p>
        </div>
      </section>
    );
  }

  // 🔹 Si hay error
  if (error) {
    return (
      <section className="mascotas-section">
        <div className="error">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  // 🔹 Si no hay mascotas
  if (mascotas.length === 0) {
    return (
      <section className="mascotas-section">
        <h2 className="mascotas-title">Mascotas Disponibles</h2>
        <div className="mascotas-line"></div>
        <p className="sin-mascotas">No hay mascotas disponibles en este momento.</p>
      </section>
    );
  }

  return (
    <section className="mascotas-section">
      <div className="mascotas-header">
        <button className="btn-volver" onClick={() => navigate("/info-mascotas")}>
          ← Volver a Información
        </button>
        <h2 className="mascotas-title">Mascotas Disponibles para Adopción</h2>
        <p className="mascotas-subtitle">Encuentra a tu compañero perfecto</p>
      </div>

      <div className="mascotas-grid">
        {mascotas.map((mascota) => (
          <div className="mascota-card" key={mascota.id}>
            {/* 📸 Imagen de la mascota */}
            <div className="mascota-imagen">
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
              
              {/* Overlay simple con nombre y edad */}
              <div className="mascota-overlay-simple">
                <h3 className="NM">{mascota.nombre}</h3>
                <p> Edad: {mascota.edad ? `${mascota.edad}` : "Edad no especificada"}</p>
              </div>
            </div>

            {/* Info básica visible */}
            <div className="mascota-info">
              <div className="mascota-especie">
                <span className="especie-badge">{mascota.especie || "Mascota"}</span>
              </div>

              {/* Botones de acción */}
              <div className="mascota-acciones">
                <button 
                  className="btn-ver-detalles"
                  onClick={() => verDetalles(mascota.id)}
                >
                  Ver Detalles
                </button>
                <button 
                  className="btn-adoptar"
                  onClick={() => iniciarAdopcion(mascota.id)}
                >
                  Adoptar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Alerta personalizada */}
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={handleCloseAlert}
        title={alert.title}
        message={alert.message}
        type={alert.type}
      />
      <Footer />
    </section>
  );
};

export default Mascotas;