const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../db');

// ========================================
// CONFIGURACIÓN DE MULTER (imágenes de avisos)
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/avisos/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'aviso-' + uniqueName + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (mimetype && extname) {
    return cb(null, true);
  }
  cb(new Error('Solo se permiten imágenes'));
};

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

// ========================================
// GET - Obtener todos los avisos activos (público)
// ========================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM avisos WHERE activo = true ORDER BY orden ASC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener avisos:', error);
    res.status(500).json({ message: 'Error al obtener avisos', error: error.message });
  }
});

// ========================================
// GET - Obtener todos los avisos (admin)
// ========================================
router.get('/admin', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM avisos ORDER BY orden ASC, created_at DESC'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener avisos:', error);
    res.status(500).json({ message: 'Error al obtener avisos', error: error.message });
  }
});

// ========================================
// GET - Obtener un aviso específico
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM avisos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aviso no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener aviso:', error);
    res.status(500).json({ message: 'Error al obtener aviso', error: error.message });
  }
});

// ========================================
// POST - Crear nuevo aviso
// ========================================
router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const { titulo, descripcion, activo, orden } = req.body;
    const imagen_url = req.file ? `/uploads/avisos/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO avisos (titulo, descripcion, imagen_url, activo, orden)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [titulo, descripcion, imagen_url, activo === 'true' || activo === true, orden || 0]
    );

    console.log('✅ Aviso creado:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear aviso:', error);
    res.status(500).json({ message: 'Error al crear aviso', error: error.message });
  }
});

// ========================================
// PUT - Actualizar aviso
// ========================================
router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, activo, orden } = req.body;

    let imagen_url;
    if (req.file) {
      imagen_url = `/uploads/avisos/${req.file.filename}`;
    } else if (req.body.imagen_url) {
      imagen_url = req.body.imagen_url;
    } else {
      imagen_url = null;
    }

    const result = await pool.query(
      `UPDATE avisos 
       SET titulo = $1, descripcion = $2, imagen_url = $3, activo = $4, orden = $5, updated_at = CURRENT_TIMESTAMP
       WHERE id = $6 
       RETURNING *`,
      [titulo, descripcion, imagen_url, activo === 'true' || activo === true, orden || 0, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aviso no encontrado' });
    }

    console.log('✅ Aviso actualizado:', id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar aviso:', error);
    res.status(500).json({ message: 'Error al actualizar aviso', error: error.message });
  }
});

// ========================================
// DELETE - Eliminar aviso
// ========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM avisos WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Aviso no encontrado' });
    }

    console.log('✅ Aviso eliminado:', id);
    res.json({ message: 'Aviso eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar aviso:', error);
    res.status(500).json({ message: 'Error al eliminar aviso', error: error.message });
  }
});

module.exports = router;