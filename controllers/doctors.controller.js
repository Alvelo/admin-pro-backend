const { response } = require("express");
const Doctor = require("../models/doctor.model");
const Hospital = require('../models/hospital.model');


const getDoctors = async(req, res = response) => {


    const doctors = await Doctor.find()
                                    .populate('user', 'name')
                                    .populate('hospital','name')
    return res.status(200).json({
        ok: true,
       doctors
    })
}


const createDoctor = async(req, res = response) => {
    const uid = req.uid;
    const _id = req.body.hospital;
    const hospitalDB = await Hospital.findOne({_id})

    try {
        if(!hospitalDB){
            return res.status(400).json({
                ok: false,
                msg: 'Hospital no encontrado'
            })
        }
        const doctor = new Doctor({
            user: uid,
            ...req.body
        });
        const doctorDB = await doctor.save();
        return res.status(201).json({
            ok: true,
            doctor: doctorDB
        })
    } catch (err){
       return res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
    // return res.status(201).json({
    //     ok: true,
    //     msg: 'create Doctor',
       
    // })
}


const updateDoctor = (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'Update Doctor'
    })
}


const deleteDoctor = (req, res = response) => {
    return res.status(200).json({
        ok: true,
        msg: 'delete Doctor'
    })
}




module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
}