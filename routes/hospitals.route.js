/**
 * /api/hospitals
 * User Route files
 */
const {Router} = require('express');
const {getUsers,postUser, updateUser, deleteUser } = require('../controllers/users.controller');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../helpers/validar-jwt.helpers');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');


const router = Router();

router.get('/' ,getHospitals);
 
router.post('/', [
    validarJWT,
    check('name', 'name of the hospital is required').notEmpty(),
    validarCampos
],createHospital);

router.put('/:id',[], updateHospital),

router.delete('/:id',deleteHospital)



module.exports = router;