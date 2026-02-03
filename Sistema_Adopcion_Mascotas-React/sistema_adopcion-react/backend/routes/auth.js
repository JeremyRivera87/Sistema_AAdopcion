const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");

/* =========================
   LOGIN
========================= */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    const usuario = result.rows[0];

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

/* =========================
   REGISTER
========================= */
router.post("/register", async (req, res) => {
  const {
    nombre,
    email,
    password,
    edad,
    cedula,
    direccion,
    provincia,
    canton
  } = req.body;

  try {
    // Validaciones backend
    if (!password || password.length < 8) {
      return res.status(400).json({
        message: "La contraseña debe tener al menos 8 caracteres"
      });
    }

    if (Number(edad) < 18) {
      return res.status(400).json({
        message: "Debes ser mayor de edad para registrarte"
      });
    }

    // Verificar correo
    const existe = await pool.query(
      "SELECT 1 FROM usuarios WHERE email = $1",
      [email]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({
        message: "El correo ya está registrado"
      });
    }

    // Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // INSERT COMPLETO (YA NO HAY NULL)
    await pool.query(
      `INSERT INTO usuarios 
      (nombre, email, password, rol, edad, cedula, direccion, provincia, canton)
      VALUES ($1,$2,$3,'usuario',$4,$5,$6,$7,$8)`,
      [
        nombre,
        email,
        passwordHash,
        edad,
        cedula,
        direccion,
        provincia,
        canton
      ]
    );

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al registrar usuario"
    });
  }
});

module.exports = router;