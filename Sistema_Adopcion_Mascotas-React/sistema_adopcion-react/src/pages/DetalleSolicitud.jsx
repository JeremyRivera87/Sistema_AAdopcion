import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/DetalleSolicitud.css";

const DetalleSolicitud = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [solicitud, setSolicitud] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarSolicitud();
  }, [id]);

  const cargarSolicitud = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/solicitudes/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSolicitud(data);
      } else {
        alert("Solicitud no encontrada");
        navigate("/admin/solicitudes");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al cargar la solicitud");
    } finally {
      setLoading(false);
    }
  };

  const cambiarEstado = async (nuevoEstado) => {
    let notas = "";
    if (nuevoEstado === "rechazada") {
      notas = prompt("Motivo del rechazo:");
      if (!notas) return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/solicitudes/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado, notas_admin: notas })
      });

      if (response.ok) {
        alert(`Solicitud marcada como ${nuevoEstado}`);
        cargarSolicitud();
      } else {
        alert("Error al cambiar el estado");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "No especificada";
    const date = new Date(fecha);
    return date.toLocaleDateString('es-EC', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const obtenerColorEstado = (estado) => {
    switch(estado) {
      case 'pendiente': return '#f59e0b';
      case 'en_revision': return '#3b82f6';
      case 'aprobada': return '#10b981';
      case 'rechazada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  if (loading) {
    return (
      <div className="detalle-loading">
        <div className="loader-spinner"></div>
        <p>Cargando solicitud...</p>
      </div>
    );
  }

  if (!solicitud) {
    return (
      <div className="detalle-error">
        <h2>Solicitud no encontrada</h2>
        <button onClick={() => navigate("/admin/solicitudes")}>Volver</button>
      </div>
    );
  }

  return (
    <div className="detalle-solicitud-page">
      
      {/* Header */}
      <div className="detalle-header">
        <button className="btn-volver-solicitudes" onClick={() => navigate("/admin/solicitudes")}>
          ← Volver a Solicitudes
        </button>
        
        <div className="header-info">
          <div className="titulo-solicitud">
            <h1>Solicitud de Adopción #{solicitud.id}</h1>
            <span 
              className="estado-badge" 
              style={{ background: obtenerColorEstado(solicitud.estado) }}
            >
              {solicitud.estado}
            </span>
          </div>
          <p className="fecha-solicitud">Recibida el {formatearFecha(solicitud.created_at)}</p>
        </div>

        {/* Botones de acción */}
        <div className="acciones-header">
          {solicitud.estado === "pendiente" && (
            <button className="btn-accion revisar" onClick={() => cambiarEstado("en_revision")}>
              🔍 Marcar en Revisión
            </button>
          )}
          
          {solicitud.estado === "en_revision" && (
            <>
              <button className="btn-accion aprobar" onClick={() => cambiarEstado("aprobada")}>
                ✅ Aprobar Adopción
              </button>
              <button className="btn-accion rechazar" onClick={() => cambiarEstado("rechazada")}>
                ❌ Rechazar
              </button>
            </>
          )}
        </div>
      </div>

      <div className="detalle-content">
        
        {/* Columna izquierda - Info de la mascota */}
        <div className="mascota-sidebar">
          <div className="mascota-card">
            <h3>Mascota Solicitada</h3>
            <div className="mascota-imagen">
              {solicitud.mascota_foto ? (
                <img 
                  src={`http://localhost:4000${solicitud.mascota_foto}`} 
                  alt={solicitud.mascota_nombre}
                />
              ) : (
                <div className="sin-foto">Sin foto</div>
              )}
            </div>
            <h2>{solicitud.mascota_nombre}</h2>
            <p>{solicitud.mascota_especie}</p>
            <button 
              className="btn-ver-mascota"
              onClick={() => navigate(`/mascota/${solicitud.mascota_id}`)}
            >
              Ver Perfil Completo
            </button>
          </div>

          {/* Documentos */}
          <div className="documentos-card">
            <h3>📎 Documentos Adjuntos</h3>
            <div className="documentos-lista">
              {solicitud.cedula_url && (
                <a href={`http://localhost:4000${solicitud.cedula_url}`} target="_blank" rel="noopener noreferrer" className="doc-link">
                  📄 Cédula de Identidad
                </a>
              )}
              {solicitud.servicio_basico_url && (
                <a href={`http://localhost:4000${solicitud.servicio_basico_url}`} target="_blank" rel="noopener noreferrer" className="doc-link">
                  📄 Servicio Básico
                </a>
              )}
              {solicitud.foto_vivienda_url && (
                <a href={`http://localhost:4000${solicitud.foto_vivienda_url}`} target="_blank" rel="noopener noreferrer" className="doc-link">
                  🏠 Foto de Vivienda
                </a>
              )}
              {solicitud.foto_jardin_url && (
                <a href={`http://localhost:4000${solicitud.foto_jardin_url}`} target="_blank" rel="noopener noreferrer" className="doc-link">
                  🌳 Foto de Jardín
                </a>
              )}
            </div>
          </div>

          {/* Notas del admin */}
          {solicitud.notas_admin && (
            <div className="notas-admin-card">
              <h3>📝 Notas del Administrador</h3>
              <p>{solicitud.notas_admin}</p>
              <small>Fecha: {formatearFecha(solicitud.fecha_revision)}</small>
            </div>
          )}
        </div>

        {/* Columna derecha - Datos del formulario */}
        <div className="formulario-datos">
          
          {/* Datos Personales */}
          <section className="seccion-datos">
            <h2>👤 Datos Personales</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>Nombre Completo:</label>
                <p>{solicitud.nombre_completo}</p>
              </div>
              <div className="dato-item">
                <label>Cédula:</label>
                <p>{solicitud.cedula}</p>
              </div>
              <div className="dato-item">
                <label>Fecha de Nacimiento:</label>
                <p>{formatearFecha(solicitud.fecha_nacimiento)} ({solicitud.edad} años)</p>
              </div>
              <div className="dato-item">
                <label>Estado Civil:</label>
                <p>{solicitud.estado_civil}</p>
              </div>
              <div className="dato-item">
                <label>Ocupación:</label>
                <p>{solicitud.ocupacion}</p>
              </div>
              <div className="dato-item">
                <label>Email:</label>
                <p>{solicitud.email}</p>
              </div>
              <div className="dato-item">
                <label>Teléfono Celular:</label>
                <p>{solicitud.telefono_celular}</p>
              </div>
              {solicitud.telefono_fijo && (
                <div className="dato-item">
                  <label>Teléfono Fijo:</label>
                  <p>{solicitud.telefono_fijo}</p>
                </div>
              )}
            </div>
          </section>

          {/* Dirección */}
          <section className="seccion-datos">
            <h2>📍 Dirección</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>Provincia:</label>
                <p>{solicitud.provincia}</p>
              </div>
              <div className="dato-item">
                <label>Ciudad:</label>
                <p>{solicitud.ciudad}</p>
              </div>
              <div className="dato-item">
                <label>Sector:</label>
                <p>{solicitud.sector}</p>
              </div>
              <div className="dato-item full-width">
                <label>Dirección Completa:</label>
                <p>{solicitud.direccion_completa}</p>
              </div>
              {solicitud.referencia_direccion && (
                <div className="dato-item full-width">
                  <label>Referencia:</label>
                  <p>{solicitud.referencia_direccion}</p>
                </div>
              )}
            </div>
          </section>

          {/* Vivienda */}
          <section className="seccion-datos">
            <h2>🏠 Información de Vivienda</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>Tipo de Vivienda:</label>
                <p>{solicitud.tipo_vivienda}</p>
              </div>
              <div className="dato-item">
                <label>La vivienda es:</label>
                <p>{solicitud.vivienda_es}</p>
              </div>
              <div className="dato-item">
                <label>Tamaño:</label>
                <p>{solicitud.tamaño_vivienda}</p>
              </div>
              <div className="dato-item">
                <label>¿Tiene jardín?</label>
                <p>{solicitud.tiene_jardin ? `Sí (${solicitud.tamaño_jardin})` : "No"}</p>
              </div>
              <div className="dato-item">
                <label>¿Tiene patio?</label>
                <p>{solicitud.tiene_patio ? "Sí" : "No"}</p>
              </div>
              {solicitud.esta_cerrado && (
                <div className="dato-item">
                  <label>Altura de cerca:</label>
                  <p>{solicitud.altura_cerca}</p>
                </div>
              )}
            </div>
          </section>

          {/* Composición Familiar */}
          <section className="seccion-datos">
            <h2>👨‍👩‍👧‍👦 Composición Familiar</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>¿Vive solo?</label>
                <p>{solicitud.vive_solo ? "Sí" : "No"}</p>
              </div>
              {!solicitud.vive_solo && (
                <>
                  <div className="dato-item">
                    <label>Número de adultos:</label>
                    <p>{solicitud.numero_adultos}</p>
                  </div>
                  <div className="dato-item">
                    <label>Número de niños:</label>
                    <p>{solicitud.numero_niños}</p>
                  </div>
                  {solicitud.edades_niños && (
                    <div className="dato-item">
                      <label>Edades de los niños:</label>
                      <p>{solicitud.edades_niños}</p>
                    </div>
                  )}
                  <div className="dato-item">
                    <label>¿Todos de acuerdo?</label>
                    <p>{solicitud.todos_acuerdo ? "Sí" : "No"}</p>
                  </div>
                  {!solicitud.todos_acuerdo && solicitud.quien_se_opone && (
                    <div className="dato-item full-width">
                      <label>Quién se opone:</label>
                      <p>{solicitud.quien_se_opone}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Mascotas Actuales */}
          <section className="seccion-datos">
            <h2>🐾 Mascotas Actuales</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>¿Tiene mascotas?</label>
                <p>{solicitud.tiene_mascotas_actuales ? "Sí" : "No"}</p>
              </div>
              {solicitud.tiene_mascotas_actuales && (
                <>
                  <div className="dato-item">
                    <label>Perros:</label>
                    <p>{solicitud.numero_perros}</p>
                  </div>
                  <div className="dato-item">
                    <label>Gatos:</label>
                    <p>{solicitud.numero_gatos}</p>
                  </div>
                  {solicitud.otras_mascotas && (
                    <div className="dato-item">
                      <label>Otras mascotas:</label>
                      <p>{solicitud.otras_mascotas}</p>
                    </div>
                  )}
                  {solicitud.detalles_mascotas && (
                    <div className="dato-item full-width">
                      <label>Detalles:</label>
                      <p>{solicitud.detalles_mascotas}</p>
                    </div>
                  )}
                  <div className="dato-item">
                    <label>¿Esterilizadas?</label>
                    <p>{solicitud.mascotas_esterilizadas ? "Sí" : "No"}</p>
                  </div>
                  <div className="dato-item">
                    <label>¿Vacunadas?</label>
                    <p>{solicitud.mascotas_vacunadas ? "Sí" : "No"}</p>
                  </div>
                </>
              )}
            </div>
          </section>

{/* Experiencia Previa */}
          <section className="seccion-datos">
            <h2>📚 Experiencia Previa</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>¿Ha tenido mascotas antes?</label>
                <p>{solicitud.ha_tenido_mascotas ? "Sí" : "No"}</p>
              </div>
              {solicitud.ha_tenido_mascotas && solicitud.que_paso_mascotas_anteriores && (
                <div className="dato-item full-width">
                  <label>¿Qué pasó con ellas?</label>
                  <p>{solicitud.que_paso_mascotas_anteriores}</p>
                </div>
              )}
              <div className="dato-item">
                <label>¿Experiencia con esta especie?</label>
                <p>{solicitud.experiencia_con_especie ? "Sí" : "No"}</p>
              </div>
              {solicitud.experiencia_con_especie && solicitud.descripcion_experiencia && (
                <div className="dato-item full-width">
                  <label>Descripción de experiencia:</label>
                  <p>{solicitud.descripcion_experiencia}</p>
                </div>
              )}
            </div>
          </section>

          {/* Motivación */}
          <section className="seccion-datos">
            <h2>💭 Motivación para Adoptar</h2>
            <div className="datos-grid">
              <div className="dato-item full-width">
                <label>¿Por qué desea adoptar?</label>
                <p>{solicitud.motivo_adopcion}</p>
              </div>
              {solicitud.que_busca_mascota && (
                <div className="dato-item full-width">
                  <label>¿Qué busca en una mascota?</label>
                  <p>{solicitud.que_busca_mascota}</p>
                </div>
              )}
              {solicitud.caracteristicas_deseadas && (
                <div className="dato-item full-width">
                  <label>Características deseadas:</label>
                  <p>{solicitud.caracteristicas_deseadas}</p>
                </div>
              )}
            </div>
          </section>

          {/* Responsabilidad Económica */}
          <section className="seccion-datos">
            <h2>💰 Responsabilidad Económica</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>¿Dispuesto a asumir gastos?</label>
                <p>{solicitud.esta_dispuesto_gastos ? "Sí" : "No"}</p>
              </div>
              <div className="dato-item">
                <label>Presupuesto mensual:</label>
                <p>${solicitud.presupuesto_mensual}</p>
              </div>
            </div>
          </section>

          {/* Cuidados */}
          <section className="seccion-datos">
            <h2>🏥 Cuidados y Responsabilidades</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>Responsable principal:</label>
                <p>{solicitud.quien_cuidara}</p>
              </div>
              <div className="dato-item">
                <label>Horas sola al día:</label>
                <p>{solicitud.horas_solo_diarias}</p>
              </div>
              <div className="dato-item">
                <label>¿Dónde estará?</label>
                <p>{solicitud.donde_estara_mascota}</p>
              </div>
              <div className="dato-item">
                <label>¿Dónde dormirá?</label>
                <p>{solicitud.donde_dormira}</p>
              </div>
            </div>
          </section>

          {/* Situaciones Especiales */}
          <section className="seccion-datos">
            <h2>🚨 Situaciones Especiales</h2>
            <div className="datos-grid">
              {solicitud.que_haria_si_viaja && (
                <div className="dato-item full-width">
                  <label>¿Qué haría si viaja?</label>
                  <p>{solicitud.que_haria_si_viaja}</p>
                </div>
              )}
              {solicitud.que_haria_si_enferma && (
                <div className="dato-item full-width">
                  <label>¿Qué haría si se enferma?</label>
                  <p>{solicitud.que_haria_si_enferma}</p>
                </div>
              )}
              {solicitud.que_haria_si_problemas_conducta && (
                <div className="dato-item full-width">
                  <label>¿Qué haría ante problemas de conducta?</label>
                  <p>{solicitud.que_haria_si_problemas_conducta}</p>
                </div>
              )}
              <div className="dato-item">
                <label>¿Dispuesto a entrenamiento?</label>
                <p>{solicitud.dispuesto_entrenamiento ? "Sí" : "No"}</p>
              </div>
              <div className="dato-item">
                <label>¿Acepta seguimiento?</label>
                <p>{solicitud.dispuesto_seguimiento ? "Sí" : "No"}</p>
              </div>
            </div>
          </section>

          {/* Veterinario */}
          <section className="seccion-datos">
            <h2>🏥 Veterinario</h2>
            <div className="datos-grid">
              <div className="dato-item">
                <label>¿Tiene veterinario?</label>
                <p>{solicitud.tiene_veterinario ? "Sí" : "No"}</p>
              </div>
              {solicitud.tiene_veterinario && (
                <>
                  {solicitud.nombre_veterinario && (
                    <div className="dato-item">
                      <label>Nombre:</label>
                      <p>{solicitud.nombre_veterinario}</p>
                    </div>
                  )}
                  {solicitud.telefono_veterinario && (
                    <div className="dato-item">
                      <label>Teléfono:</label>
                      <p>{solicitud.telefono_veterinario}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </section>

          {/* Referencias */}
          <section className="seccion-datos">
            <h2>👥 Referencias Personales</h2>
            <div className="referencias-grid">
              <div className="referencia-box">
                <h4>Referencia 1</h4>
                <div className="dato-item">
                  <label>Nombre:</label>
                  <p>{solicitud.referencia1_nombre}</p>
                </div>
                <div className="dato-item">
                  <label>Teléfono:</label>
                  <p>{solicitud.referencia1_telefono}</p>
                </div>
                <div className="dato-item">
                  <label>Relación:</label>
                  <p>{solicitud.referencia1_relacion}</p>
                </div>
              </div>

              <div className="referencia-box">
                <h4>Referencia 2</h4>
                <div className="dato-item">
                  <label>Nombre:</label>
                  <p>{solicitud.referencia2_nombre}</p>
                </div>
                <div className="dato-item">
                  <label>Teléfono:</label>
                  <p>{solicitud.referencia2_telefono}</p>
                </div>
                <div className="dato-item">
                  <label>Relación:</label>
                  <p>{solicitud.referencia2_relacion}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Aceptación de Términos */}
          <section className="seccion-datos">
            <h2>✓ Aceptación de Términos</h2>
            <div className="terminos-lista">
              <div className={`termino-item ${solicitud.acepta_visita_domiciliaria ? 'aceptado' : 'rechazado'}`}>
                <span className="check-icon">{solicitud.acepta_visita_domiciliaria ? '✅' : '❌'}</span>
                <p>Acepta visita domiciliaria</p>
              </div>
              <div className={`termino-item ${solicitud.acepta_seguimiento ? 'aceptado' : 'rechazado'}`}>
                <span className="check-icon">{solicitud.acepta_seguimiento ? '✅' : '❌'}</span>
                <p>Acepta seguimiento del refugio</p>
              </div>
              <div className={`termino-item ${solicitud.acepta_terminos ? 'aceptado' : 'rechazado'}`}>
                <span className="check-icon">{solicitud.acepta_terminos ? '✅' : '❌'}</span>
                <p>Acepta términos y condiciones</p>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default DetalleSolicitud;