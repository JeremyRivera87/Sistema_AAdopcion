const express = require("express");
const router = express.Router();
const pool = require("../db");

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

    if (usuario.password !== password) {
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
    res.status(500).json({ error: "Error del servidor" });
  }
});

router.post("/register", async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    // Verificar si ya existe
    const existe = await pool.query(
      "SELECT * FROM usuarios WHERE email = $1",
      [email]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Insertar usuario
    await pool.query(
      "INSERT INTO usuarios (nombre, email, password, rol) VALUES ($1, $2, $3, 'usuario')",
      [nombre, email, password]
    );

    res.json({ message: "Usuario registrado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
});


module.exports = router;
