/*
rutas de Usuarios / Auth
host + /api/auth
*/
import { Router } from 'express';
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos'
import { crearUsuario, loginUsuario, revalidarToken } from '../controllers/auth'
import { validarJWT } from '../middlewares/validar-jwt'


const router = Router();

router.post('/new', [
    check('name', 'El nombre es obliogatorio').not().isEmpty(),
    check('email', 'El password es obliogatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
], validarCampos, crearUsuario);

router.post('/', [
    check('email', 'El password es obliogatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
], validarCampos, loginUsuario);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router;