const express = require('express');
var cors = require('cors')
const {dbConnection} = require('./database/config');
require('dotenv').config();

const app = express();
//Configurar cors
app.use(cors());

app.use(express.json() );

//Base de datos
dbConnection();

//Rutas
app.use('/api/users', require('./routes/users.route'));




app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});