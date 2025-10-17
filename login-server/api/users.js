const express = require('express');
const mongoose = require('mongoose');
const Users = require('../models/users');
const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (_, res) => {
  try {
    const users = await Users.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: 'Error al obtener usuarios' });
  }
});

// Crear usuario
router.post('/', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: 'Campos incompletos' });
  }

  try {
    const newUser = new Users({ name, email, password });
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: 'Error al crear usuario' });
  }
});

// Editar usuario
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'ID inválido' });
  }

  try {
    const updatedUser = await Users.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: 'Error al actualizar usuario' });
  }
});

// Eliminar usuario
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({ error: 'ID inválido' });
  }

  try {
    const deletedUser = await Users.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }
    res.status(200).send({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).send({ error: 'Error al eliminar usuario' });
  }
});

module.exports = router;
