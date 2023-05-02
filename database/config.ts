import { connect } from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
    try {
        const DB_CNN: string = process.env.DB_CNN ?? '';
        connect(DB_CNN);
        console.log("Base de datos en linea");


    } catch (error) {
        console.log(error);
        throw new Error("Error al inicializar la bd");
    }
}

module.exports = { dbConnection };