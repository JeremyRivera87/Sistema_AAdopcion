import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/DonarEspecie.css";

const DonarEspecie = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre_donante: "",
    email_donante: "",
    tipo_donacion: "",
    descripcion_articulos: "",
    cantidad_aproximada: "",
    fecha_entrega: "",
    hora_entrega: "",
    mensaje: "",
    comprobante: null
  });
  const [previsualizacion, setPrevisualizacion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setForm({
        ...form,
        comprobante: archivo
      });
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPrevisualizacion(reader.result);
      };
      reader.readAsDataURL(archivo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      
      if (usuario) {
        formData.append("usuario_id", usuario.id);
      }
      
      formData.append("nombre_donante", form.nombre_donante);
      formData.append("email_donante", form.email_donante);
      formData.append("monto", 0); // Para donaciones en especie, monto es 0
      formData.append("tipo_donacion", form.tipo_donacion);
      formData.append("metodo_pago", "especie");
      
      // Crear mensaje con todos los detalles
      const mensajeCompleto = `
Tipo: ${form.tipo_donacion}
Descripción: ${form.descripcion_articulos}
Cantidad aproximada: ${form.cantidad_aproximada}
Fecha de entrega: ${form.fecha_entrega}
Hora de entrega: ${form.hora_entrega}
Mensaje adicional: ${form.mensaje}
      `.trim();
      
      formData.append("mensaje", mensajeCompleto);
      
      if (form.comprobante) {
        formData.append("comprobante", form.comprobante);
      }

      const response = await fetch("http://localhost:4000/api/donaciones", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setAlert({
          isOpen: true,
          title: "¡Donación Registrada!",
          message: "Gracias por tu donación en especie. Te contactaremos pronto para coordinar la entrega.",
          type: "success"
        });
      } else {
        const error = await response.json();
        setAlert({
          isOpen: true,
          title: "Error",
          message: error.message || "No se pudo registrar la donación",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error al enviar donación:", error);
      setAlert({
        isOpen: true,
        title: "Error de conexión",
        message: "No se pudo conectar con el servidor",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ ...alert, isOpen: false });
    
    if (alert.type === "success") {
      navigate("/");
    }
  };

  // Obtener fecha mínima (hoy)
  const obtenerFechaMinima = () => {
    const hoy = new Date();
    return hoy.toISOString().split('T')[0];
  };

  return (
    <div className="donar-especie-container">
      <div className="donar-especie-content">
        <button className="btn-atras" onClick={() => navigate("/seleccionar-donacion")}>
          ← Cambiar tipo de donación
        </button>

        <div className="header">
          <h1>Donación en Especie 🎁</h1>
          <p className="subtitle">Dona alimentos, medicinas o artículos que ayudan directamente a nuestros rescatados</p>
        </div>

        {/* Lista de artículos necesitados */}
        <div className="articulos-necesitados">
          <h3>📋 Artículos que más necesitamos:</h3>
          <div className="necesidades-grid">
            <div className="necesidad-item">
              <span className="necesidad-icon">🍖</span>
              <strong>Alimentos</strong>
              <p>Croquetas, comida húmeda, snacks</p>
            </div>
            <div className="necesidad-item">
              <span className="necesidad-icon">💊</span>
              <strong>Medicinas</strong>
              <p>Antiparasitarios, vitaminas, antibióticos</p>
            </div>
            <div className="necesidad-item">
              <span className="necesidad-icon">🧸</span>
              <strong>Juguetes</strong>
              <p>Pelotas, cuerdas, rascadores</p>
            </div>
            <div className="necesidad-item">
              <span className="necesidad-icon">🧴</span>
              <strong>Higiene</strong>
              <p>Shampoo, toallas, productos de limpieza</p>
            </div>
            <div className="necesidad-item">
              <span className="necesidad-icon">🛏️</span>
              <strong>Accesorios</strong>
              <p>Camas, mantas, platos, bebederos</p>
            </div>
            <div className="necesidad-item">
              <span className="necesidad-icon">🩹</span>
              <strong>Primeros Auxilios</strong>
              <p>Vendas, gasas, desinfectantes</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="form-especie">
          
          {/* Información del donante */}
          <div className="form-section">
            <h3>Tus Datos</h3>
            
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

          {/* Detalles de la donación */}
          <div className="form-section">
            <h3>¿Qué deseas donar?</h3>
            
            <div className="form-group">
              <label htmlFor="tipo_donacion">Tipo de artículo *</label>
              <select
                id="tipo_donacion"
                name="tipo_donacion"
                value={form.tipo_donacion}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona una categoría</option>
                <option value="alimento">🍖 Alimento para mascotas</option>
                <option value="medicinas">💊 Medicinas y vitaminas</option>
                <option value="juguetes">🧸 Juguetes y entretenimiento</option>
                <option value="higiene">🧴 Productos de higiene</option>
                <option value="accesorios">🛏️ Accesorios (camas, platos, etc.)</option>
                <option value="primeros_auxilios">🩹 Artículos de primeros auxilios</option>
                <option value="otros">📦 Otros artículos</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion_articulos">Descripción detallada de los artículos *</label>
              <textarea
                id="descripcion_articulos"
                name="descripcion_articulos"
                value={form.descripcion_articulos}
                onChange={handleChange}
                placeholder="Ejemplo: 3 bolsas de 15kg de croquetas para perros adultos marca Dog Chow, 2 paquetes de toallas absorbentes..."
                rows="4"
                required
              ></textarea>
              <small>Especifica marcas, cantidades y características</small>
            </div>

            <div className="form-group">
              <label htmlFor="cantidad_aproximada">Cantidad aproximada *</label>
              <input
                type="text"
                id="cantidad_aproximada"
                name="cantidad_aproximada"
                value={form.cantidad_aproximada}
                onChange={handleChange}
                placeholder="Ejemplo: 3 cajas, 45kg total, 10 unidades..."
                required
              />
            </div>
          </div>

          {/* Coordinación de entrega */}
          <div className="form-section">
            <h3>Coordinación de Entrega</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fecha_entrega">Fecha propuesta para entrega *</label>
                <input
                  type="date"
                  id="fecha_entrega"
                  name="fecha_entrega"
                  value={form.fecha_entrega}
                  onChange={handleChange}
                  min={obtenerFechaMinima()}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora_entrega">Hora propuesta *</label>
                <input
                  type="time"
                  id="hora_entrega"
                  name="hora_entrega"
                  value={form.hora_entrega}
                  onChange={handleChange}
                  min="08:00"
                  max="18:00"
                  required
                />
                <small>Horario de recepción: 8:00 AM - 6:00 PM</small>
              </div>
            </div>

            <div className="info-direccion">
              <strong>📍 Dirección del refugio:</strong>
              <p>Av. Principal #123, Sector Norte, Quito - Ecuador</p>
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje adicional (opcional)</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                placeholder="¿Necesitas que recojamos la donación? ¿Tienes alguna pregunta? Escríbenos aquí..."
                rows="3"
              ></textarea>
            </div>

            {/* Foto de los artículos (opcional) */}
            <div className="form-group">
              <label htmlFor="comprobante">Foto de los artículos (opcional)</label>
              <input
                type="file"
                id="comprobante"
                name="comprobante"
                accept="image/*"
                onChange={handleFileChange}
              />
              <small>Sube una foto de los artículos que donarás</small>
              
              {previsualizacion && (
                <div className="preview">
                  <img src={previsualizacion} alt="Preview" />
                </div>
              )}
            </div>
          </div>

          {/* Botones */}
          <div className="form-actions">
            <button 
              type="button" 
              className="btn-cancelar"
              onClick={() => navigate("/seleccionar-donacion")}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-donar"
              disabled={loading}
            >
              {loading ? "Procesando..." : "💚 Registrar Donación"}
            </button>
          </div>
        </form>
      </div>

      {/* Alerta personalizada */}
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

export default DonarEspecie;