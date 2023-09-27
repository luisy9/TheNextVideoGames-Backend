/*
    VideoGames Routes
    /api/videoGames
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { createVideogame, getVideoGames } = require('../controllers/videoGames');

const router = Router();

router.post(
  '/newVideoGames',
  [
    check('name_videogames', 'Name is required').not().isEmpty(),
    check('img_videogame', 'Name is required').not().isEmpty(),
    check('description_videogames', 'La descripcion es requerida')
      .not()
      .isEmpty(),
    check('precio_videogames', 'El precio es requerido').not().isEmpty(),
    check('nombre_plataform', 'El nombre de la plataforma es requerido')
      .not()
      .isEmpty(),
    check('nombre_tematica', 'El nombre de la tematica es requerido')
      .not()
      .isEmpty(),
    validarCampos,
  ],
  createVideogame
);

// router.post('/newPlataform', [
//   check('name', 'Name is required').not().isEmpty(),
//   check('img', 'img is required').not().isEmpty(),
// ]);

router.post(
  '/getVideoGames',
  [
    check('nombre_plataform', 'nombre_plataform is required').not().isEmpty(),
    validarCampos,
  ],
  getVideoGames
);

module.exports = router;
