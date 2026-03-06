import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/Perfil.css";

const Perfil = () => {
  const navigate = useNavigate();
  const usuarioStorage = JSON.parse(localStorage.getItem("usuario"));

  const [activeSection, setActiveSection] = useState("dashboard");
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // Estados para datos completos del usuario
  const [datosUsuario, setDatosUsuario] = useState({
    nombre: "",
    cedula: "",
    email: "",
    telefono: "",
    direccion: "",
    edad: ""
  });

  const [formDataPerfil, setFormDataPerfil] = useState({
    nombre: "",
    email: "",
    telefono: "",
    direccion: "",
    edad: ""
  });

  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    passwordActual: "",
    passwordNuevo: "",
    confirmarPassword: ""
  }); 

  const [mostrarCambioContrasena, setMostrarCambioContrasena] = useState(false);

  // Estados para datos cargados
  const [solicitudes, setSolicitudes] = useState([]);
  const [citas, setCitas] = useState([]);
  const [donaciones, setDonaciones] = useState([]);
  const [stats, setStats] = useState({
    totalSolicitudes: 0,
    totalCitas: 0,
    totalDonaciones: 0,
    totalDonado: 0
  });

  // Verificar sesión
  useEffect(() => {
    if (!usuarioStorage) {
      navigate("/login");
    } else {
      cargarDatosCompletos();
      cargarDatosUsuario();
    }
  }, []);

  // Cargar datos completos del usuario
  const cargarDatosCompletos = async () => {
    try {
      const res = await fetch(`http://localhost:4000/api/usuarios/${usuarioStorage.id}`);
      const data = await res.json();
      
      setDatosUsuario(data);
      setFormDataPerfil({
        nombre: data.nombre || "",
        email: data.email || "",
        telefono: data.telefono || "",
        direccion: data.direccion || "",
        edad: data.edad || ""
      });
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  // Cargar todos los datos del usuario (solicitudes, citas, donaciones)
  const cargarDatosUsuario = async () => {
    setLoading(true);
    try {
      // Cargar solicitudes
      const resSolicitudes = await fetch(`http://localhost:4000/api/solicitudes/usuario/${usuarioStorage.id}`);
      const dataSolicitudes = await resSolicitudes.json();
      setSolicitudes(dataSolicitudes);

      // Cargar citas
      const resCitas = await fetch(`http://localhost:4000/api/citas/usuario/${usuarioStorage.id}`);
      const dataCitas = await resCitas.json();
      setCitas(dataCitas);

      // Cargar donaciones
      const resDonaciones = await fetch(`http://localhost:4000/api/donaciones/usuario/${usuarioStorage.id}`);
      const dataDonaciones = await resDonaciones.json();
      setDonaciones(dataDonaciones);

      // Calcular estadísticas
      const totalDonado = dataDonaciones
        .filter(d => d.tipo_donacion === "monetaria")
        .reduce((sum, d) => sum + parseFloat(d.monto || 0), 0);

      setStats({
        totalSolicitudes: dataSolicitudes.length,
        totalCitas: dataCitas.length,
        totalDonaciones: dataDonaciones.length,
        totalDonado: totalDonado.toFixed(2)
      });

    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePerfil = (e) => {
    setFormDataPerfil({
      ...formDataPerfil,
      [e.target.name]: e.target.value
    });
  };

  const handleChangePassword = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };


  const handleSavePerfil = async () => {
      if (formDataPerfil.edad < 18) {
    setAlert({
      isOpen: true,
      title: "Edad no permitida",
      message: "Debes ser mayor de 18 años para usar el sistema",
      type: "warning"
    });
    return;
  }
    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${usuarioStorage.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDataPerfil)
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar localStorage
        localStorage.setItem("usuario", JSON.stringify({ ...usuarioStorage, ...data }));
        
        setAlert({
          isOpen: true,
          title: "✅ Éxito",
          message: "Información actualizada correctamente",
          type: "success"
        });
        
        cargarDatosCompletos();
      } else {
        setAlert({
          isOpen: true,
          title: "Error",
          message: data.message || "No se pudo actualizar la información",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "Error de conexión con el servidor",
        type: "error"
      });
    }
  };

  const handleCambiarContrasena = async () => {
    // Validaciones
    if (!passwordData.passwordActual || !passwordData.passwordNuevo || !passwordData.confirmarPassword) {
      setAlert({
        isOpen: true,
        title: "Campos incompletos",
        message: "Debes completar todos los campos de contraseña",
        type: "warning"
      });
      return;
    }

    if (passwordData.passwordNuevo !== passwordData.confirmarPassword) {
      setAlert({
        isOpen: true,
        title: "Error",
        message: "Las contraseñas nuevas no coinciden",
        type: "error"
      });
      return;
    }

    if (passwordData.passwordNuevo.length < 6) {
      setAlert({
        isOpen: true,
        title: "Contraseña débil",
        message: "La contraseña debe tener al menos 6 caracteres",
        type: "warning"
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/usuarios/${usuarioStorage.id}/cambiar-password`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          passwordActual: passwordData.passwordActual,
          passwordNuevo: passwordData.passwordNuevo
        })
      });

      const data = await response.json();

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "✅ Éxito",
          message: "Contraseña actualizada correctamente",
          type: "success"
        });
        
        // Limpiar campos
        setPasswordData({
          passwordActual: "",
          passwordNuevo: "",
          confirmarPassword: ""
        });
        setMostrarCambioContrasena(false);
      } else {
        setAlert({
          isOpen: true,
          title: "Error",
          message: data.message || "No se pudo cambiar la contraseña",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "Error de conexión con el servidor",
        type: "error"
      });
    }
  };

  const cerrarSesion = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const volverInicio = () => {
    navigate("/");
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";
    try {
      const partes = fecha.split('T')[0].split('-');
      if (partes.length !== 3) return "Fecha no disponible";
      const [año, mes, dia] = partes;
      const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      return `${parseInt(dia)} de ${meses[parseInt(mes) - 1]} de ${año}`;
    } catch (error) {
      return "Fecha no disponible";
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };

  return (
    <div className="perfil-layout">

      {/* SIDEBAR */}
      <aside className="perfil-sidebar">
        <div className="perfil-usuario-info">
          <div className="perfil-avatar">
            {usuarioStorage?.nombre?.charAt(0).toUpperCase() || "U"}
          </div>
          <h3>{usuarioStorage?.nombre || "Usuario"}</h3>
          <p>{usuarioStorage?.email || ""}</p>
        </div>

        <nav className="perfil-menu">
          <button 
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            <span className="icon">📊</span>
            Dashboard
          </button>

          <button 
            className={activeSection === "info" ? "active" : ""}
            onClick={() => setActiveSection("info")}
          >
            <span className="icon">👤</span>
            Mi Información
          </button>

          <button 
            className={activeSection === "solicitudes" ? "active" : ""}
            onClick={() => setActiveSection("solicitudes")}
          >
            <span className="icon">📄</span>
            Mis Solicitudes
            {stats.totalSolicitudes > 0 && (
              <span className="badge">{stats.totalSolicitudes}</span>
            )}
          </button>

          <button 
            className={activeSection === "citas" ? "active" : ""}
            onClick={() => setActiveSection("citas")}
          >
            <span className="icon">📅</span>
            Mis Citas
            {stats.totalCitas > 0 && (
              <span className="badge">{stats.totalCitas}</span>
            )}
          </button>

          <button 
            className={activeSection === "donaciones" ? "active" : ""}
            onClick={() => setActiveSection("donaciones")}
          >
            <span className="icon">💰</span>
            Mis Donaciones
            {stats.totalDonaciones > 0 && (
              <span className="badge">{stats.totalDonaciones}</span>
            )}
          </button>

          <button className="logout-btn" onClick={cerrarSesion}>
            <span className="icon">🚪</span>
            Cerrar Sesión
          </button>
        </nav>
      </aside>

      {/* CONTENIDO */}
      <main className="perfil-content">
          <div className="perfil-top-bar">
            <button className="btn-volver-inicio" onClick={volverInicio}>
              ← Volver al inicio
            </button>
          </div>

        {/* DASHBOARD */}
        {activeSection === "dashboard" && (
          <div className="dashboard-section">
            <div className="section-header">
              <h2>Bienvenido, {usuarioStorage?.nombre}</h2>
              <p>Aquí puedes ver un resumen de tu actividad en Animal Home</p>
            </div>

            <div className="stats-grid">
              <div className="stat-card solicitudes">
                <div className="stat-icon">📄</div>
                <div className="stat-info">
                  <h3>{stats.totalSolicitudes}</h3>
                  <p>Solicitudes de Adopción</p>
                </div>
              </div>

              <div className="stat-card citas">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <h3>{stats.totalCitas}</h3>
                  <p>Citas Agendadas</p>
                </div>
              </div>

              <div className="stat-card donaciones">
                <div className="stat-icon">💰</div>
                <div className="stat-info">
                  <h3>{stats.totalDonaciones}</h3>
                  <p>Donaciones Realizadas</p>
                </div>
              </div>

              <div className="stat-card total">
                <div className="stat-icon">💵</div>
                <div className="stat-info">
                  <h3>${stats.totalDonado}</h3>
                  <p>Total Donado</p>
                </div>
              </div>
            </div>

            <div className="acciones-rapidas">
              <h3>Acciones Rápidas</h3>
              <div className="acciones-grid"> 
                <button className="accion-btn" onClick={() => navigate("/info-citas")}>
                  📅 Agendar Cita
                </button>
                <button className="accion-btn" onClick={() => navigate("/donaciones")}>
                  💝 Hacer Donación
                </button>
                <button className="accion-btn" onClick={() => setActiveSection("info")}>
                  ⚙️ Editar Perfil
                </button>
              </div>
            </div>
          </div>
        )}

        {/* INFORMACIÓN PERSONAL */}
        {activeSection === "info" && (
          <div className="info-section">
            <div className="section-header">
              <h2>Mi Información Personal</h2>
              <p>Actualiza tus datos personales (la cédula no puede modificarse)</p>
            </div>

            <div className="info-card">
              <form className="info-form">
                
                <div className="form-group-perfil">
                  <label>Cédula de Identidad</label>
                  <input
                    type="text"
                    value={datosUsuario.cedula || ""}
                    disabled
                    className="input-disabled"
                  />
                  <small>🔒 La cédula no puede ser modificada</small>
                </div>

                <div className="form-group-perfil">
                  <label>Nombre Completo *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formDataPerfil.nombre}
                    onChange={handleChangePerfil}
                    placeholder="Tu nombre completo"
                    required
                  />
                </div>

                <div className="form-group-perfil">
                  <label>Correo Electrónico *</label>
                  <input
                    type="email"
                    name="email"
                    value={formDataPerfil.email}
                    onChange={handleChangePerfil}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-group-perfil">
                  <label>Edad *</label>
                <input
                  type="number"
                  name="edad"
                  value={formDataPerfil.edad}
                  onChange={handleChangePerfil}
                  placeholder="Tu edad"
                  min="18"
                  required
                />
                  <small>🔞 Debes ser mayor de 18 años</small>
              </div>
                <div className="form-group-perfil">
                  <label>Teléfono</label>
                  <input
                    type="text"
                    name="telefono"
                    value={formDataPerfil.telefono}
                    onChange={handleChangePerfil}
                    placeholder="0999999999"
                  />
                </div>

                <div className="form-group-perfil">
                  <label>Dirección</label>
                  <input
                    type="text"
                    name="direccion"
                    value={formDataPerfil.direccion}
                    onChange={handleChangePerfil}
                    placeholder="Tu dirección completa"
                  />
                </div>

                <button type="button" className="save-btn" onClick={handleSavePerfil}>
                  💾 Guardar Cambios
                </button>
              </form>
            </div>

            {/* SECCIÓN CAMBIAR CONTRASEÑA */}
            <div className="password-section">
              <button 
                className="btn-mostrar-password"
                onClick={() => setMostrarCambioContrasena(!mostrarCambioContrasena)}
              >
                {mostrarCambioContrasena ? "🔒 Ocultar Cambio de Contraseña" : "🔓 Cambiar Contraseña"}
              </button>

              {mostrarCambioContrasena && (
                <div className="password-card">
                  <h3>Cambiar Contraseña</h3>
                  <p className="password-subtitle">Por seguridad, necesitamos verificar tu contraseña actual</p>

                  <div className="password-form">
                    <div className="form-group-perfil">
                      <label>Contraseña Actual *</label>
                      <input
                        type="password"
                        name="passwordActual"
                        value={passwordData.passwordActual}
                        onChange={handleChangePassword}
                        placeholder="Tu contraseña actual"
                      />
                    </div>

                    <div className="form-group-perfil">
                      <label>Nueva Contraseña *</label>
                      <input
                        type="password"
                        name="passwordNuevo"
                        value={passwordData.passwordNuevo}
                        onChange={handleChangePassword}
                        placeholder="Mínimo 8 caracteres"
                      />
                    </div>

                    <div className="form-group-perfil">
                      <label>Confirmar Nueva Contraseña *</label>
                      <input
                        type="password"
                        name="confirmarPassword"
                        value={passwordData.confirmarPassword}
                        onChange={handleChangePassword}
                        placeholder="Repite la nueva contraseña"
                      />
                    </div>

                    <button 
                      type="button" 
                      className="save-btn-password" 
                      onClick={handleCambiarContrasena}
                    >
                      🔐 Actualizar Contraseña
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MIS SOLICITUDES */}
        {activeSection === "solicitudes" && (
          <div className="solicitudes-section">
            <div className="section-header">
              <h2>Mis Solicitudes de Adopción</h2>
              <p>Revisa el estado de tus solicitudes</p>
            </div>

            {loading ? (
              <div className="loading-section">
                <div className="loader-spinner"></div>
                <p>Cargando solicitudes...</p>
              </div>
            ) : solicitudes.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📄</div>
                <h3>No tienes solicitudes</h3>
                <p>Aún no has enviado ninguna solicitud de adopción</p>
                <button className="btn-empty" onClick={() => navigate("/mascotas")}>
                  Ver Mascotas Disponibles
                </button>
              </div>
            ) : (
              <div className="solicitudes-lista">
                {solicitudes.map((solicitud) => (
                  <div key={solicitud.id} className="solicitud-item">
                    <div className="solicitud-header">
                      <h3>Solicitud para {solicitud.mascota_nombre}</h3>
                      <span className={`estado-badge ${solicitud.estado}`}>
                        {solicitud.estado}
                      </span>
                    </div>
                    <div className="solicitud-info">
                      <p><strong>Fecha:</strong> {formatearFecha(solicitud.fecha_solicitud)}</p>
                      <p><strong>Motivo:</strong> {solicitud.motivo_adopcion}</p>
                      {solicitud.notas_admin && (
                        <div className="notas-admin">
                          <strong>Notas del administrador:</strong>
                          <p>{solicitud.notas_admin}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MIS CITAS */}
        {activeSection === "citas" && (
          <div className="citas-section">
            <div className="section-header">
              <h2>Mis Citas Agendadas</h2>
              <p>Administra tus citas programadas</p>
            </div>

            {loading ? (
              <div className="loading-section">
                <div className="loader-spinner"></div>
                <p>Cargando citas...</p>
              </div>
            ) : citas.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📅</div>
                <h3>No tienes citas agendadas</h3>
                <p>Agenda una cita para conocer a tu futura mascota</p>
                <button className="btn-empty" onClick={() => navigate("/info-citas")}>
                  Agendar una Cita
                </button>
              </div>
            ) : (
              <div className="citas-lista">
                {citas.map((cita) => (
                  <div key={cita.id} className="cita-item">
                    <div className="cita-header">
                      <h3>Cita con {cita.mascota_nombre}</h3>
                      <span className={`estado-badge ${cita.estado}`}>
                        {cita.estado || "pendiente"}
                      </span>
                    </div>
                    <div className="cita-info">
                      <p><strong>📅 Fecha:</strong> {formatearFecha(cita.fecha)}</p>
                      <p><strong>🕐 Hora:</strong> {cita.hora}</p>
                      <p><strong>📝 Motivo:</strong> {cita.motivo}</p>
                      {cita.notas && <p><strong>Notas:</strong> {cita.notas}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MIS DONACIONES */}
        {activeSection === "donaciones" && (
          <div className="donaciones-section">
            <div className="section-header">
              <h2>Mis Donaciones</h2>
              <p>Historial de tus contribuciones</p>
            </div>

            {loading ? (
              <div className="loading-section">
                <div className="loader-spinner"></div>
                <p>Cargando donaciones...</p>
              </div>
            ) : donaciones.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">💰</div>
                <h3>No has realizado donaciones</h3>
                <p>Tu ayuda puede cambiar la vida de muchos animales</p>
                <button className="btn-empty" onClick={() => navigate("/donaciones")}>
                  Hacer una Donación
                </button>
              </div>
            ) : (
              <div className="donaciones-lista">
                {donaciones.map((donacion) => (
                  <div key={donacion.id} className="donacion-item">
                    <div className="donacion-header">
                      <h3>
                        {donacion.tipo_donacion === "monetaria" ? "💵 Donación Monetaria" : "📦 Donación en Especie"}
                      </h3>
                      <span className="donacion-fecha">{formatearFecha(donacion.fecha)}</span>
                    </div>
                    <div className="donacion-info">
                      {donacion.tipo_donacion === "monetaria" ? (
                        <>
                          <p className="donacion-monto">${donacion.monto}</p>
                          <p><strong>Método:</strong> {donacion.metodo_pago}</p>
                        </>
                      ) : (
                        <>
                          <p><strong>Artículo:</strong> {donacion.articulo}</p>
                          <p><strong>Cantidad:</strong> {donacion.cantidad}</p>
                          <p><strong>Estado:</strong> {donacion.estado_articulo}</p>
                        </>
                      )}
                      {donacion.mensaje && (
                        <p className="donacion-mensaje">💬 {donacion.mensaje}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* Alerta */}
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

export default Perfil;