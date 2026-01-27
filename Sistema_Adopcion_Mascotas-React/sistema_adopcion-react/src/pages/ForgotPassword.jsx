import React, { useState } from "react";
import "../styles/ForgotPassword.css";
import logo from "../img/logo-dark-transparent.png";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRecover = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Correo no encontrado");
        return;
      }

      setMessage("Te enviamos un enlace para recuperar tu contraseña 📩");

    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="forgot-wrapper">
      <div className="forgot-box">

        {/* PANEL IZQUIERDO */}
        <div className="forgot-form">
          <img src={logo} alt="Animal Home" className="forgot-logo" />
          <h2>Recuperar contraseña</h2>

          <p className="forgot-text">
            Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
          </p>

          {error && <p className="forgot-error">{error}</p>}
          {message && <p className="forgot-success">{message}</p>}

          <form onSubmit={handleRecover}>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit">Enviar enlace</button>
          </form>

          <div
            className="forgot-back"
            onClick={() => navigate("/login")}
          >
            ← Volver al login
          </div>
        </div>

        <div className="forgot-visual">
          <h1>No te preocupes</h1>
          <p>
            Todos olvidamos contraseñas <br />
            Estamos para ayudarte 🐾
          </p>
        </div>

      </div>
    </div>
  );
};

export default ForgotPassword;
