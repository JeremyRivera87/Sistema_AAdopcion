const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');

// ========================================
// GET - Obtener información de un usuario por ID
// ========================================
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'SELECT id, nombre, cedula, edad, email, telefono, direccion, rol FROM usuarios WHERE id = $1',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
  }
});

// ========================================
// PUT - Actualizar información del usuario (excepto cédula)
// ========================================
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, email, telefono, direccion } = req.body;

    // Verificar si el email ya existe en otro usuario
    const emailCheck = await pool.query(
      'SELECT id FROM usuarios WHERE email = $1 AND id != $2',
      [email, id]
    );

    if (emailCheck.rows.length > 0) {
      return res.status(400).json({ message: 'El email ya está registrado por otro usuario' });
    }

    const result = await pool.query(
      `UPDATE usuarios 
       SET nombre = $1, edad = $2, email = $3, telefono = $4, direccion = $5
       WHERE id = $6 
       RETURNING id, nombre, cedula, edad, email, telefono, direccion, rol`,
      [nombre, edad || null, email, telefono || null, direccion || null, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    console.log('✅ Usuario actualizado:', id);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Error al actualizar usuario:', error);
    res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
  }
});

// ========================================
// PUT - Cambiar contraseña del usuario
// ========================================
router.put('/:id/cambiar-password', async (req, res) => {
  try {
    const { id } = req.params;
    const { passwordActual, passwordNuevo } = req.body;

    if (!passwordActual || !passwordNuevo) {
      return res.status(400).json({ message: 'Debes proporcionar la contraseña actual y la nueva' });
    }

    if (passwordNuevo.length < 6) {
      return res.status(400).json({ message: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    const userResult = await pool.query(
      'SELECT password FROM usuarios WHERE id = $1',
      [id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const usuario = userResult.rows[0];

    const passwordValida = await bcrypt.compare(passwordActual, usuario.password);

    if (!passwordValida) {
      return res.status(401).json({ message: 'La contraseña actual es incorrecta' });
    }

    const hashedPassword = await bcrypt.hash(passwordNuevo, 10);

    await pool.query(
      'UPDATE usuarios SET password = $1 WHERE id = $2',
      [hashedPassword, id]
    );

    console.log('✅ Contraseña actualizada para usuario:', id);
    res.json({ message: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error al cambiar contraseña:', error);
    res.status(500).json({ message: 'Error al cambiar contraseña', error: error.message });
  }
});

module.exports = router;