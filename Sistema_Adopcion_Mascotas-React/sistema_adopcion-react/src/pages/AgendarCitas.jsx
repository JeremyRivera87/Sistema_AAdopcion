import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AgendarCitas.css";

const AgendarCita = () => {
  const navigate = useNavigate();
  // 🔹 Verificar sesión al cargar el componente
  useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    if (!usuario) {
      alert("Debes iniciar sesión para agendar una cita");
      navigate("/login");
    }
  }, [navigate]);
  const [mascotas, setMascotas] = useState([]);
  const [form, setForm] = useState({
    mascota_id: "",
    fecha: "",
    hora: "",
    motivo: "",
    notas: ""
  });
  const [loading, setLoading] = useState(false);

  // 🔹 Cargar mascotas disponibles
  useEffect(() => {
    const cargarMascotas = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/mascotas");
        const data = await res.json();
        setMascotas(data);
      } catch (error) {
        console.error("Error al cargar mascotas:", error);
      }
    };
    cargarMascotas();
  }, []);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Enviar solicitud de cita
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Obtener usuario del localStorage
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      
      if (!usuario) {
        alert("Debes iniciar sesión para agendar una cita");
        navigate("/login");
        return;
      }

      const citaData = {
        usuario_id: usuario.id,
        mascota_id: parseInt(form.mascota_id),
        fecha: form.fecha,
        hora: form.hora,
        motivo: form.motivo,
        notas: form.notas
      };

      const response = await fetch("http://localhost:4000/api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(citaData)
      });

      if (response.ok) {
        alert("¡Cita agendada exitosamente! Te contactaremos pronto.");
        setForm({
          mascota_id: "",
          fecha: "",
          hora: "",
          motivo: "",
          notas: ""
        });
        navigate("/mis-citas"); // O la ruta que prefieras
      } else {
        const error = await response.json();
        alert(error.message || "Error al agendar la cita");
      }
    } catch (error) {
      console.error("Error al agendar cita:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Obtener fecha mínima (hoy)
  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  return (
    <div className="agendar-cita-container">
      <div className="agendar-cita-content">
        <h1>Agendar Cita de Adopción</h1>
        <p className="subtitle">Agenda una cita para conocer a tu futura mascota</p>

        <form onSubmit={handleSubmit} className="cita-form">
          {/* Seleccionar Mascota */}
          <div className="form-group">
            <label htmlFor="mascota_id">Mascota *</label>
            <select
              id="mascota_id"
              name="mascota_id"
              value={form.mascota_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona una mascota</option>
              {mascotas.map((mascota) => (
                <option key={mascota.id} value={mascota.id}>
                  {mascota.nombre} - {mascota.especie} ({mascota.raza || "Sin raza"})
                </option>
              ))}
            </select>
          </div>

          {/* Fecha */}
          <div className="form-group">
            <label htmlFor="fecha">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              min={obtenerFechaMinima()}
              required
            />
          </div>

          {/* Hora */}
          <div className="form-group">
            <label htmlFor="hora">Hora *</label>
            <input
              type="time"
              id="hora"
              name="hora"
              value={form.hora}
              onChange={handleChange}
              min="08:00"
              max="18:00"
              required
            />
            <small>Horario de atención: 8:00 AM - 6:00 PM</small>
          </div>

          {/* Motivo */}
          <div className="form-group full-width">
            <label htmlFor="motivo">Motivo de la cita *</label>
            <select
              id="motivo"
              name="motivo"
              value={form.motivo}
              onChange={handleChange}
              required
            >
              <option value="">Selecciona un motivo</option>
              <option value="Conocer mascota">Conocer a la mascota</option>
              <option value="Entrevista adopción">Entrevista de adopción</option>
              <option value="Visita seguimiento">Visita de seguimiento</option>
              <option value="Consulta general">Consulta general</option>
            </select>
          </div>

          {/* Notas adicionales */}
          <div className="form-group full-width">
            <label htmlFor="notas">Notas adicionales (opcional)</label>
            <textarea
              id="notas"
              name="notas"
              value={form.notas}
              onChange={handleChange}
              placeholder="Agrega cualquier información adicional que consideres importante..."
              rows="4"
            ></textarea>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancelar"
              onClick={() => navigate(-1)}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-agendar"
              disabled={loading}
            >
              {loading ? "Agendando..." : "Agendar Cita"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgendarCita;