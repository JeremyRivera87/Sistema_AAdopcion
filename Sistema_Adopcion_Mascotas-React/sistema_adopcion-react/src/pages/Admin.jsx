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
    donaciones: 0,
    totalRecaudado: "0.00",
  });

  const [cargando, setCargando] = useState(true);
  
  // ← NUEVO: Estado para modal de selección de mascota
  const [modalMascotasAbierto, setModalMascotasAbierto] = useState(false);
  const [mascotas, setMascotas] = useState([]);
  const [loadingMascotas, setLoadingMascotas] = useState(false);

  const cargarEstadisticas = async () => {
    setCargando(true);
    try {
      const resStats = await fetch("http://localhost:4000/api/admin/stats");
      const dataStats = await resStats.json();

      const resMascotas = await fetch("http://localhost:4000/api/mascotas");
      const dataMascotas = await resMascotas.json();

      const resCitas = await fetch("http://localhost:4000/api/citas");
      const dataCitas = await resCitas.json();

      const resDonaciones = await fetch("http://localhost:4000/api/donaciones");
      const dataDonaciones = await resDonaciones.json();

      const resSolicitudes = await fetch("http://localhost:4000/api/solicitudes");
      const dataSolicitudes = await resSolicitudes.json();

      const resVoluntariado = await fetch("http://localhost:4000/api/voluntariado/stats/general");
      const dataVoluntariado = await resVoluntariado.json();

      const totalRecaudado = dataDonaciones
        .filter(d => d.tipo_donacion === "monetaria")
        .reduce((sum, d) => sum + parseFloat(d.monto || 0), 0);

      setStats({
        usuarios: dataStats.usuarios || 0,
        mascotas: dataMascotas.length || 0,
        solicitudes: dataSolicitudes.length || 0,
        citas: dataCitas.length || 0,
        donaciones: dataDonaciones.length || 0,
        totalRecaudado: totalRecaudado.toFixed(2),
        solicitudesVoluntarios: dataVoluntariado.total || 0 
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

  // ← NUEVO: Abrir modal y cargar mascotas
  const abrirSelectorMascotas = async () => {
    setModalMascotasAbierto(true);
    setLoadingMascotas(true);
    
    try {
      const res = await fetch("http://localhost:4000/api/mascotas");
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    } finally { 
      setLoadingMascotas(false);
    }
  };

  // ← NUEVO: Seleccionar mascota y navegar
  const seleccionarMascota = (mascotaId) => {
    setModalMascotasAbierto(false);
    navigate(`/admin/historial/${mascotaId}`);
  };

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
          <a onClick={() => navigate("/admin")} style={{ cursor: "pointer" }}>📊 Dashboard</a>
          <a onClick={() => navigate("/admin/mascotas")} style={{ cursor: "pointer" }}>🐶 Mascotas</a>
          <a onClick={() => navigate("/admin/solicitudes")} style={{ cursor: "pointer" }}>📄 Solicitudes</a>
          <a onClick={() => navigate("/admin/citas")} style={{ cursor: "pointer" }}>📅 Citas</a>
          <a onClick={() => navigate("/admin/donaciones")} style={{ cursor: "pointer" }}>💰 Donaciones</a>
          <a onClick={abrirSelectorMascotas} style={{ cursor: "pointer" }}>🩺 Historial Médico</a>
          <a onClick={() => navigate("/admin/voluntariado")} style={{ cursor: "pointer" }}>🙋 Voluntariado</a>
          <a onClick={() => navigate("/admin/avisos")} style={{ cursor: "pointer" }}>📢 Avisos Carousel</a> 

          <a className="logout" onClick={cerrarSesion} style={{ cursor: "pointer" }}>
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

            <div className="admin-card">
              <h3>Donaciones</h3>
              <p>{stats.donaciones}</p>
            </div>

            <div className="admin-card donaciones-card">
              <h3>Total Recaudado</h3>
              <p>${stats.totalRecaudado}</p>
            </div>

            <div className="admin-card donaciones-card">
              <h3>Solicitud Voluntarios</h3>
              <p>{stats.solicitudesVoluntarios}</p>
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
            <button className="btn" onClick={abrirSelectorMascotas}>
              Historial Médico
            </button>
            <button className="btn" onClick={() => navigate("/admin/donaciones")}>
              Gestionar Donaciones
            </button>
          </div>
        </section>
      </main>

      {/* ← NUEVO: MODAL SELECTOR DE MASCOTAS */}
      {modalMascotasAbierto && (
        <div className="modal-overlay-selector" onClick={() => setModalMascotasAbierto(false)}>
          <div className="modal-content-selector" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-selector">
              <h2>Selecciona una Mascota</h2>
              <button 
                className="btn-cerrar-modal-selector" 
                onClick={() => setModalMascotasAbierto(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body-selector">
              {loadingMascotas ? (
                <div className="loading-selector">
                  <div className="loader-spinner"></div>
                  <p>Cargando mascotas...</p>
                </div>
              ) : mascotas.length === 0 ? (
                <div className="sin-mascotas-selector">
                  <p>No hay mascotas registradas</p>
                  <button onClick={() => {
                    setModalMascotasAbierto(false);
                    navigate("/admin/mascotas");
                  }}>
                    Agregar Mascota
                  </button>
                </div>
              ) : (
                <div className="mascotas-grid-selector">
                  {mascotas.map((mascota) => (
                    <div 
                      key={mascota.id} 
                      className="mascota-card-selector"
                      onClick={() => seleccionarMascota(mascota.id)}
                    >
                      <div className="mascota-foto-selector">
                        {mascota.foto_url ? (
                          <img 
                            src={`http://localhost:4000${mascota.foto_url}`} 
                            alt={mascota.nombre}
                          />
                        ) : (
                          <div className="sin-foto-selector">🐾</div>
                        )}
                      </div>
                      <div className="mascota-info-selector">
                        <h3>{mascota.nombre}</h3>
                        <p>{mascota.especie} • {mascota.raza || "Mestizo"}</p>
                        <span className="ver-historial-btn">Ver Historial →</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;