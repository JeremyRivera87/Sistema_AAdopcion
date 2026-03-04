const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../db');

// ========================================
// CONFIGURACIÓN DE MULTER (documentos)
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/documentos/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'doc-' + uniqueName + path.extname(file.originalname));
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
// POST - Crear solicitud de adopción
// ========================================
router.post('/', upload.fields([
  { name: 'cedula', maxCount: 1 },
  { name: 'servicio_basico', maxCount: 1 },
  { name: 'foto_vivienda', maxCount: 1 },
  { name: 'foto_jardin', maxCount: 1 }
]), async (req, res) => {
  try {
    const datos = req.body;

    console.log('📝 Datos recibidos:', datos);

    // URLs de archivos
    const cedula_url = req.files['cedula'] ? `/uploads/documentos/${req.files['cedula'][0].filename}` : null;
    const servicio_basico_url = req.files['servicio_basico'] ? `/uploads/documentos/${req.files['servicio_basico'][0].filename}` : null;
    const foto_vivienda_url = req.files['foto_vivienda'] ? `/uploads/documentos/${req.files['foto_vivienda'][0].filename}` : null;
    const foto_jardin_url = req.files['foto_jardin'] ? `/uploads/documentos/${req.files['foto_jardin'][0].filename}` : null;

    // Calcular edad
    const edad = datos.fecha_nacimiento 
      ? new Date().getFullYear() - new Date(datos.fecha_nacimiento).getFullYear()
      : null;

    const result = await pool.query(
      `INSERT INTO solicitudes_adopcion 
       (usuario_id, mascota_id, nombre_completo, cedula, fecha_nacimiento, edad, estado_civil, ocupacion,
        email, telefono_celular, telefono_fijo, provincia, ciudad, sector, direccion_completa, referencia_direccion,
        tipo_vivienda, vivienda_es, tamaño_vivienda, tiene_jardin, tamaño_jardin, tiene_patio, esta_cerrado, altura_cerca,
        vive_solo, numero_adultos, numero_niños, edades_niños, todos_acuerdo, quien_se_opone,
        tiene_mascotas_actuales, numero_perros, numero_gatos, otras_mascotas, detalles_mascotas, 
        mascotas_esterilizadas, mascotas_vacunadas,
        ha_tenido_mascotas, que_paso_mascotas_anteriores, experiencia_con_especie, descripcion_experiencia,
        motivo_adopcion, que_busca_mascota, caracteristicas_deseadas, esta_dispuesto_gastos, presupuesto_mensual,
        quien_cuidara, horas_solo_diarias, donde_estara_mascota, donde_dormira,
        que_haria_si_viaja, que_haria_si_enferma, que_haria_si_problemas_conducta, 
        dispuesto_entrenamiento, dispuesto_seguimiento,
        tiene_veterinario, nombre_veterinario, telefono_veterinario,
        referencia1_nombre, referencia1_telefono, referencia1_relacion,
        referencia2_nombre, referencia2_telefono, referencia2_relacion,
        cedula_url, servicio_basico_url, foto_vivienda_url, foto_jardin_url,
        acepta_visita_domiciliaria, acepta_seguimiento, acepta_terminos, estado)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, 
               $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
               $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, 
               $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, 
               $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, 
               $51, $52, $53, $54, $55, $56, $57, $58, $59, $60, 
               $61, $62, $63, $64, $65, $66, $67, $68, $69, $70, $71, $72)
       RETURNING *`,
      [
        // 1-10
        datos.usuario_id || null,
        datos.mascota_id || null,
        datos.nombre_completo || '',
        datos.cedula || '',
        datos.fecha_nacimiento || null,
        edad,
        datos.estado_civil || '',
        datos.ocupacion || '',
        datos.email || '',
        datos.telefono_celular || '',
        
        // 11-20
        datos.telefono_fijo || null,
        datos.provincia || '',
        datos.ciudad || '',
        datos.sector || '',
        datos.direccion_completa || '',
        datos.referencia_direccion || null,
        datos.tipo_vivienda || '',
        datos.vivienda_es || '',
        datos.tamaño_vivienda || null,
        datos.tiene_jardin === 'true',
        
        // 21-30
        datos.tamaño_jardin || null,
        datos.tiene_patio === 'true',
        datos.esta_cerrado === 'true',
        datos.altura_cerca || null,
        datos.vive_solo === 'true',
        parseInt(datos.numero_adultos) || 0,
        parseInt(datos.numero_niños) || 0,
        datos.edades_niños || null,
        datos.todos_acuerdo === 'true',
        datos.quien_se_opone || null,
        
        // 31-40
        datos.tiene_mascotas_actuales === 'true',
        parseInt(datos.numero_perros) || 0,
        parseInt(datos.numero_gatos) || 0,
        datos.otras_mascotas || null,
        datos.detalles_mascotas || null,
        datos.mascotas_esterilizadas === 'true',
        datos.mascotas_vacunadas === 'true',
        datos.ha_tenido_mascotas === 'true',
        datos.que_paso_mascotas_anteriores || null,
        datos.experiencia_con_especie === 'true',
        
        // 41-50
        datos.descripcion_experiencia || null,
        datos.motivo_adopcion || '',
        datos.que_busca_mascota || null,
        datos.caracteristicas_deseadas || null,
        datos.esta_dispuesto_gastos === 'true',
        datos.presupuesto_mensual || null,
        datos.quien_cuidara || '',
        datos.horas_solo_diarias || null,
        datos.donde_estara_mascota || null,
        datos.donde_dormira || null,
        
        // 51-60
        datos.que_haria_si_viaja || null,
        datos.que_haria_si_enferma || null,
        datos.que_haria_si_problemas_conducta || null,
        datos.dispuesto_entrenamiento === 'true',
        datos.dispuesto_seguimiento === 'true',
        datos.tiene_veterinario === 'true',
        datos.nombre_veterinario || null,
        datos.telefono_veterinario || null,
        datos.referencia1_nombre || null,
        datos.referencia1_telefono || null,
        
        // 61-67
        datos.referencia1_relacion || null,
        datos.referencia2_nombre || null,
        datos.referencia2_telefono || null,
        datos.referencia2_relacion || null,
        cedula_url,
        servicio_basico_url,
        foto_vivienda_url,
        foto_jardin_url,
        datos.acepta_visita_domiciliaria === 'true',
        datos.acepta_seguimiento === 'true',
        datos.acepta_terminos === 'true',
        'pendiente'
      ]
    );

    console.log('✅ Solicitud registrada:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error completo:', error);
    res.status(500).json({ message: 'Error al crear solicitud', error: error.message });
  }
});
// ========================================
// GET - Obtener todas las solicitudes
// ========================================
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT s.*, 
             u.nombre as usuario_nombre,
             u.email as usuario_email,
             m.nombre as mascota_nombre,
             m.especie as mascota_especie,
             m.foto_url as mascota_foto
      FROM solicitudes_adopcion s
      LEFT JOIN usuarios u ON s.usuario_id = u.id
      LEFT JOIN mascotas m ON s.mascota_id = m.id
      ORDER BY s.created_at DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener solicitudes:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
  }
});
// ========================================
// GET - Obtener UNA solicitud por ID
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT s.*, 
             u.nombre as usuario_nombre,
             u.email as usuario_email,
             m.nombre as mascota_nombre,
             m.especie as mascota_especie,
             m.foto_url as mascota_foto
      FROM solicitudes_adopcion s
      LEFT JOIN usuarios u ON s.usuario_id = u.id
      LEFT JOIN mascotas m ON s.mascota_id = m.id
      WHERE s.id = $1
    `, [id]);

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
// GET - Obtener solicitudes por usuario
// ========================================
router.get('/usuario/:usuario_id', async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const result = await pool.query(`
      SELECT s.*, 
             m.nombre as mascota_nombre,
             m.especie as mascota_especie,
             m.foto_url as mascota_foto
      FROM solicitudes_adopcion s
      LEFT JOIN mascotas m ON s.mascota_id = m.id
      WHERE s.usuario_id = $1
      ORDER BY s.created_at DESC
    `, [usuario_id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener solicitudes del usuario:', error);
    res.status(500).json({ message: 'Error al obtener solicitudes', error: error.message });
  }
});

// ========================================
// PUT - Actualizar estado de solicitud (Admin)
// ========================================
router.put('/:id/estado', async (req, res) => {
  try {
    const { id } = req.params;
    const { estado, notas_admin } = req.body;

    const result = await pool.query(
      `UPDATE solicitudes_adopcion 
       SET estado = $1, notas_admin = $2, fecha_revision = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
       WHERE id = $3 RETURNING *`,
      [estado, notas_admin, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Solicitud no encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar solicitud:', error);
    res.status(500).json({ message: 'Error al actualizar solicitud', error: error.message });
  }
});

module.exports = router;