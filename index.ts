import express from 'express';
import * as dotenv from "dotenv";
import Cors from "cors";

const { dbConnection } = require('./database/config');

dotenv.config();
const port = process.env.PORT;
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(Cors());
//Directorio público
app.use(express.static('public'));

//lectura y pasrseo del body
app.use(express.json())

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

//TODO: CRUD: eventos


app.listen(port, () => {
    return console.log(`servidor corriendo en :${port}`);
});

