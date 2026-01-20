import React, { useState } from "react";
import "../styles/Login.css"; // reutilizamos estilos
import logo from "../img/logo-dark-transparent.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        return;
      }

      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        {/* PANEL IZQUIERDO */}
        <div className="login-form">
          <img src={logo} alt="Animal Home" className="login-logo" />
          <h2>Registrarse</h2>

          {error && <p className="login-error">{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}

          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">REGISTRARSE</button>
          </form>

          <div
            className="login-back"
            onClick={() => navigate("/login")}
          >
            ← Volver al login
          </div>
        </div>

        {/* PANEL DERECHO */}
        <div className="login-visual">
          <h1>Join us.</h1>
          <p>
            Regístrate y forma parte <br />
            del cambio 🐾
          </p>
        </div>

      </div>
    </div>
  );
};

export default Register;
