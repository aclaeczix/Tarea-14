const express = require('express');
const bcrypt = require('bcryptjs'); 
const Users = require('../models/users'); 
const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ error: 'Email y contraseña son requeridos' });
  }

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Credenciales incorrectas' });
    }

    res.status(200).send({ message: 'Login exitoso', user });
  } catch (error) {
    res.status(500).send({ error: 'Error al procesar la solicitud' });
  }
});

module.exports = router;
