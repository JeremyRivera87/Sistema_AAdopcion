import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/AdminMascotas.css";

const AdminMascotas = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [mascotaEditando, setMascotaEditando] = useState(null);
  const [previsualizacion, setPrevisualizacion] = useState(null);

  const [formData, setFormData] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    tamaño: "",
    peso: "",
    color: "",
    vacunado: false,
    esterilizado: false,
    desparasitado: false,
    descripcion: "",
    foto: null,
    foto_url: ""
  });

  // 🔹 Cargar mascotas
  const cargarMascotas = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/mascotas");
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
      alert("Error al cargar las mascotas");
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  // 🔹 Abrir modal (crear o editar)
  const abrirModal = (mascota = null) => {
    if (mascota) {
      // Modo edición
      setMascotaEditando(mascota);
      setFormData({
        nombre: mascota.nombre,
        especie: mascota.especie,
        raza: mascota.raza || "",
        edad: mascota.edad || "",
        sexo: mascota.sexo || "",
        tamaño: mascota.tamaño || "",
        peso: mascota.peso || "",
        color: mascota.color || "",
        vacunado: mascota.vacunado || false,
        esterilizado: mascota.esterilizado || false,
        desparasitado: mascota.desparasitado || false,
        descripcion: mascota.descripcion || "",
        foto: null,
        foto_url: mascota.foto_url || ""
      });
      setPrevisualizacion(mascota.foto_url ? `http://localhost:4000${mascota.foto_url}` : null);
    } else {
      // Modo creación
      setMascotaEditando(null);
      setFormData({
        nombre: "",
        especie: "",
        raza: "",
        edad: "",
        sexo: "",
        tamaño: "",
        peso: "",
        color: "",
        vacunado: false,
        esterilizado: false,
        desparasitado: false,
        descripcion: "",
        foto: null,
        foto_url: ""
      });
      setPrevisualizacion(null);
    }
    setModalAbierto(true);
  };

  // 🔹 Cerrar modal
  const cerrarModal = () => {
    setModalAbierto(false);
    setMascotaEditando(null);
    setFormData({
      nombre: "",
      especie: "",
      raza: "",
      edad: "",
      sexo: "",
      tamaño: "",
      peso: "",
      color: "",
      vacunado: false,
      esterilizado: false,
      desparasitado: false,
      descripcion: "",
      foto: null,
      foto_url: ""
    });
    setPrevisualizacion(null);
  };

  // 🔹 Manejar cambios en inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 🔹 Manejar archivo de imagen
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFormData({
        ...formData,
        foto: archivo
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  // 🔹 Enviar formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("especie", formData.especie);
      formDataToSend.append("raza", formData.raza);
      formDataToSend.append("edad", formData.edad);
      formDataToSend.append("sexo", formData.sexo);
      formDataToSend.append("tamaño", formData.tamaño);
      formDataToSend.append("peso", formData.peso);
      formDataToSend.append("color", formData.color);
      formDataToSend.append("vacunado", formData.vacunado);
      formDataToSend.append("esterilizado", formData.esterilizado);
      formDataToSend.append("desparasitado", formData.desparasitado);
      formDataToSend.append("descripcion", formData.descripcion);
      
      if (formData.foto) {
        formDataToSend.append("foto", formData.foto);
      } else if (formData.foto_url) {
        formDataToSend.append("foto_url", formData.foto_url);
      }

      const url = mascotaEditando 
        ? `http://localhost:4000/api/mascotas/${mascotaEditando.id}`
        : "http://localhost:4000/api/mascotas";
      
      const method = mascotaEditando ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        body: formDataToSend
      });

      if (response.ok) {
        alert(mascotaEditando ? "¡Mascota actualizada!" : "¡Mascota agregada!");
        cerrarModal();
        cargarMascotas();
      } else {
        const error = await response.json();
        alert("Error: " + (error.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión con el servidor");
    }
  };

  // 🔹 Eliminar mascota
  const eliminarMascota = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar a ${nombre}?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/mascotas/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        alert("Mascota eliminada correctamente");
        cargarMascotas();
      } else {
        alert("Error al eliminar la mascota");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="admin-mascotas-container">
      
      {/* Header */}
      <div className="admin-mascotas-header">
        <h1>Gestión de Mascotas</h1>
        <div className="header-acciones">
          <button className="btn-agregar" onClick={() => abrirModal()}>
            + Agregar Mascota
          </button>
          <button className="btn-regresar" onClick={() => navigate('/admin')}>
            ← Regresar
          </button>
        </div>
      </div>

      {/* Tabla de mascotas */}
      <div className="tabla-mascotas">
        <table>
          <thead>
            <tr>
              <th>Foto</th>
              <th>Nombre</th>
              <th>Especie</th>
              <th>Raza</th>
              <th>Edad</th>
              <th>Sexo</th>
              <th>Salud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "30px" }}>
                  No hay mascotas registradas
                </td>
              </tr>
            ) : (
              mascotas.map((mascota) => (
                <tr key={mascota.id}>
                  <td>
                    {mascota.foto_url ? (
                      <img 
                        src={`http://localhost:4000${mascota.foto_url}`} 
                        alt={mascota.nombre}
                        className="tabla-foto"
                      />
                    ) : (
                      <div className="sin-foto-tabla">Sin foto</div>
                    )}
                  </td>
                  <td><strong>{mascota.nombre}</strong></td>
                  <td>{mascota.especie}</td>
                  <td>{mascota.raza || "Mestizo"}</td>
                  <td>{mascota.edad || "-"}</td>
                  <td>{mascota.sexo || "-"}</td>
                  <td>
                    <div className="salud-badges">
                      {mascota.vacunado && <span className="badge-salud vacunado">💉</span>}
                      {mascota.esterilizado && <span className="badge-salud esterilizado">✂️</span>}
                      {mascota.desparasitado && <span className="badge-salud desparasitado">💊</span>}
                    </div>
                  </td>
                  <td>
                    <div className="acciones-tabla">
                      <button 
                        className="btn-editar"
                        onClick={() => abrirModal(mascota)}
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-eliminar"
                        onClick={() => eliminarMascota(mascota.id, mascota.nombre)}
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div className="modal-overlay" onClick={cerrarModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{mascotaEditando ? "Editar Mascota" : "Agregar Nueva Mascota"}</h2>
              <button className="btn-cerrar-modal" onClick={cerrarModal}>✕</button>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                
                <div className="form-group">
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Especie *</label>
                  <select
                    name="especie"
                    value={formData.especie}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Seleccione...</option>
                    <option value="Perro">Perro</option>
                    <option value="Gato">Gato</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Raza</label>
                  <input
                    type="text"
                    name="raza"
                    value={formData.raza}
                    onChange={handleInputChange}
                    placeholder="Ej: Labrador, Mestizo"
                  />
                </div>

                <div className="form-group">
                  <label>Edad</label>
                  <input
                    type="text"
                    name="edad"
                    value={formData.edad}
                    onChange={handleInputChange}
                    placeholder="Ej: 2 años, 6 meses"
                  />
                </div>

                <div className="form-group">
                  <label>Sexo</label>
                  <select
                    name="sexo"
                    value={formData.sexo}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Macho">Macho</option>
                    <option value="Hembra">Hembra</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tamaño</label>
                  <select
                    name="tamaño"
                    value={formData.tamaño}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione...</option>
                    <option value="Pequeño">Pequeño</option>
                    <option value="Mediano">Mediano</option>
                    <option value="Grande">Grande</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Peso (aprox.)</label>
                  <input
                    type="text"
                    name="peso"
                    value={formData.peso}
                    onChange={handleInputChange}
                    placeholder="Ej: 5 kg, 10-15 kg"
                  />
                </div>

                <div className="form-group">
                  <label>Color</label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="Ej: Café, Blanco y negro"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Descripción</label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    rows="3"
                    placeholder="Describe la personalidad y características de la mascota..."
                  ></textarea>
                </div>

                {/* Estado de Salud */}
                <div className="form-group full-width salud-checkboxes">
                  <label className="section-label">Estado de Salud</label>
                  
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="vacunado"
                      checked={formData.vacunado}
                      onChange={(e) => setFormData({...formData, vacunado: e.target.checked})}
                    />
                    <span>💉 Vacunado</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="esterilizado"
                      checked={formData.esterilizado}
                      onChange={(e) => setFormData({...formData, esterilizado: e.target.checked})}
                    />
                    <span>✂️ Esterilizado</span>
                  </label>

                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="desparasitado"
                      checked={formData.desparasitado}
                      onChange={(e) => setFormData({...formData, desparasitado: e.target.checked})}
                    />
                    <span>💊 Desparasitado</span>
                  </label>
                </div>

                {/* Foto */}
                <div className="form-group full-width">
                  <label>Foto de la Mascota</label>
                  <input
                    type="file"
                    name="foto"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  {previsualizacion && (
                    <div className="preview-imagen">
                      <img src={previsualizacion} alt="Preview" />
                    </div>
                  )}
                </div>

              </div>

              <div className="modal-footer">
                <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                  Cancelar
                </button>
                <button type="submit" className="btn-guardar">
                  {mascotaEditando ? "Actualizar" : "Guardar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMascotas;