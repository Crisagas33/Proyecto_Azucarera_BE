const { Schema, model } = require('mongoose');

const empleadoSchema = Schema({
    dpi: {
        type: String,
        required: [true, 'El dpi es obligatorio']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    apellido: {
        type: String,
        required: [true, 'El apellido es obligatoria']
    },
    fechaNacimiento: {
        type: String,
        required: [true, 'La fecha de nacimiento es obligatoria']
    },
    puesto: {
        type: String,
        required: [true, 'El puesto es obligatorio']
    },
    fechaContratacion: {
        type: String,
        required: [true, 'La fecha de contratación es obligatoria']
    },
});

module.exports = model( 'Empleado', empleadoSchema );