import { Request, Response, NextFunction } from "express";
import * as jwt from 'jsonwebtoken'
import * as dotenv from "dotenv";
dotenv.config();

export const validarJWT = (req: any, res: Response, next: NextFunction) => {

    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({ ok: false, msg: 'No hay token en la petición' })
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEED ?? '') as jwt.JwtPayload;

        req.uid = uid;
        req.name = name;

    } catch (error) {
        console.log(error);
        return res.status(401).json({ ok: false, msg: 'Token no válido' })
    }

    next();
}
