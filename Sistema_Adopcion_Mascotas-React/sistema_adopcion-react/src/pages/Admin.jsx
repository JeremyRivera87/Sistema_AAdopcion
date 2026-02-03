import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import { useNavigate } from "react-router-dom";

const Admin = () => {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    usuarios: 0,
    mascotas: 0,
    solicitudes: 0,
    citas: 0,
  });

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || usuario.rol !== "admin") {
      navigate("/login");
    } else {
      cargarEstadisticas();
    }
  }, [navigate]);

  const cargarEstadisticas = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/admin/stats");
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error cargando estadísticas", error);
    }
  };

  return (
    <div className="admin-layout">

      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Animal Home</h2>
          <span>Panel Admin</span>
        </div>

        <nav className="nav-links">
          <a href="/admin">📊 Dashboard</a>
          <a href="/admin/mascotas">🐶 Mascotas</a>
          <a href="/admin/solicitudes">📄 Solicitudes</a>
          <a href="/admin/citas">📅 Citas</a>
          <a href="/admin/historial">🩺 Historial Médico</a>

          <a
            href="/login"
            className="logout"
            onClick={() => localStorage.removeItem("usuario")}
          >
            🚪 Cerrar sesión
          </a>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="home-admin-container">

        <header className="header">
          <h1>Panel de Administración</h1>
          <p>Control general del sistema Animal Home</p>
        </header>

        {/* CARDS */}
        <section className="admin-cards">

          <div className="admin-card">
            <h3>Usuarios</h3>
            <p>{stats.usuarios}</p>
          </div>

          <div className="admin-card">
            <h3>Mascotas</h3>
            <p>{stats.mascotas}</p>
          </div>

          <div className="admin-card">
            <h3>Solicitudes</h3>
            <p>{stats.solicitudes}</p>
          </div>

          <div className="admin-card">
            <h3>Citas</h3>
            <p>{stats.citas}</p>
          </div>

        </section>

        {/* ACCIONES */}
        <section className="intro">
          <h2>Acciones rápidas</h2>

          <div className="buttons">
            <button className="btn">Gestionar Mascotas</button>
            <button className="btn">Ver Solicitudes</button>
            <button className="btn">Citas Programadas</button>
            <button className="btn">Historial Médico</button>
          </div>
        </section>

      </main>
    </div>
  );
};

export default Admin;
