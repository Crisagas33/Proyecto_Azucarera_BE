const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { crearTransaccion } = require('../controllers/trans');
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/transac', [
    check('id', 'El id es una obligación').not().isEmpty(),
    check('cuentaUsuario', 'La cuenta del Usuario es una obligación').not().isEmpty(),
    check('cuentaReceptor', 'La cuenta del Receptor es una obligación').not().isEmpty(),   
    check('monto', 'El monto no debe superar los Q.5,000.°°').not().isEmpty(),
    validarCampos
],crearTransaccion)

module.exports = router