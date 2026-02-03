const express = require("express");
const router = express.Router();
const pool = require("../db");

/* =========================
   TOTAL USUARIOS
========================= */
router.get("/stats", async (req, res) => {
  try {
    const result = await pool.query("SELECT COUNT(*) FROM usuarios");

    res.json({
      usuarios: Number(result.rows[0].count)
    });

  } catch (error) {
    console.error("Error contando usuarios:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
});

module.exports = router;
