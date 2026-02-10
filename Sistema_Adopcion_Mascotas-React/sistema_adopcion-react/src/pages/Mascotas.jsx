import React, { useEffect, useState } from "react";
import "../styles/Mascotas.css";

const Mascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

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

  // 🔹 Mientras carga
  if (cargando) {
    return (
      <section className="mascotas-section">
        <div className="cargando">
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
      <h2 className="mascotas-title">Mascotas Disponibles</h2>
      <div className="mascotas-line"></div>

      <div className="mascotas-grid">
        {mascotas.map((mascota) => (
          <div className="mascota-card" key={mascota.id}>
            {/* 📸 Mostrar imagen desde el servidor o imagen por defecto */}
            <img 
              src={
                mascota.foto_url 
                  ? `http://localhost:4000${mascota.foto_url}` 
                  : "https://images.unsplash.com/photo-1558788353-f76d92427f16"
              } 
              alt={mascota.nombre}
              onError={(e) => {
                // Si la imagen no carga, poner una por defecto
                e.target.src = "https://images.unsplash.com/photo-1558788353-f76d92427f16";
              }}
            />

            <div className="mascota-overlay">
              <h3>{mascota.nombre}</h3>
              <p><strong>Edad:</strong> {mascota.edad || "No especificada"}</p>
              <p><strong>Sexo:</strong> {mascota.sexo || "No especificado"}</p>
              <p><strong>Especie:</strong> {mascota.especie || "No especificada"}</p>
              {mascota.raza && <p><strong>Raza:</strong> {mascota.raza}</p>}
              <p className="descripcion">{mascota.descripcion || "Sin descripción"}</p>

              <button className="btn-adoptar">Adoptar</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Mascotas;