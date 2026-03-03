import React, { useState } from "react";
import "../styles/Perfil.css";

const Perfil = () => {

  const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));

  const [activeSection, setActiveSection] = useState("info");

  const [formData, setFormData] = useState({
    nombre: usuarioStorage?.nombre || "",
    email: usuarioStorage?.email || "",
    telefono: usuarioStorage?.telefono || ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    localStorage.setItem("usuario", JSON.stringify(formData));
    alert("Información actualizada correctamente");
  };

  return (
    <div className="perfil-container">

      {/* SIDEBAR */}
      <aside className="perfil-sidebar">
        <h2>Mi Perfil</h2>

        <button onClick={() => setActiveSection("info")}>
          Información Personal
        </button>

        <button onClick={() => setActiveSection("citas")}>
          Mis Citas
        </button>

        <button onClick={() => setActiveSection("donaciones")}>
          Mis Donaciones
        </button>
      </aside>

      {/* CONTENIDO */}
      <main className="perfil-content">

        {activeSection === "info" && (
          <div className="perfil-card">
            <h3>Editar Información</h3>

            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <label>Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />

            <button className="save-btn" onClick={handleSave}>
              Guardar Cambios
            </button>
          </div>
        )}

        {activeSection === "citas" && (
          <div className="perfil-card">
            <h3>Mis Citas Agendadas</h3>
            <p>No tienes citas registradas actualmente.</p>
          </div>
        )}

        {activeSection === "donaciones" && (
          <div className="perfil-card">
            <h3>Mis Donaciones</h3>
            <p>No has realizado donaciones aún.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default Perfil;