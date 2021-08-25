const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { crearUsuario, loginUsuario } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es una obligación').not().isEmpty(),
    check('correo', 'El correo es una obligación').isEmail(),
    check('contra', 'La contraseña debe tener 8 carácteres como minimo').isLength({min:8}),    
    validarCampos
],crearUsuario)

router.post('/login', [
    check('correo', 'El correo es una obligación').isEmail(),
    check('contra', 'La contraseña debe tener 8 carácteres como minimo').isLength({min:8}),    
    validarCampos
],loginUsuario)

module.exports = router