import { sign } from 'jsonwebtoken'
import * as dotenv from "dotenv";


dotenv.config();
const SECRET_JWT_SEED = process.env.SECRET_JWT_SEED ?? '';

const generarJWT = (uid: string, name: string) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        sign(payload, SECRET_JWT_SEED, { expiresIn: '2h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('no se pudo generar el token')
            }
            resolve(token);
        })
    })
}

export default  generarJWT;
