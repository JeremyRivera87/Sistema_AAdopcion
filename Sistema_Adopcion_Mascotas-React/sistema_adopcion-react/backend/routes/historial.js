const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../db');

// ========================================
// CONFIGURACIÓN DE MULTER (imágenes de historial)
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/historial/'); // ← Carpeta para imágenes de historial
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'historial-' + uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Solo se permiten imágenes (jpg, png) o PDF'));
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: fileFilter
});

// ========================================
// GET - Obtener todo el historial de una mascota
// ========================================
router.get('/mascota/:mascota_id', async (req, res) => {
  try {
    const { mascota_id } = req.params;
    
    const result = await pool.query(
      `SELECT h.*, m.nombre as mascota_nombre 
       FROM historial_medico h
       LEFT JOIN mascotas m ON h.mascota_id = m.id
       WHERE h.mascota_id = $1 
       ORDER BY h.fecha DESC`,
      [mascota_id]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener historial:', error);
    res.status(500).json({ message: 'Error al obtener historial', error: error.message });
  }
});

// ========================================
// GET - Obtener un registro específico
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM historial_medico WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener registro:', error);
    res.status(500).json({ message: 'Error al obtener registro', error: error.message });
  }
});

// ========================================
// POST - Crear nuevo registro médico CON IMAGEN
// ========================================
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const {
      mascota_id,
      fecha,
      tipo,
      descripcion,
      veterinario,
      proxima_cita,
      notas
    } = req.body;

    // Si se subió imagen, guardar su ruta
    const imagen_url = req.file ? `/uploads/historial/${req.file.filename}` : null;

    console.log('📝 Datos recibidos:', { 
      mascota_id, fecha, tipo, descripcion, veterinario, proxima_cita, notas, imagen_url 
    });

    const result = await pool.query(
      `INSERT INTO historial_medico 
       (mascota_id, fecha, tipo, descripcion, veterinario, proxima_cita, notas, imagen_url)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [mascota_id, fecha, tipo, descripcion, veterinario || null, proxima_cita || null, notas || null, imagen_url]
    );

    console.log('✅ Registro médico creado:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear registro:', error);
    res.status(500).json({ message: 'Error al crear registro', error: error.message });
  }
});

// ========================================
// PUT - Actualizar registro médico CON IMAGEN
// ========================================
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      fecha,
      tipo,
      descripcion,
      veterinario,
      proxima_cita,
      notas
    } = req.body;

    // Si se subió nueva imagen, usar la nueva ruta, sino mantener la anterior
    let imagen_url;
    if (req.file) {
      imagen_url = `/uploads/historial/${req.file.filename}`;
    } else if (req.body.imagen_url) {
      imagen_url = req.body.imagen_url;
    } else {
      imagen_url = null;
    }

    const result = await pool.query(
      `UPDATE historial_medico 
       SET fecha = $1, tipo = $2, descripcion = $3, veterinario = $4, 
           proxima_cita = $5, notas = $6, imagen_url = $7, updated_at = CURRENT_TIMESTAMP
       WHERE id = $8 
       RETURNING *`,
      [fecha, tipo, descripcion, veterinario || null, proxima_cita || null, notas || null, imagen_url, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    console.log('✅ Registro médico actualizado:', id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar registro:', error);
    res.status(500).json({ message: 'Error al actualizar registro', error: error.message });
  }
});

// ========================================
// DELETE - Eliminar registro médico
// ========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM historial_medico WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Registro no encontrado' });
    }

    console.log('✅ Registro médico eliminado:', id);
    res.json({ message: 'Registro eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar registro:', error);
    res.status(500).json({ message: 'Error al eliminar registro', error: error.message });
  }
});

module.exports = router;
