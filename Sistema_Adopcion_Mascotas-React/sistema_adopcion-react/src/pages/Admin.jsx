import React, { useEffect, useState } from "react";
import "../styles/Admin.css";
import { useNavigate, useLocation } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState({
    usuarios: 0,
    mascotas: 0,
    solicitudes: 0,
    citas: 0,
  });

  const [cargando, setCargando] = useState(true);

  const cargarEstadisticas = async () => {
    setCargando(true);
    try {
      const resStats = await fetch("http://localhost:4000/api/admin/stats");
      const dataStats = await resStats.json();

      const resMascotas = await fetch("http://localhost:4000/api/mascotas");
      const dataMascotas = await resMascotas.json();

      const resCitas = await fetch("http://localhost:4000/api/citas");
      const dataCitas = await resCitas.json();

      setStats({
        usuarios: dataStats.usuarios || 0,
        mascotas: dataMascotas.length || 0,
        solicitudes: dataStats.solicitudes || 0,
        citas: dataCitas.length || 0,
      });
    } catch (error) {
      console.error("Error cargando estadísticas", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario || usuario.rol !== "admin") {
      navigate("/login");
      return;
    }

    cargarEstadisticas();
  }, [location, navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
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
          <a onClick={() => navigate("/admin")}>📊 Dashboard</a>
          <a onClick={() => navigate("/admin/mascotas")}>🐶 Mascotas</a>
          <a onClick={() => navigate("/admin/solicitudes")}>📄 Solicitudes</a>
          <a onClick={() => navigate("/admin/citas")}>📅 Citas</a>
          <a onClick={() => navigate("/admin/historial")}>🩺 Historial Médico</a>

          <a className="logout" onClick={cerrarSesion}>
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

        {cargando ? (
          <p style={{ textAlign: "center", padding: "40px", color: "#666" }}>
            Cargando estadísticas...
          </p>
        ) : (
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
        )}

        <section className="intro">
          <h2>Acciones rápidas</h2>

          <div className="buttons">
            <button className="btn" onClick={() => navigate("/admin/mascotas")}>
              Gestionar Mascotas
            </button>
            <button className="btn" onClick={() => navigate("/admin/solicitudes")}>
              Ver Solicitudes
            </button>
            <button className="btn" onClick={() => navigate("/admin/citas")}>
              Citas Programadas
            </button>
            <button className="btn" onClick={() => navigate("/admin/historial")}>
              Historial Médico
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Admin;
