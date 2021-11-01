const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { crearEmpleado } = require('../controllers/empleados');
const { validarJWT } = require('../helpers/generar-jwt'); 
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

//router.use(validarJWT);

router.post('/new', [
    check('dpi', 'El dpi es una obligación').not().isEmpty(),
    check('nombre', 'El nombre es una obligación').not().isEmpty(),
    check('apellido', 'El apellido es una obligación').not().isEmpty(),
    check('fechaNacimiento', 'La fecha de nacimiento es una obligación').not().isEmpty(),
    check('puesto', 'El puesto es una obligación').not().isEmpty(),
    check('fechaContratacion', 'La fecha de contratacion es una obligación').not().isEmpty(),    
    validarCampos
],crearEmpleado)

// router.post('/login', [
//     check('correo', 'El correo es una obligación').isEmail(),
//     check('contra', 'La contraseña debe tener 8 carácteres como minimo').isLength({min:8}),    
//     validarCampos
// ],loginUsuario)

module.exports = router