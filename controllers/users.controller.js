const Usuario = require('../models/usuario.model');
const {response} = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helpers');



/**
 * Get users
 */

const getUsers = async(req, res) => {
    const users = await Usuario.find({}, 'name, email role');

   return res.status(200).json({
        ok: true,
        users,
    })
};
/**
 * Create user
 */
const postUser = async (req, res = response) => {

    const {email, password, name} = req.body;
 

    try {

        const existEmail = await Usuario.findOne({email});
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Email ya existe'
            })
        }
        const usuario = new Usuario(req.body);
        // crypt password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const usuarioDB = await Usuario.findOne({email});
        // generate JWT - token
        const token = await generateJWT(usuarioDB.id)
   
   
       return res.status(201).json({
           ok: true,
           usuario, 
           token
       })
    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }


};

/**
 * UPDATE
 */
const updateUser = async(req, res = response) => {
    //TODO: Validar token y comprobar si es el usuario correcto
    
    const uid = req.params.id;


    
    try {
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'user not exist on database',
            }) 
        }
        //Update
        const {password, google, email,  ...campos} = req.body;

        if (usuarioDB.email !== email) {
            const existEmail = await Usuario.findOne({email: req.body.email});
            if(existEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'A user already has the email!'
                })
            }
        }

        campos.email = email;
        const userUpdated = await Usuario.findByIdAndUpdate(uid, campos, {new: true});

        res.status(202).json({
            ok: true,
            usuario: userUpdated 
        })
    } catch (err){
        console.log(err);
       return res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        })
    }
};

// const delete user
const deleteUser = async(req, res = response) => {
    const uid = req.params.id;

    const usuarioDB = await Usuario.findById(uid);

    if(!usuarioDB) {
        return res.status(404).json({
            ok: false,
            msg: 'user not exist on database',
        }) 
    }
    await Usuario.findByIdAndDelete(uid);

    try {
       
        return res.status(200).json({
            ok: true,
            msg: 'User deleted',
            
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'revisar logs'
        });
    }

  
};





module.exports = {getUsers, postUser, updateUser, deleteUser}