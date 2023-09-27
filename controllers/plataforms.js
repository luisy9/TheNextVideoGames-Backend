const mysql = require('mysql2');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { connection } = require('../database/conection');

const newPlataform = (req, res = response) => {
  const { nombre_plataform, img_plataform } = req.body;

  const newPlataform = {
    nombre_plataform: nombre_plataform,
    img_plataform: img_plataform,
  };

  try {
    connection.query(
      'INSERT INTO plataforms SET ?',
      newPlataform,
      async (error, results) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            ok: false,
            msg: 'Error al crear la plataforma!',
          });
        }

        if (results.affectedRows > 0) {
          return res.status(201).json({
            ok: true,
            nombre_plataform: nombre_plataform,
            img_plataform: img_plataform,
            msg: 'Plataforma creada correctamente',
          });
          console.log(true)
        }
      }
    );
  } catch (err) {
    return res.status(400).json({
        ok: false,
        msg: 'Hubo un error en la consulta!'
    })
  }
};



module.exports = { newPlataform };
