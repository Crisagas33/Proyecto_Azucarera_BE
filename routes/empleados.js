const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { getEmpleados, crearEmpleado, actualizarEmpleado, eliminarEmpleado } = require('../controllers/empleados');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//Ruta listar empleados
router.get('/lista', getEmpleados)

//Ruta agregar empleado
router.post('/new', [
    check('dpi', 'El dpi es una obligación').not().isEmpty(),
    check('nombre', 'El nombre es una obligación').not().isEmpty(),
    check('apellido', 'El apellido es una obligación').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es una obligación').not().isEmpty(),
    check('puesto', 'El puesto es una obligación').not().isEmpty(),
    check('fechaContratacion', 'La fecha de contratacion es una obligación').not().isEmpty(),    
    validarCampos
],crearEmpleado)

//Ruta actualizar empleado
router.put('/:id', [
    check('dpi', 'El dpi es una obligación').not().isEmpty(),
    check('nombre', 'El nombre es una obligación').not().isEmpty(),
    check('apellido', 'El apellido es una obligación').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es una obligación').not().isEmpty(),
    check('puesto', 'El puesto es una obligación').not().isEmpty(),
    check('fechaContratacion', 'La fecha de contratacion es una obligación').not().isEmpty(),
        validarCampos
    ], 
    actualizarEmpleado 
);

//Ruta eliminar empleado
router.delete('/:id', eliminarEmpleado );


module.exports = router