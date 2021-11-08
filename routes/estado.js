const {Router} = require('express'); 
const {check} = require('express-validator'); 
const { getEstado, crearEstado, actualizarEstado } = require('../controllers/estado');
const router = Router();

router.get('/lista', getEstado)


router.post('/new', crearEstado)

router.put('/:id', actualizarEstado)

module.exports = router