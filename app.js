const express = require('express');
const { dbConection } = require('./db/conection');
const cors = require('cors');
require('dotenv').config();

const app = express();

dbConection();

app.use(cors())

app.use( express.static('public') );

app.use( express.json() );

app.use('/api/auth', require('./routes/auth') );
app.use('/api/trans', require('./routes/trans') );

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});