/*  

    path: api/login

*/


const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

 router.post('/new', [
     check('nombre','El nombre es obligatorio').not().isEmpty(),
     check('apellidoPaterno','El Apellido paterno es obligatorio').not().isEmpty(),
     check('apellidoMaterno','El Apellido materno es obligatorio').not().isEmpty(),
     check('sexo','El sexo es obligatorio').not().isEmpty(),
     check('claveElector','La Clave de elector es obligatorio').not().isEmpty(),
     check('curp','la Curp  es obligatorio').not().isEmpty(),
     check('fechaNacimiento','La fecha de Nacimiento es obligatorio').not().isEmpty(),
     check('estado','El estado es obligatorio').not().isEmpty(),
     check('municipio','El municipio es obligatorio').not().isEmpty(),
     check('localidad','La localidad es obligatorio').not().isEmpty(),
     check('seccion','La secion es obligatorio').not().isEmpty(),
     validarCampos
 ],crearUsuario);

 router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
 ], login);

router.get('/renew', validarJWT, renewToken);

module.exports = router;