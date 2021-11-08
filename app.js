const express = require('express');
const { dbConection } = require('./db/conection');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Llama a la conexcion de la base de datos
dbConection();

app.use(cors())

//Pal html
app.use( express.static('public') );

//Pal json
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/empleados', require('./routes/empleados'));
app.use('/api/estado', require('./routes/estado'));

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});