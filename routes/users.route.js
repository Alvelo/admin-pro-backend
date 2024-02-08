/**
 * User Route files
 */
const {Router} = require('express');
const {getUsers,postUser, updateUser, deleteUser } = require('../controllers/users.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');




const router = Router();

router.get('/', getUsers);
 
router.post('/', [
    check('name', 'name is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    check('password', 'password is required').notEmpty()
],validarCampos,postUser);

router.put('/:id',
[
    check('name', 'name is required').notEmpty(),
    check('email', 'email is required').isEmail(),
    check('role', 'role is required').notEmpty() 
], updateUser),

router.delete('/:id',deleteUser)



module.exports = router;