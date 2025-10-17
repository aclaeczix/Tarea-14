const mongoose = require('mongoose');

// Definir el esquema de un usuario
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // El nombre es obligatorio
  },
  email: {
    type: String,
    required: true,
    unique: true, // El email debe ser único
  },
  password: {
    type: String,
    required: true, // La contraseña es obligatoria
  }
});

// Crear el modelo de Usuario basado en el esquema
const Users = mongoose.model('User', userSchema);

module.exports = Users;
