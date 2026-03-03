router.post('/', upload.fields([
  { name: 'cedula', maxCount: 1 },
  { name: 'servicio_basico', maxCount: 1 },
  { name: 'foto_vivienda', maxCount: 1 },
  { name: 'foto_jardin', maxCount: 1 }
]), async (req, res) => {
  try {
    const datos = req.body;

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
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, 
               $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, 
               $39, $40, $41, $42, $43, $44, $45, $46, $47, $48, $49, $50, $51, $52, $53, $54, $55, $56, 
               $57, $58, $59, $60, $61, $62, $63, $64, $65, $66, $67, $68)
       RETURNING *`,
      [
        datos.usuario_id, datos.mascota_id, datos.nombre_completo, datos.cedula, datos.fecha_nacimiento, edad,
        datos.estado_civil, datos.ocupacion, datos.email, datos.telefono_celular, datos.telefono_fijo,
        datos.provincia, datos.ciudad, datos.sector, datos.direccion_completa, datos.referencia_direccion,
        datos.tipo_vivienda, datos.vivienda_es, datos.tamaño_vivienda, datos.tiene_jardin === 'true', datos.tamaño_jardin,
        datos.tiene_patio === 'true', datos.esta_cerrado === 'true', datos.altura_cerca,
        datos.vive_solo === 'true', parseInt(datos.numero_adultos) || 0, parseInt(datos.numero_niños) || 0, 
        datos.edades_niños, datos.todos_acuerdo === 'true', datos.quien_se_opone,
        datos.tiene_mascotas_actuales === 'true', parseInt(datos.numero_perros) || 0, parseInt(datos.numero_gatos) || 0,
        datos.otras_mascotas, datos.detalles_mascotas, datos.mascotas_esterilizadas === 'true', datos.mascotas_vacunadas === 'true',
        datos.ha_tenido_mascotas === 'true', datos.que_paso_mascotas_anteriores, datos.experiencia_con_especie === 'true', 
        datos.descripcion_experiencia, datos.motivo_adopcion, datos.que_busca_mascota, datos.caracteristicas_deseadas,
        datos.esta_dispuesto_gastos === 'true', datos.presupuesto_mensual, datos.quien_cuidara, datos.horas_solo_diarias,
        datos.donde_estara_mascota, datos.donde_dormira, datos.que_haria_si_viaja, datos.que_haria_si_enferma,
        datos.que_haria_si_problemas_conducta, datos.dispuesto_entrenamiento === 'true', datos.dispuesto_seguimiento === 'true',
        datos.tiene_veterinario === 'true', datos.nombre_veterinario, datos.telefono_veterinario,
        datos.referencia1_nombre, datos.referencia1_telefono, datos.referencia1_relacion,
        datos.referencia2_nombre, datos.referencia2_telefono, datos.referencia2_relacion,
        cedula_url, servicio_basico_url, foto_vivienda_url, foto_jardin_url,
        datos.acepta_visita_domiciliaria === 'true', datos.acepta_seguimiento === 'true', datos.acepta_terminos === 'true',
        'pendiente'
      ]
    );

    console.log('✅ Solicitud registrada:', result.rows[0].id);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Error al crear solicitud', error: error.message });
  }
});