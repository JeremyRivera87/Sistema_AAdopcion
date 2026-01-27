import React, { useState } from "react";
import "../styles/Register.css";
import logo from "../img/logo-dark-transparent.png";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [provincia, setProvincia] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (Number(edad) < 18) {
      setError("Debes ser mayor de edad para registrarte");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          password,
          edad,
          cedula,
          direccion,
          provincia,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error en el registro");
        return;
      }

      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError("Error al conectar con el servidor");
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-box">

        <div className="register-form">
          <img src={logo} alt="Animal Home" className="register-logo" />
          <h2>Registrarse</h2>

          {error && <p className="register-error">{error}</p>}
          {success && <p className="register-success">{success}</p>}

          <form onSubmit={handleRegister} className="register-form-fields">
            <label>Nombre Completo</label>
            <input
              type="text"
              placeholder="Ej: Juan Pérez"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />

            <label>Correo Electrónico</label>
            <input
              type="email"
              placeholder="Ej: correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Contraseña</label>
            <input
              type="password"
              placeholder="Minimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label>Edad</label>
            <input
              type="number"
              placeholder="Ej: 22"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
            />

            <label>Número de Cédula</label>
            <input
              type="text"
              placeholder="Ej: 1234567890"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              required
            />

            <label>Dirección Domiciliaria</label>
            <input
              type="text"
              placeholder="Ej Av. Amazonas y Colón"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />

            <label>Provincia</label>
            <input
              type="text"
              placeholder="Ej: Pichincha"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              required
            />

            <button type="submit" className="register-btn">
              REGISTRARSE
            </button>
          </form>

          <div
            className="register-back"
            onClick={() => navigate("/login")}
          >
            ← Volver al login
          </div>
        </div>

        <div className="register-visual">
          <div>
            <h1>Se parte de Nosotros</h1>
            <p>
              Regístrate y forma parte <br />
              del cambio 🐾
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
