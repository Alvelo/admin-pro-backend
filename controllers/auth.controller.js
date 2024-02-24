const {response} = require('express');
const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt.helpers');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const {email, password} = req.body;
    try {
        //verify email
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'email not valid'
            })
        }

        //verify password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'password no valid'
            })
        }

        // generate JWT - token
        const token = await generateJWT(usuarioDB.id)
        
        return res.status(200).json({
            ok: true,
            token
        })
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Habla con el administrador'
        })
    }
};

const authGoogleLogin = async(req, res = response) => {

    try {
        const {email, name, picture} = await googleVerify(req.body.token);
        res.status(200).json({
            ok: true,
            email, name, picture
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            ok: false,
            msg: 'Token de google no autorizado.'
        })
    }

    res.status(200).json({
        ok: true,
        msg: req.body.token
    })
}

module.exports = {
    login,
    authGoogleLogin
}