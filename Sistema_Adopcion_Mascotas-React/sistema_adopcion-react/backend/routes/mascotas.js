const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const pool = require("../db");

// ========================================
// CONFIGURACIÓN DE MULTER (para subir fotos)
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Solo se permiten archivos de imagen'));
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

// ========================================
// RUTAS
// ========================================

// 🔹 GET - Obtener todas las mascotas
router.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM mascotas ORDER BY id DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener mascotas:', error);
    res.status(500).json({ message: 'Error al obtener mascotas' });
  }
});

// 🔹 GET - Obtener UNA mascota por ID CON historial médico
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('🔍 Buscando mascota ID:', id);
    
    // Obtener datos de la mascota
    const mascotaResult = await pool.query(
      'SELECT * FROM mascotas WHERE id = $1',
      [id]
    );

    if (mascotaResult.rows.length === 0) {
      console.log('❌ Mascota no encontrada');
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    const mascota = mascotaResult.rows[0];
    console.log('✅ Mascota encontrada:', mascota.nombre);

    // Obtener historial médico (si existe la tabla)
    let historialMedico = [];
    try {
      const historialResult = await pool.query(
        'SELECT * FROM historial_medico WHERE mascota_id = $1 ORDER BY fecha DESC',
        [id]
      );
      historialMedico = historialResult.rows;
      console.log(`📋 Historial médico: ${historialMedico.length} registros`);
    } catch (error) {
      console.log('⚠️ Tabla historial_medico no existe todavía');
    }

    res.json({
      ...mascota,
      historial_medico: historialMedico
    });
  } catch (error) {
    console.error('💥 Error al obtener mascota:', error);
    res.status(500).json({ message: 'Error al obtener mascota', error: error.message });
  }
});

// 🔹 POST - Crear mascota CON FOTO
router.post("/", upload.single('foto'), async (req, res) => {
  const {
    nombre,
    especie,
    raza,
    edad,
    sexo,
    descripcion
  } = req.body;

  try {
    const foto_url = req.file ? `/uploads/${req.file.filename}` : null;

    console.log('📝 Datos recibidos:', { nombre, especie, raza, edad, sexo, descripcion, foto_url });

    const result = await pool.query(
      `INSERT INTO mascotas 
      (nombre, especie, raza, edad, sexo, descripcion, foto_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *`,
      [nombre, especie, raza, edad, sexo, descripcion, foto_url]
    );

    console.log('✅ Mascota creada exitosamente');

    res.status(201).json({
      message: "Mascota registrada correctamente",
      mascota: result.rows[0],
    });

  } catch (error) {
    console.error('❌ Error al registrar mascota:', error);
    res.status(500).json({ 
      message: "Error al registrar mascota",
      error: error.message 
    });
  }
});

// 🔹 PUT - Actualizar mascota
router.put("/:id", upload.single('foto'), async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, especie, raza, edad, sexo, descripcion } = req.body;
    
    let foto_url;
    if (req.file) {
      foto_url = `/uploads/${req.file.filename}`;
    } else if (req.body.foto_url) {
      foto_url = req.body.foto_url;
    } else {
      foto_url = null;
    }

    const result = await pool.query(
      `UPDATE mascotas 
       SET nombre = $1, especie = $2, raza = $3, edad = $4, sexo = $5, 
           descripcion = $6, foto_url = $7
       WHERE id = $8 RETURNING *`,
      [nombre, especie, raza, edad, sexo, descripcion, foto_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    res.json({
      message: "Mascota actualizada correctamente",
      mascota: result.rows[0]
    });
  } catch (error) {
    console.error('Error al actualizar mascota:', error);
    res.status(500).json({ message: 'Error al actualizar mascota' });
  }
});

// 🔹 DELETE - Eliminar mascota
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM mascotas WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    res.json({ 
      message: 'Mascota eliminada correctamente', 
      mascota: result.rows[0] 
    });
  } catch (error) {
    console.error('Error al eliminar mascota:', error);
    res.status(500).json({ message: 'Error al eliminar mascota' });
  }
});

module.exports = router;