const express = require('express');
const router = express.Router();
const pool = require('../db');

// ========================================
// POST - Crear nueva solicitud de voluntariado
// ========================================
router.post('/', async (req, res) => {
  try {
    const {
      nombre,
      cedula,
      email,
      telefono,
      fecha_nacimiento,
      direccion,
      ciudad,
      nivel_educacion,
      profesion_ocupacion,
      disponibilidad_dias,
      disponibilidad_horario,
      horas_semanales,
      experiencia_previa,
      detalle_experiencia,
      habilidades_especiales,
      areas_interes,
      por_que_voluntario,
      tiene_referencias,
      nombre_referencia_1,
      telefono_referencia_1,
      nombre_referencia_2,
      telefono_referencia_2
    } = req.body;

    const result = await pool.query(
      `INSERT INTO solicitudes_voluntariado (
        nombre, cedula, email, telefono, fecha_nacimiento, direccion, ciudad,
        nivel_educacion, profesion_ocupacion,
        disponibilidad_dias, disponibilidad_horario, horas_semanales,
        experiencia_previa, detalle_experiencia, habilidades_especiales,
        areas_interes, por_que_voluntario,
        tiene_referencias, nombre_referencia_1, telefono_referencia_1,
        nombre_referencia_2, telefono_referencia_2
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)
      RETURNING *`,
      [
        nombre, cedula, email, telefono, fecha_nacimiento, direccion, ciudad,
        nivel_educacion, profesion_ocupacion,
        JSON.stringify(disponibilidad_dias),
        disponibilidad_horario,
        horas_semanales,
        experiencia_previa,
        detalle_experiencia,
        habilidades_especiales,
        JSON.stringify(areas_interes),
        por_que_voluntario,
        tiene_referencias,
        nombre_referencia_1,
        telefono_referencia_1,
        nombre_referencia_2,
        telefono_referencia_2
      ]
    );

    console.log('✅ Nueva solicitud de voluntariado creada:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al crear solicitud:', error);
    res.status(500).json({ message: 'Error al crear solicitud', error: error.message });
  }
});

// ========================================
// GET - Obtener todas las solicitudes (Admin)
// ========================================
router.get('/', async (req, res) => {
  try {
    const { estado } = req.query;
    
    let query = 'SELECT * FROM solicitudes_voluntariado';
    let params = [];
    
    if (estado) {
      query += ' WHERE estado = $1';
      params.push(estado);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
  }
});

// ========================================
// GET - Obtener solicitud por ID
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT * FROM solicitudes_voluntariado WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener solicitud:', error);
    res.status(500).json({ message: 'Error al obtener solicitud', error: error.message });
  }
});

// ========================================
// PUT - Actualizar estado de solicitud (Admin)
// ========================================
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas_admin } = req.body;

    let query = 'UPDATE solicitudes_voluntariado SET estado = $1, notas_admin = $2';
    let params = [estado, notas_admin, id];

    // Si se aprueba, guardar fecha de aprobación
    if (estado === 'aprobado') {
      query += ', fecha_aprobacion = CURRENT_TIMESTAMP';
    }

    query += ' WHERE id = $3 RETURNING *';

    const result = await pool.query(query, params);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    console.log('✅ Solicitud actualizada:', id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    res.status(500).json({ message: 'Error al actualizar solicitud', error: error.message });
  }
});

// ========================================
// DELETE - Eliminar solicitud
// ========================================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM solicitudes_voluntariado WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    console.log('✅ Solicitud eliminada:', id);
    res.json({ message: 'Solicitud eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar solicitud:', error);
    res.status(500).json({ message: 'Error al eliminar solicitud', error: error.message });
  }
});

// ========================================
// GET - Estadísticas de voluntariado
// ========================================
router.get('/stats/general', async (req, res) => {
  try {
    const stats = await pool.query(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE estado = 'pendiente') as pendientes,
        COUNT(*) FILTER (WHERE estado = 'aprobado') as aprobados,
        COUNT(*) FILTER (WHERE estado = 'rechazado') as rechazados
      FROM solicitudes_voluntariado
    `);

    res.json(stats.rows[0]);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas', error: error.message });
  }
});

module.exports = router;