const { Schema, model } = require('mongoose');

const estadoSchema = Schema({
    lote: {
        type: Number,
    },
    cantPlantada: {
        type: String,
    },
    cantExtraida: {
        type: String,
    },
    estado: {
        type: Boolean,
    }
});

module.exports = model( 'Estado', estadoSchema );