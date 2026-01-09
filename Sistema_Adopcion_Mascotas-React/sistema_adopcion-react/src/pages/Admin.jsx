import React from "react";
import "../styles/Admin.css";

const Admin = () => {
  return (
    <div className="admin-layout">
      
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="logo">
          <h2>Administración</h2>
        </div>

        <nav className="nav-links">
          <a href="/admin">Dashboard</a>
          <a href="#">Mascotas</a>
          <a href="#">Solicitudes</a>
          <a href="#">Citas</a>
          <a href="#">Historial Médico</a>
        </nav>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="home-admin-container">
        <header className="header">
          <h1>Panel de Administración</h1>
        </header>

        <section className="intro">
          <p>
            Desde aquí puedes gestionar las mascotas, revisar solicitudes,
            administrar citas y controlar el proceso de adopción.
          </p>

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
