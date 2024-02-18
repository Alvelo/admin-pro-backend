const Usuario = require('../models/usuario.model');
const Hospital = require('../models/hospital.model');
const Doctor = require("../models/doctor.model");
const fs = require('fs');


const deleteImage = (path) => {
   
    if(fs.existsSync(path)) {
        //delete old img.
        fs.unlinkSync(path);
    }
}


const updateImage = async(type, id, path, newNameForFile) => {
    let oldPath = ``;
 switch(type) {
    case 'doctors':
        const doctor = await Doctor.findById(id);
        if(!doctor){
            
            return false;
        }
         oldPath = `./uploads/doctors/${doctor.img}`
        deleteImage(oldPath);

        doctor.img = newNameForFile;
        await doctor.save();
        return true;
        
    case 'hospitals':
        
        const hospital = await Hospital.findById(id);
        if(!hospital){
            
            return false;
        }
        oldPath = `./uploads/hospitals/${hospital.img}`
        deleteImage(oldPath);

        hospital.img = newNameForFile;
        await hospital.save();
        return true;
        break;
    case 'users':
        const user = await Usuario.findById(id);
        if(!user){
            
            return false;
        }
        oldPath = `./uploads/users/${user.img}`
        deleteImage(oldPath);

        user.img = newNameForFile;
        await user.save();
        return true;

        break;
    default: 
        return false

 }
}

module.exports = {
    updateImage
}