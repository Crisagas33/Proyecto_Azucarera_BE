const { Schema, model } = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    contra: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
});

module.exports = model( 'Usuario', usuarioSchema );