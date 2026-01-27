import React, { useState } from "react";
import "../styles/Login.css";
import logo from "../img/logo-dark-transparent.png";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Credenciales incorrectas");
        return;
      }

      console.log("Usuario logeado:", data.usuario);

      if (data.usuario.rol === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">

        <div className="login-form">
          <img src={logo} alt="Animal Home" className="login-logo" />

          <h2>Iniciar Sesión</h2>

          {error && <p className="login-error">{error}</p>}

          <form onSubmit={handleLogin}>
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

            <button type="submit">Acceso</button>

          </form>

          <div className="forgot-link" 
          onClick={() => navigate("/forgot-password")}
          >
            ¿Olvidaste tu contraseña?
            </div>

          <p className="login-footer">
            ¿No tienes cuenta?
            <span onClick={() => navigate("/register")}> Regístrate</span>
          </p>
        </div>

        <div className="login-visual">

          <h1>Bienvenido</h1>
          <p>
            Sistema de Adopción de Mascotas <br />
            Uniendo hogares con corazones 🐾
          </p>

          <div className="login-back-right" onClick={() => navigate("/")}>
              ← Volver al inicio
          </div>
        </div>
        

      </div>
    </div>
  );
};

export default Login;
