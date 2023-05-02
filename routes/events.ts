//Todas tienn que pasar por la validación del JWT


import { Router } from 'express';
import { check } from 'express-validator'
import { validarCampos } from '../middlewares/validar-campos'
import { getEventos, crearEventos, actualizarEvento, eliminarEventos } from '../controllers/events'
import { validarJWT } from '../middlewares/validar-jwt'
import { isDate } from '../helpers/isDate';


const Events = Router();
//Todos tienen que pasar por la validacion del JWT
//Para validar de forma global 
Events.use(validarJWT);

//Obtener Eventos
Events.get('/', getEventos);

//Crear nuevo evento
Events.post('/', [
    check("title", "El titulo es obligatorio").not().isEmpty(),
    check("start", "La fecha de inicio es obligatoria").custom(isDate),
    check("end", "La fecha de fin es obligatoria").custom(isDate),
    validarCampos
], crearEventos);

//Actualizar evento
Events.put('/:id', actualizarEvento);

//Eliminar evento
Events.delete('/:id', eliminarEventos);

module.exports = Events;