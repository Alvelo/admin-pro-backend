const jwt = require('jsonwebtoken');

const validarJWT = (req,res,next) => {
    //read token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        next();
    } catch (err) {
        return res.status(400).json({
            ok: false,
            msg: 'token not valid'
        })
    }

}

module.exports = {
    validarJWT
}