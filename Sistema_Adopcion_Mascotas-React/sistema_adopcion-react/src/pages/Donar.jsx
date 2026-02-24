import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Donar.css";

const Donar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre_donante: "",
    email_donante: "",
    monto: "",
    tipo_donacion: "monetaria",
    metodo_pago: "",
    mensaje: "",
    comprobante: null
  });
  const [previsualizacion, setPrevisualizacion] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔹 Verificar sesión y prellenar datos
  useEffect(() => {
    const usuarioLocal = JSON.parse(localStorage.getItem("usuario"));
    
    if (usuarioLocal) {
      setUsuario(usuarioLocal);
      setForm(prev => ({
        ...prev,
        nombre_donante: usuarioLocal.nombre || "",
        email_donante: usuarioLocal.email || ""
      }));
    }
  }, []);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 🔹 Manejar archivo de comprobante
  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setForm({
        ...form,
        comprobante: archivo
      });
      
      // Crear previsualización
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  // 🔹 Enviar donación
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      // Si hay usuario logueado, enviar su ID
      if (usuario) {
        formData.append("usuario_id", usuario.id);
      }
      
      formData.append("nombre_donante", form.nombre_donante);
      formData.append("email_donante", form.email_donante);
      formData.append("monto", form.monto);
      formData.append("tipo_donacion", form.tipo_donacion);
      formData.append("metodo_pago", form.metodo_pago);
      formData.append("mensaje", form.mensaje);
      
      if (form.comprobante) {
        formData.append("comprobante", form.comprobante);
      }

      const response = await fetch("http://localhost:4000/api/donaciones", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        alert("¡Gracias por tu donación! 💚 Tu apoyo hace la diferencia.");
        
        // Resetear formulario
        setForm({
          nombre_donante: usuario ? usuario.nombre : "",
          email_donante: usuario ? usuario.email : "",
          monto: "",
          tipo_donacion: "monetaria",
          metodo_pago: "",
          mensaje: "",
          comprobante: null
        });
        setPrevisualizacion(null);
        
        // Redirigir
        if (usuario) {
          navigate("/mis-donaciones");
        } else {
          navigate("/");
        }
      } else {
        const error = await response.json();
        alert(error.message || "Error al registrar la donación");
      }
    } catch (error) {
      console.error("Error al enviar donación:", error);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donar-container">
      <div className="donar-content">
        <div className="donar-header">
          <h1>Hacer una Donación 💚</h1>
          <p className="subtitle">Tu generosidad ayuda a darles una segunda oportunidad</p>
        </div>

        <div className="donacion-info">
          <div className="info-card">
            <span className="icon">🏠</span>
            <div>
              <h3>Refugio</h3>
              <p>Mantenimiento y cuidado de instalaciones</p>
            </div>
          </div>
          <div className="info-card">
            <span className="icon">🍖</span>
            <div>
              <h3>Alimentación</h3>
              <p>Comida y nutrición para las mascotas</p>
            </div>
          </div>
          <div className="info-card">
            <span className="icon">💊</span>
            <div>
              <h3>Salud</h3>
              <p>Medicamentos y atención veterinaria</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="donacion-form">
          
          {/* Información del donante */}
          <div className="form-section">
            <h3>Información del Donante</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre_donante">Nombre completo *</label>
                <input
                  type="text"
                  id="nombre_donante"
                  name="nombre_donante"
                  value={form.nombre_donante}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_donante">Correo electrónico *</label>
                <input
                  type="email"
                  id="email_donante"
                  name="email_donante"
                  value={form.email_donante}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Detalles de la donación */}
          <div className="form-section">
            <h3>Detalles de la Donación</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="tipo_donacion">Tipo de donación *</label>
                <select
                  id="tipo_donacion"
                  name="tipo_donacion"
                  value={form.tipo_donacion}
                  onChange={handleChange}
                  required
                >
                  <option value="monetaria">Monetaria</option>
                  <option value="alimento">Alimento</option>
                  <option value="medicinas">Medicinas</option>
                  <option value="otros">Otros</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="monto">Monto (USD) *</label>
                <input
                  type="number"
                  id="monto"
                  name="monto"
                  value={form.monto}
                  onChange={handleChange}
                  placeholder="0.00"
                  min="1"
                  step="0.01"
                  required
                />
              </div>
            </div>

            {/* Montos sugeridos */}
            <div className="montos-sugeridos">
              <p>Montos sugeridos:</p>
              <div className="montos-buttons">
                <button type="button" onClick={() => setForm({...form, monto: "10"})}>$10</button>
                <button type="button" onClick={() => setForm({...form, monto: "25"})}>$25</button>
                <button type="button" onClick={() => setForm({...form, monto: "50"})}>$50</button>
                <button type="button" onClick={() => setForm({...form, monto: "100"})}>$100</button>
              </div>
            </div>

            <div className="form-group full-width">
              <label htmlFor="metodo_pago">Método de pago *</label>
              <select
                id="metodo_pago"
                name="metodo_pago"
                value={form.metodo_pago}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un método</option>
                <option value="transferencia">Transferencia bancaria</option>
                <option value="efectivo">Efectivo</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label htmlFor="mensaje">Mensaje (opcional)</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="Deja un mensaje de apoyo..."
                rows="4"
              ></textarea>
            </div>

            {/* Comprobante */}
            <div className="form-group full-width">
              <label htmlFor="comprobante">Comprobante de pago (opcional)</label>
              <input
                type="file"
                id="comprobante"
                name="comprobante"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <small>Formatos aceptados: JPG, PNG, PDF (máx. 5MB)</small>
              
              {previsualizacion && (
                <div className="preview">
                  {form.comprobante?.type === "application/pdf" ? (
                    <div className="pdf-preview">📄 PDF seleccionado</div>
                  ) : (
                    <img src={previsualizacion} alt="Preview" />
                  )}
                </div>
              )}
            </div>
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
              className="btn-donar"
              disabled={loading}
            >
              {loading ? "Procesando..." : "💚 Realizar Donación"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Donar;   