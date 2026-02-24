const express = require('express');
const router = express.Router();
const pool = require('../db');

// ========================================
// GET - Obtener todas las citas
// ========================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT c.*, 
             u.nombre as usuario_nombre, 
             u.email as usuario_email,
             m.nombre as mascota_nombre,
             m.especie as mascota_especie
      FROM citas c
      LEFT JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN mascotas m ON c.mascota_id = m.id
      ORDER BY c.fecha DESC, c.hora DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener citas:', error);
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
});

// ========================================
// GET - Obtener citas por usuario
// ========================================
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const result = await pool.query(`
      SELECT c.*, 
             m.nombre as mascota_nombre,
             m.especie as mascota_especie,
             m.foto_url as mascota_foto
      FROM citas c
      LEFT JOIN mascotas m ON c.mascota_id = m.id
      WHERE c.usuario_id = $1
      ORDER BY c.fecha DESC, c.hora DESC
    `, [usuario_id]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener citas del usuario:', error);
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
});

// ========================================
// GET - Obtener una cita por ID
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT c.*, 
             u.nombre as usuario_nombre,
             m.nombre as mascota_nombre
      FROM citas c
      LEFT JOIN usuarios u ON c.usuario_id = u.id
      LEFT JOIN mascotas m ON c.mascota_id = m.id
      WHERE c.id = $1
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener cita:', error);
    res.status(500).json({ message: 'Error al obtener cita', error: error.message });
  }
});

// ========================================
// POST - Crear nueva cita
// ========================================
router.post('/', async (req, res) => {
  try {
    const { usuario_id, mascota_id, fecha, hora, motivo, notas } = req.body;

    // Validar que no exista una cita en la misma fecha y hora
    const citaExistente = await pool.query(
      'SELECT * FROM citas WHERE fecha = $1 AND hora = $2 AND estado != $3',
      [fecha, hora, 'cancelada']
    );

    if (citaExistente.rows.length > 0) {
      return res.status(400).json({ 
        message: 'Ya existe una cita agendada para esa fecha y hora' 
      });
    }

    const result = await pool.query(
      `INSERT INTO citas (usuario_id, mascota_id, fecha, hora, motivo, notas, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [usuario_id, mascota_id, fecha, hora, motivo, notas, 'pendiente']
    );

    console.log('✅ Cita creada:', result.rows[0]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear cita:', error);
    res.status(500).json({ message: 'Error al crear cita', error: error.message });
  }
});

// ========================================
// PUT - Actualizar estado de cita (Admin)
// ========================================
router.put('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas } = req.body;

    const result = await pool.query(
      `UPDATE citas 
       SET estado = $1, notas = $2
       WHERE id = $3 RETURNING *`,
      [estado, notas, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar cita:', error);
    res.status(500).json({ message: 'Error al actualizar cita', error: error.message });
  }
});

// ========================================
// PUT - Reagendar cita (cambiar fecha/hora)
// ========================================
router.put('/:id/reagendar', async (req, res) => {
  try {
    const { id } = req.params;
    const { fecha, hora } = req.body;

    // Validar que no exista otra cita en esa fecha/hora
    const citaExistente = await pool.query(
      'SELECT * FROM citas WHERE fecha = $1 AND hora = $2 AND id != $3 AND estado != $4',
      [fecha, hora, id, 'cancelada']
    );

    if (citaExistente.rows.length > 0) {
      return res.status(400).json({ 
        message: 'Ya existe una cita agendada para esa fecha y hora' 
      });
    }

    const result = await pool.query(
      `UPDATE citas 
       SET fecha = $1, hora = $2
       WHERE id = $3 RETURNING *`,
      [fecha, hora, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al reagendar cita:', error);
    res.status(500).json({ message: 'Error al reagendar cita', error: error.message });
  }
});

// ========================================
// DELETE - Cancelar/Eliminar cita
// ========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Opción 1: Marcar como cancelada (recomendado)
    const result = await pool.query(
      `UPDATE citas SET estado = 'cancelada' WHERE id = $1 RETURNING *`,
      [id]
    );

    // Opción 2: Eliminar permanentemente
    // const result = await pool.query('DELETE FROM citas WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    res.json({ message: 'Cita cancelada exitosamente', cita: result.rows[0] });
  } catch (error) {
    console.error('Error al cancelar cita:', error);
    res.status(500).json({ message: 'Error al cancelar cita', error: error.message });
  }
});

module.exports = router;