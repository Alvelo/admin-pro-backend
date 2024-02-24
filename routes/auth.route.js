
// PATH: 'api/login'

const {Router} = require('express');
const { login, authGoogleLogin } = require('../controllers/auth.controller');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validarCampos
], login)

router.post('/google',[
    
    check('token', 'Google token is required').notEmpty(),
    validarCampos
], authGoogleLogin)



module.exports = router;