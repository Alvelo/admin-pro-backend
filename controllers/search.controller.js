// get Todo a base del search'

const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Doctor = require("../models/doctor.model");


const getTodo = async(req, res) => {
    const search = req.params.search;
    const regex = new RegExp(search, 'i');

    // const users = await Usuario.find({name: regex})
    // const hospitals = await Hospital.find({name:regex});
    // const doctors = await Doctor.find({name: regex});

    const [users,hospitals,doctors] = await Promise.all([
         Usuario.find({name: regex}),
         Hospital.find({name:regex}),
         Doctor.find({name: regex})
    ]);

    return res.status(200).json({
        ok: true,
        users,
        hospitals,
        doctors
    });
}

const getDocumentColections = async( req, res) => {
    const table = req.params.table;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    let data = [];

    switch (table) {
        case 'Doctor':
            data = await Doctor.find({name: regex})
                                .populate('user','name img')
                                .populate('hospital', 'name img');
            break;
        case 'Hospital':
            data = await Hospital.find({name: regex})
                                .populate('user', 'name img');
            break;
        case 'Usuario':
            data = await Usuario.find({name: regex});
            break;
        default:
           return res.status(400).json({
                ok: true,
                msg: 'La tabla tiene que ser Usuario/Doctor/Hospital'
            });
    }
    return res.status(200).json({
        ok: true,
        collection: data
    })
}


module.exports = {getTodo,getDocumentColections}