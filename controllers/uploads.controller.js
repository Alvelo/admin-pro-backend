const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/update-image.helpers");
const path = require('path');
const fs = require('fs');




const fileUpload = (req, res = response) => {
    
    const type = req.params.type;
    const id = req.params.id;
    const validTypes = ['hospitals','doctors', 'users'];

    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok: false,
            msg: 'choose a valid type: doctors,users,hospitals'
        })
    }

    if(!req.files || Object.keys(req.files).length ===0){
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningun archivo'
        });
    }

    //Img process//
    const file = req.files.image;
    const typeFile = file.name.split('.');
    const extFile = typeFile[typeFile.length -1];
   
    //Validate type of the file uploaded
    const validExtenstion = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtenstion.includes(extFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension no permitida.'
        });
    }
    //Generate unique id for the file uploaded
    const newNameForFile = `${uuidv4()}.${extFile}`;

    //Path for the img
    const path = `./uploads/${type}/${newNameForFile}`;

    //Move img
    file.mv(path, (err) => {
        if(err) {
            console.log(err);
          return res.status(500).json({
            ok: false,
            msg: 'Error al mover image'
          });

        }

        //update database
        updateImage(type, id, path, newNameForFile);

        return res.status(200).json({
            ok: true,
            msg: 'file uploaded',
            newNameForFile
        });
    })

    

}

const getImg = (req, res = response) => {
    const type = req.params.type;
    const img = req.params.img;

    const pathImg = path.join(__dirname, `../uploads/${type}/${img}`);
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }

   
}

module.exports = {
    fileUpload,
    getImg
}