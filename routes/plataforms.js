/*
     Rutas de Usuarios / plataforms
     host + /api/plataforms
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar-campos')
const { newPlataform } = require('../controllers/plataforms')

const router = Router()

router.post('/new', [
  check('nombre_plataform', 'El nombre es obligatorio').not().notEmpty(),
  check('img_plataform', 'La img es obligatoria').not().isEmpty(),
  validarCampos
], newPlataform)

module.exports = router
