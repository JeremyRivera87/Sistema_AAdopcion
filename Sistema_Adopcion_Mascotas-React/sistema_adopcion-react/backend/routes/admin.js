const express = require("express");
const router = express.Router();
const pool = require("../db");

/* =========================
   ESTADÍSTICAS DASHBOARD
========================= */
router.get("/stats", async (req, res) => {
  try {
    const usuarios = await pool.query("SELECT COUNT(*) FROM usuarios");
    const mascotas = await pool.query("SELECT COUNT(*) FROM mascotas");
    const solicitudes = await pool.query("SELECT COUNT(*) FROM solicitudes");
    const citas = await pool.query("SELECT COUNT(*) FROM citas");

    res.json({
      usuarios: usuarios.rows[0].count,
      mascotas: mascotas.rows[0].count,
      solicitudes: solicitudes.rows[0].count,
      citas: citas.rows[0].count,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
});

module.exports = router;
