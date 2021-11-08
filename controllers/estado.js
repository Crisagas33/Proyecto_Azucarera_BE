const { response } = require('express');
const Estado = require('../models/estado');

//Listar estado
const getEstado = (req, res) => {
    Estado.find((err, estados) =>{
        err && res.status(500).send(err.message);
        res.status(200).json(estados)
    })
}

//Creacion empleado
const crearEstado = async (req, res = response) => {
    const {lote, cantPlantada, cantExtraida} = req.body;
    try {
        let estado = await Estado.findOne({lote});
        if (estado) {
            return res.status(401).json({
                ok: false, 
                msg: 'El lote ya existe'
            })
        }
        estado = new Estado(req.body)
        
        await estado.save()

        res.status(201).json({
            ok: true,
            msg: 'Si se pudo',
            lote: estado.lote,
            cantPlantada: estado.cantPlantada,
            cantExtraida: estado.cantExtraida,
            estado: estado.estado,
        })

    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'No se pudo'
        })  
    }
}

const actualizarEstado = async(req, res = response) => {
    const estadoId = req.params.id;
    try {

        const estado = await Estado.findById(estadoId)

        if ( !estado ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe el lote'
            });
        }

        const nuevoEstado = {
            ...req.body
        }

        const estadoActualizado = await Estado.findByIdAndUpdate( estadoId, nuevoEstado, { new: true } );

        res.json({
            ok: true,
            evento: estadoActualizado
        });
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }    

}

module.exports = {
    getEstado,
    crearEstado,
    actualizarEstado,
}