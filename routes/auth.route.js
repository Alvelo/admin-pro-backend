
// PATH: 'api/login'

const {Router} = require('express');
const { login } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validarCampos
], login)



module.exports = router;