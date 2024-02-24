const express = require('express');
var cors = require('cors')
const {dbConnection} = require('./database/config');
require('dotenv').config();

const app = express();
//Configurar cors
app.use(cors());
//Fpublic folder
app.use(express.static('public'));

app.use(express.json() );

//Base de datos
dbConnection();

//Rutas
app.use('/api/users', require('./routes/users.route'));
app.use('/api/hospitals', require('./routes/hospitals.route'));
app.use('/api/doctors',require('./routes/doctors.route'));
app.use('/api/login', require('./routes/auth.route'));
app.use('/api/todo', require('./routes/search.route'));
app.use('/api/upload', require('./routes/uploads.route'))





app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});