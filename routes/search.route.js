/**
 * api/todo/:search
 */

const {Router} = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt.helpers');
const { getTodo, getDocumentColections } = require('../controllers/search.controller');
const router = Router();

router.get('/:search', validarJWT, getTodo);
router.get('/coleccion/:table/:search', validarJWT,getDocumentColections);


module.exports = router;