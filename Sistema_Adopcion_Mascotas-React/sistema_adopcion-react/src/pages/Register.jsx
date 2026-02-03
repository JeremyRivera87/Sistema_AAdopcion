import React, { useState } from "react";
import "../styles/Register.css";
import logo from "../img/logo-dark-transparent.png";
import { useNavigate } from "react-router-dom";

const cantonesPorProvincia = {
  Azuay: ["Cuenca", "Gualaceo", "Paute", "Sígsig", "Chordeleg", "Girón", "Santa Isabel"],
  Bolívar: ["Guaranda", "Chillanes", "Chimbo", "Echeandía", "San Miguel"],
  Cañar: ["Azogues", "Biblián", "Cañar", "La Troncal", "El Tambo"],
  Carchi: ["Tulcán", "Bolívar", "Espejo", "Mira", "Montúfar"],
  Chimborazo: ["Riobamba", "Alausí", "Guano", "Chambo", "Colta"],
  Cotopaxi: ["Latacunga", "La Maná", "Pujilí", "Salcedo", "Saquisilí"],
  "El Oro": ["Machala", "Pasaje", "Santa Rosa", "Huaquillas", "Zaruma"],
  Esmeraldas: ["Esmeraldas", "Atacames", "Quinindé", "San Lorenzo"],
  Galápagos: ["Puerto Ayora", "Puerto Baquerizo Moreno", "Puerto Villamil"],
  Guayas: ["Guayaquil", "Durán", "Samborondón", "Daule", "Milagro"],
  Imbabura: ["Ibarra", "Otavalo", "Cotacachi", "Antonio Ante"],
  Loja: ["Loja", "Catamayo", "Macará", "Calvas", "Saraguro"],
  "Los Ríos": ["Babahoyo", "Quevedo", "Ventanas", "Vinces"],
  Manabí: ["Portoviejo", "Manta", "Chone", "Montecristi"],
  "Morona Santiago": ["Macas", "Gualaquiza", "Sucúa"],
  Napo: ["Tena", "Archidona", "El Chaco"],
  Orellana: ["Francisco de Orellana", "La Joya de los Sachas"],
  Pastaza: ["Puyo", "Mera", "Santa Clara"],
  Pichincha: ["Quito", "Cayambe", "Mejía", "Rumiñahui"],
  "Santa Elena": ["Santa Elena", "La Libertad", "Salinas"],
  "Santo Domingo de los Tsáchilas": ["Santo Domingo"],
  Sucumbíos: ["Lago Agrio", "Shushufindi"],
  Tungurahua: ["Ambato", "Baños", "Pelileo"],
  "Zamora Chinchipe": ["Zamora", "Yantzaza", "El Pangui"]
};

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [cedula, setCedula] = useState("");
  const [direccion, setDireccion] = useState("");
  const [provincia, setProvincia] = useState("");
  const [canton, setCanton] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validación contraseña
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres");
      setTimeout(() => setError(""), 10000);
      return;
    }

    // Validación edad
    if (Number(edad) < 18) {
      setError("Debes ser mayor de edad para registrarte");
      setTimeout(() => setError(""), 10000);
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
        setTimeout(() => setError(""), 10000);
        return;
      }

      setSuccess("Registro exitoso. Ahora puedes iniciar sesión.");
      setTimeout(() => setSuccess(""), 10000);

      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError("Error al conectar con el servidor");
      setTimeout(() => setError(""), 10000);
    }
  };

  return (
    <div className="register-wrapper">

      {(error || success) && (
        <div className={`toast ${error ? "toast-error" : "toast-success"}`}>
          {error || success}
        </div>
      )}

      <div className="register-box">

        <div className="register-form">
          <img src={logo} alt="Animal Home" className="register-logo" />
          <h2>Registrarse</h2>

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
              placeholder="Mínimo 8 caracteres"
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
              placeholder="Ej: Av. Amazonas y Colón"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />

            <label>Provincia</label>
            <select
              value={provincia}
              onChange={(e) => {
                setProvincia(e.target.value);
                setCanton("");
              }}
              required
            >
              <option value="">Selecciona una provincia</option>
              {Object.keys(cantonesPorProvincia).map((prov) => (
                <option key={prov} value={prov}>
                  {prov}
                </option>
              ))}
            </select>

            <label>Cantón</label>
            <select
              value={canton}
              onChange={(e) => setCanton(e.target.value)}
              required
              disabled={!provincia}
            >
              <option value="">Selecciona un cantón</option>
              {cantonesPorProvincia[provincia]?.map((canton) => (
                <option key={canton} value={canton}>
                  {canton}
                </option>
              ))}
            </select>

            <button type="submit" className="register-btn">
              REGISTRARSE
            </button>
          </form>

          <div className="register-back" onClick={() => navigate("/login")}>
            ← Volver al login
          </div>
        </div>

        <div className="register-visual">
          <div>
            <h1>Sé parte de nosotros</h1>
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
