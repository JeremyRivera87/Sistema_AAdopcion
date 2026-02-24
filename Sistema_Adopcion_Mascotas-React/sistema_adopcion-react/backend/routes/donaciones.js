const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../db'); // Ajusta según tu estructura

// ========================================
// CONFIGURACIÓN DE MULTER (para comprobantes)
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/comprobantes/'); // Crea esta carpeta
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'comprobante-' + uniqueName + path.extname(file.originalname));
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: fileFilter
});

// ========================================
// GET - Obtener todas las donaciones
// ========================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.*, 
             u.nombre as usuario_nombre,
             u.email as usuario_email
      FROM donaciones d
      LEFT JOIN usuarios u ON d.usuario_id = u.id
      ORDER BY d.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener donaciones:', error);
    res.status(500).json({ message: 'Error al obtener donaciones', error: error.message });
  }
});

// ========================================
// GET - Obtener donaciones por usuario
// ========================================
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const result = await pool.query(
      'SELECT * FROM donaciones WHERE usuario_id = $1 ORDER BY created_at DESC',
      [usuario_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener donaciones del usuario:', error);
    res.status(500).json({ message: 'Error al obtener donaciones', error: error.message });
  }
});

// ========================================
// GET - Obtener estadísticas de donaciones
// ========================================
router.get('/stats', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        COUNT(*) as total_donaciones,
        SUM(monto) as total_recaudado,
        AVG(monto) as promedio_donacion,
        COUNT(CASE WHEN estado = 'completada' THEN 1 END) as completadas,
        COUNT(CASE WHEN estado = 'pendiente' THEN 1 END) as pendientes
      FROM donaciones
    `);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
});

// ========================================
// POST - Crear nueva donación (CON COMPROBANTE OPCIONAL)
// ========================================
router.post('/', upload.single('comprobante'), async (req, res) => {
  try {
    const { 
      usuario_id, 
      nombre_donante, 
      email_donante, 
      monto, 
      tipo_donacion, 
      metodo_pago, 
      mensaje 
    } = req.body;

    // Si se subió un comprobante
    const comprobante_url = req.file ? `/uploads/comprobantes/${req.file.filename}` : null;

    console.log('📝 Datos de donación recibidos:', { 
      usuario_id, 
      nombre_donante, 
      email_donante, 
      monto, 
      tipo_donacion,
      metodo_pago,
      comprobante_url 
    });

    const result = await pool.query(
      `INSERT INTO donaciones 
       (usuario_id, nombre_donante, email_donante, monto, tipo_donacion, metodo_pago, mensaje, comprobante_url, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
      [usuario_id, nombre_donante, email_donante, monto, tipo_donacion, metodo_pago, mensaje, comprobante_url, 'completada']
    );

    console.log('✅ Donación registrada:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al registrar donación:', error);
    res.status(500).json({ message: 'Error al registrar donación', error: error.message });
  }
});

// ========================================
// PUT - Actualizar estado de donación (Admin)
// ========================================
router.put('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado } = req.body;

    const result = await pool.query(
      'UPDATE donaciones SET estado = $1 WHERE id = $2 RETURNING *',
      [estado, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donación no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar donación:', error);
    res.status(500).json({ message: 'Error al actualizar donación', error: error.message });
  }
});

// ========================================
// DELETE - Eliminar donación
// ========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM donaciones WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Donación no encontrada' });
    }

    res.json({ message: 'Donación eliminada exitosamente', donacion: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar donación:', error);
    res.status(500).json({ message: 'Error al eliminar donación', error: error.message });
  }
});

module.exports = router;