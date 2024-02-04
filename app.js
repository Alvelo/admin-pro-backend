const express = require('express');
var cors = require('cors')
const {dbConnection} = require('./database/config');
require('dotenv').config();

const app = express();
//Configurar cors
app.use(cors());

//Base de datos
dbConnection();

//Rutas
app.get( '/', (req,res) => {
    res.status(202).json({
        ok: true,
        msg: 'Hola Mundo'
    })
});

app.listen(3000, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});