const { response } = require('express');
const { connection } = require('../database/conection');

const createVideogame = (req, res = response) => {
  const {
    name_videogames,
    img_videogame,
    description_videogames,
    precio_videogames,
    nombre_plataform,
    nombre_tematica,
  } = req.body;

  const newVideoGames = {
    name_videogames: name_videogames,
    description_videogames: description_videogames,
    img_videogame: img_videogame,
    precio_videogames: precio_videogames,
    nombre_plataform: nombre_plataform,
    nombre_tematica: nombre_tematica,
  };

  try {
    connection.query(
      `INSERT INTO videogames SET ?`,
      [newVideoGames],
      async (error, result) => {
        console.log(error)
        if (error) {
          return res.status(400).json({
            ok: false,
            msg: 'No se ha podido insertar',
          });
        }

        if (result.affectedRows > 0) {
          return res.status(201).json({
            name_videogames: name_videogames,
            description_videogames: description_videogames,
            precio_videogames: precio_videogames,
            nombre_plataform: nombre_plataform,
            nombre_tematica: nombre_tematica,
            msg: 'VideoGame creado correctamente',
          });
        }
      }
    );
  } catch (error) {
    console.log(err);
    return res.status(400).json({
      message: 'Error con el insert el videogame',
    });
  }
};

const getVideoGames = async (req, res = response) => {
  const { nombre_plataform } = req.body;
  console.log(nombre_plataform);

  try{
    connection.query('SELECT * FROM videogames WHERE nombre_plataform = ?',[nombre_plataform], 
    async (error, results) => {
      if(error){
        return res.status(500).json({
          ok: false,
          msg:'Hubo un error al obtener los videojuegos'
        })
      }
      
      if(results.length > 0){
        return res.status(200).json({
          ok: true,
          result: results
        })  
      }
    })
  }catch (err) {
    console.log(err);
    return res.status(500).json({
      ok: false,
      msg: err.message
    })  
  }

}

module.exports = { createVideogame, getVideoGames };
