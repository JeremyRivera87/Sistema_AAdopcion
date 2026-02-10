import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../styles/AdminMascotas.css";

const AdminMascotas = () => {
  const navigate = useNavigate();
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    especie: "",
    raza: "",
    edad: "",
    sexo: "",
    descripcion: "",
    foto: null
  });
  const [previsualizacion, setPrevisualizacion] = useState(null);

  // 🔹 Obtener mascotas
  const cargarMascotas = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/mascotas");
      const data = await res.json();
      setMascotas(data);
    } catch (error) {
      console.error("Error al cargar mascotas:", error);
    }
  };

  useEffect(() => {
    cargarMascotas();
  }, []);

  // 🔹 Manejar campos de texto
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Manejar archivo de imagen
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setForm({
        ...form,
        foto: archivo
      });
      
      // Crear previsualización
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  // 🔹 Crear mascota
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Usar FormData para enviar archivos
      const formData = new FormData();
      formData.append("nombre", form.nombre);
      formData.append("especie", form.especie);
      formData.append("raza", form.raza);
      formData.append("edad", form.edad);
      formData.append("sexo", form.sexo);
      formData.append("descripcion", form.descripcion);
      
      if (form.foto) {
        formData.append("foto", form.foto);
      }

      const response = await fetch("http://localhost:4000/api/mascotas", {
        method: "POST",
        body: formData // ⚠️ NO incluyas Content-Type cuando usas FormData
      });

      if (response.ok) {
        alert("¡Mascota agregada exitosamente!");
        
        // Resetear formulario
        setForm({
          nombre: "",
          especie: "",
          raza: "",
          edad: "",
          sexo: "",
          descripcion: "",
          foto: null
        });
        setPrevisualizacion(null);
        
        // Recargar lista
        cargarMascotas();
      } else {
        const error = await response.json();
        alert("Error al guardar: " + (error.message || "Error desconocido"));
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="home-admin-container">
      <h1>Gestión de Mascotas</h1>

      {/* FORMULARIO */}
      <form onSubmit={handleSubmit} className="admin-form">
        <input 
          name="nombre" 
          placeholder="Nombre" 
          value={form.nombre} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="especie" 
          placeholder="Especie (Perro/Gato)" 
          value={form.especie} 
          onChange={handleChange} 
          required 
        />
        <input 
          name="raza" 
          placeholder="Raza" 
          value={form.raza} 
          onChange={handleChange} 
        />
        <input 
          name="edad" 
          placeholder="Edad" 
          value={form.edad} 
          onChange={handleChange} 
        />
        <select 
          name="sexo" 
          value={form.sexo} 
          onChange={handleChange}
          required
        >
          <option value="">Seleccionar sexo</option>
          <option value="Macho">Macho</option>
          <option value="Hembra">Hembra</option>
        </select>
        <textarea 
          name="descripcion" 
          placeholder="Descripción" 
          value={form.descripcion} 
          onChange={handleChange}
        ></textarea>
        
        <div className="foto-input">
          <label htmlFor="foto">Foto de la mascota:</label>
          <input 
            type="file" 
            id="foto"
            name="foto"
            accept="image/*"
            onChange={handleFileChange}
          />
          
          {previsualizacion && (
            <div className="preview">
              <img src={previsualizacion} alt="Preview" style={{ maxWidth: "200px", marginTop: "10px" }} />
            </div>
          )}
        </div>

        <button type="submit">Agregar Mascota</button>
        <button type="button" onClick={() => navigate('/admin')}>Regresar</button>
      </form>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Especie</th>
            <th>Raza</th>
            <th>Edad</th>
            <th>Sexo</th>
          </tr>
        </thead>
        <tbody>
          {mascotas.map((m) => (
            <tr key={m.id}>
              <td>
                {m.foto_url ? (
                  <img 
                    src={`http://localhost:4000${m.foto_url}`} 
                    alt={m.nombre}
                    style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                  />
                ) : (
                  "Sin foto"
                )}
              </td>
              <td>{m.nombre}</td>
              <td>{m.especie}</td>
              <td>{m.raza}</td>
              <td>{m.edad}</td>
              <td>{m.sexo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminMascotas;