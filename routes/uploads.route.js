/**
 * ruta: api/uploads/
 */
const {Router} = require('express');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt.helpers');
const { fileUpload, getImg } = require('../controllers/uploads.controller');
const expressFileUpload = require('express-fileupload');

const router = Router();
router.use(expressFileUpload());
router.put('/:type/:id', validarJWT,fileUpload);
router.get('/:type/:img', validarJWT,getImg);

module.exports = router;