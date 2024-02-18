/**
 * /api/doctors
 * User Route files
 */

const {Router} = require('express');
const { getDoctors, updateDoctor, createDoctor, deleteDoctor } = require('../controllers/doctors.controller');
const { validarJWT } = require('../helpers/validar-jwt.helpers');
const {check} = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/' , [validarJWT], getDoctors);
 
router.post('/', [validarJWT, 
    check('name', 'name is required').notEmpty(),
    check('hospital', 'hospital is required').notEmpty(),
    check('hospital', 'Must be valid MongoID').isMongoId(),
    validarCampos
], createDoctor);

router.put('/:id',[],updateDoctor ),

router.delete('/:id',deleteDoctor)



module.exports = router;