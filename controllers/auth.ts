import { Request, Response } from 'express';
import * as bcrypt from 'bcryptjs';
import Usuario from '../models/Usuario';
import generarJWT from '../helpers/jwt'

export const crearUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {


        let usuario = await Usuario.findOne({ email });
        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario existe con ese correo'
            });
        }
        usuario = new Usuario(req.body);
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

export const loginUsuario = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        let usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }
        const validaPassword = bcrypt.compareSync(password, usuario.password);
        if (!validaPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña Incorrecta'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id, usuario.name);
        res.status(200).json({ ok: true, uid: usuario.id, name: usuario.name, token })

    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

export const revalidarToken = async (req: any, res: Response) => {
    const { uid, name } = req;
    //Generar JWT
    const token = await generarJWT(uid, name);

    res.json({ ok: true, uid: uid, name, token })
}

