const { Schema, model } = require('mongoose');

const transaccionSchema = Schema({
    id: {
        type: Number,
        required: [true, 'El id es obligatorio'],
        unique: true
    },
    cuentaUsuario: {
        type: Number,
        required: [true, 'La cuenta es obligatoria'],
        unique: true
    },
    cuentaReceptor: {
        type: Number,
        required: [true, 'La cuenta es obligatoria'],
        unique: true
    },
    monto: {
        type: Number,
        required: [true, 'El monto es obligatorio']
    },
});

module.exports = model( 'Transaccion', transaccionSchema );