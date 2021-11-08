const { response } = require('express');
const Empleado = require('../models/empleados');

//Listar empleados
const getEmpleados = (req, res) => {
    Empleado.find((err, empleados) =>{
        err && res.status(500).send(err.message);
        res.status(200).json(empleados)
    })
  
}

//Creacion empleado
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

//Actualizar empleado
const actualizarEmpleado = async(req, res = response) => {
    const empleadoId = req.params.id;
    try {

        const empleado = await Empleado.findById( empleadoId )

        if ( !empleado ) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado no existe con ese ID'
            });
        }

        const nuevoEmpleado = {
            ...req.body
        }

        const empleadoActualizado = await Empleado.findByIdAndUpdate( empleadoId, nuevoEmpleado, { new: true } );

        res.json({
            ok: true,
            evento: empleadoActualizado
        });
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }    

}

//Eliminar empleado
const eliminarEmpleado = async(req, res = response ) => {
    const empleadoId = req.params.id;
    try {

        const empleado = await Empleado.findById( empleadoId )

        if ( !empleado ) {
            return res.status(404).json({
                ok: false,
                msg: 'Empleado no existe con ese ID'
            });
        }
        await Empleado.findByIdAndDelete( empleadoId );

        res.json({ ok: true, msg: 'Empleado eliminado' });
        
    } catch (error) {

        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }    
}


module.exports = {
    getEmpleados,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado
}