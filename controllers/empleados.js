const { response } = require('express');
const Empleado = require('../models/empleados');

//Listar empleados
const getEmpleados = async(req, res = response ) => {

    const empleado = await Empleado.find();

    res.json({
        ok: true,
        empleado
    })
}

const crearEmpleado = async (req, res = response) => {

    const {dpi,nombre,apellido,fechaNacimiento,puesto,fechaContratacion} = req.body;

    try {
        let empleado = await Empleado.findOne({dpi});
        if (empleado) {
            return res.status(401).json({
                ok: false, 
                msg: 'El empleado ya existe'
            })
        }
        empleado = new Empleado(req.body)
        
        await empleado.save()

        res.status(201).json({
            ok: true,
            msg: 'Si se pudo',
            name: empleado.nombre
        })

    } catch (error) {
        res.status(501).json({
            ok: false,
            msg: 'No se pudo'
        })  
    }
}

// const loginUsuario = async (req, res = response) => {

//     const { correo, contra } = req.body;

//     try {

//         const usuario = await Usuario.findOne({ correo });
//         if ( !usuario ) {
//             return res.status(400).json({
//                 msg: 'Usuario / Password no son correctos'
//             });
//         }

//         const validPassword = bcryptjs.compareSync( contra, usuario.contra );
//         if( !validPassword ){
//             return res.status(402).json({
//                 msg: 'Usuario / Password no son correctos'
//             });
//         }

//         const token = await generarJWT( usuario.nombre );

//         res.json({
//             usuario,
//             token
//         })

//     } catch (error) {

//         console.log(error)
//         return res.status(500).json({
//             msg: 'Hable con soporte'
//         })

//     }

// }

module.exports = {
    crearEmpleado,
    //loginUsuario,
}