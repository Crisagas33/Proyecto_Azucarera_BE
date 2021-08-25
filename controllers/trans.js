const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Transaccion = require('../models/transaccion');

const crearTransaccion = async (req, res = response) => {

    const {id,cuentaUsuario,cuentaReceptor,monto} = req.body;
    
    try {
        
        transaccion = new Transaccion(req.body)

        await transaccion.save()

        const token = await generarJWT(transaccion.id, transaccion.cuentaUsuario, transaccion.cuentaReceptor, transaccion.monto)

        res.status(201).json({
            ok: true,
            msg: 'Si se pudo',
            name: transaccion.id,
            token
        })

    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'No se pudo'
        })  
    }
}

module.exports = {
    crearTransaccion
}