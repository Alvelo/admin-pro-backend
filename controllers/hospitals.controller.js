const { response } = require("express");
const Hospital = require('../models/hospital.model');

const getHospitals = async(req, res = response) => {
    const hospitals = await Hospital.find().populate('user','name')

    return res.status(200).json({
        ok: true,
       hospitals
    })
}


const createHospital = async(req, res = response) => {
    const uid = req.uid;

  
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });
    
    try {
        const hospitalDB = await hospital.save();
        return res.status(201).json({
            ok: true,
            hospital: hospitalDB
        })
    } catch(err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const updateHospital = (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'Update Hospital'
    })
}


const deleteHospital = (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'delete Hospital'
    })
}




module.exports = {
    getHospitals,
    createHospital,
    updateHospital,
    deleteHospital
}