const { response } = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const  bcryptjs  = require('bcryptjs');
const Usuario = require('../models/user');

const crearUsuario = async (req, res = response) => {

    const {nombre,correo,contra} = req.body;

    try {
        let usuario = await Usuario.findOne({correo});
        if (usuario) {
            return res.status(401).json({
                ok: false, 
                msg: 'No existe user con ese email'
            })
        }
        usuario = new Usuario(req.body)

        const salt = bcryptjs.genSaltSync()
        usuario.contra = bcryptjs.hashSync(contra, salt)

        await usuario.save()

        const token = await generarJWT(usuario.nombre)

        res.status(201).json({
            ok: true,
            msg: 'Si se pudo',
            name: usuario.nombre,
            token
        })

    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'No se pudo'
        })  
    }
}

const loginUsuario = async (req, res = response) => {

    const { correo, contra } = req.body;

    try {

        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        const validPassword = bcryptjs.compareSync( contra, usuario.contra );
        if( !validPassword ){
            return res.status(402).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        const token = await generarJWT( usuario.nombre );

        res.json({
            usuario,
            token
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({
            msg: 'Hable con soporte'
        })

    }

}

module.exports = {
    crearUsuario,
    loginUsuario,
}