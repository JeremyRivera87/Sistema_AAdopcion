import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomAlert from "../components/CustomAlert";
import "../styles/Donar.css";

const Donar = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [form, setForm] = useState({
    nombre_donante: "",
    email_donante: "",
    monto: "",
    metodo_pago: "",
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
      formData.append("tipo_donacion", "monetaria"); // ← FIJO como monetaria
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
        setAlert({
          isOpen: true,
          title: "¡Donación Registrada!",
          message: "Gracias por tu donación. Tu apoyo hace la diferencia.",
          type: "success"
        });
      } else {
        const error = await response.json();
        setAlert({
          isOpen: true,
          title: "Error",
          message: error.message || "Error al registrar la donación",
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
    
    // Si la donación fue exitosa, redirigir
    if (alert.type === "success") {
      navigate("/");
    }
  };

  return (
    <div className="donar-container">
      <div className="donar-content">
        <button className="btn-atras" onClick={() => navigate("/seleccionar-donacion")}>
          ← Cambiar tipo de donación
        </button>

        <div className="donar-header">
          <h1>Donación en Efectivo 💵</h1>
          <p className="subtitle">Tu apoyo económico nos ayuda a mantener el refugio funcionando</p>
        </div>

        {/* Info de cuentas bancarias */}
        <div className="info-bancaria">
          <h3>📋 Información Bancaria para Transferencias:</h3>
          
          <div className="cuentas-grid">
            {/* Banco Pichincha */}
            <div className="cuenta-card">
              <div className="banco-header">
                <strong>🏦 Banco Pichincha</strong>
              </div>
              <div className="cuenta-detalles">
                <div className="detalle-item">
                  <span className="label">Tipo de Cuenta:</span>
                  <span className="value">Cuenta Corriente</span>
                </div>
                <div className="detalle-item">
                  <span className="label">Número de Cuenta:</span>
                  <span className="value cuenta-numero">2100-1234-5678</span>
                </div>
                <div className="detalle-item">
                  <span className="label">Beneficiario:</span>
                  <span className="value">Refugio Animal Home</span>
                </div>
                <div className="detalle-item">
                  <span className="label">RUC:</span>
                  <span className="value">1234567890001</span>
                </div>
                <div className="detalle-item">
                  <span className="label">Correo:</span>
                  <span className="value">donaciones@animalhome.org</span>
                </div>
              </div>
            </div>

            {/* Banco Guayaquil */}
            <div className="cuenta-card">
              <div className="banco-header">
                <strong>🏦 Banco Guayaquil</strong>
              </div>
              <div className="cuenta-detalles">
                <div className="detalle-item">
                  <span className="label">Tipo de Cuenta:</span>
                  <span className="value">Cuenta de Ahorros</span>
                </div>
                <div className="detalle-item">
                  <span className="label">Número de Cuenta:</span>
                  <span className="value cuenta-numero">0012-3456-7890</span>
                </div>
                <div className="detalle-item">
                  <span className="label">Beneficiario:</span>
                  <span className="value">Refugio Animal Home</span>
                </div>
                <div className="detalle-item">
                  <span className="label">RUC:</span>
                  <span className="value">1234567890001</span>
                </div>
                <div className="detalle-item">
                  <span className="label">Correo:</span>
                  <span className="value">donaciones@animalhome.org</span>
                </div>
              </div>
            </div>
          </div>

          <div className="nota-importante">
            <strong>⚠️ Importante:</strong> Por favor, sube el comprobante de tu transferencia para que podamos verificar y registrar tu donación.
          </div>
        </div>

        <form onSubmit={handleSubmit} className="donacion-form">
          
          {/* Información del donante */}
          <div className="form-section">
            <h3>Tus Datos</h3>
            
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
            
            <div className="form-group">
              <label htmlFor="monto">Monto a donar (USD) *</label>
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
              <label htmlFor="comprobante">Comprobante de pago *</label>
              <input
                type="file"
                id="comprobante"
                name="comprobante"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                required
              />
              <small>Sube una foto o PDF de tu comprobante (máx. 5MB)</small>
              
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
              onClick={() => navigate("/")}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="btn-donar"
              disabled={loading}
            >
              {loading ? "Procesando..." : "💚 Confirmar Donación"}
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

export default Donar;