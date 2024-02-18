/**
 * User Route files
 */
const {Router} = require('express');
const {getUsers,postUser, updateUser, deleteUser } = require('../controllers/users.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt.helpers');




const router = Router();

router.get('/',validarJWT ,getUsers);
 
router.post('/', [
    check('name', 'name is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').notEmpty()
],validarCampos,postUser);

router.put('/:id',
[
    validarJWT,
    check('name', 'name is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').notEmpty(),
    validarCampos 
], updateUser),

router.delete('/:id',validarJWT,deleteUser)



module.exports = router;