const mysql = require('mysql2')
const { response } = require('express')
const bcrypt = require('bcryptjs')
const { generarJWT } = require('../helpers/jwt')
const { connection } = require('../database/conection')

// Create user MYSQL
const createUser = async (req, res = response) => {
  const { name, email, password } = req.body

  const newUser = {
    name,
    email,
    password
  }

  try {
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, results) => {
        if (results.length > 0) {
          return res.status(400).json({
            ok: false,
            msg: 'Ya existe un usuario con ese email!'
          })
        } else {
          const salt = bcrypt.genSaltSync()
          newUser.password = bcrypt.hashSync(password, salt)

          connection.query(
            'INSERT INTO users SET ?',
            newUser,
            async (error, results) => {
              if (error) {
                return res.status(400).json({
                  ok: false,
                  msg: 'Error al crear el usuario!'
                })
              }

              connection.query(
                'SELECT * FROM users WHERE email = ?',
                [email],
                async (error, results) => {
                  if (results.length > 0) {
                    const idusers = {
                      idusers: results[0].idusers
                    }
                    const token = await generarJWT(idusers.idusers, newUser.name)
                    return res.status(201).json({
                      ok: true,
                      name,
                      email,
                      password,
                      token,
                      iduser: idusers.idusers,
                      msg: 'Usuario creado correctamente'
                    })
                  }
                }
              )
            }
          )
        }
      }
    )
  } catch (err) {
    console.log(err)
    return res.status(400).json({
      message: 'Error con la busqueda de el usuario'
    })
  }
}

const getUsers = async (req, res = response) => {
  const { email } = req.body
  try {
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      (error, result) => {
        if (error) {
          console.log(error)
        }
        if (result.length > 0) {
          res.status(201).json({
            ok: true,
            idusers: result[0].idusers,
            msg: 'Usuario encontrado'
          })
        }
      }
    )
  } catch (err) {
    console.log(err)
    res.status(401).json({
      ok: false,
      msg: 'fallo en el buscar el usuario'
    })
  }
}

const loginUsuario = async (req, res = response) => {
  const { email, password } = req.body

  try {
    connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (error, result) => {
        if (error) {
          return res.status(400).json({
            ok: false,
            msg: 'El usuario no existe con ese email'
          })
        }
        if (result.length > 0) {
          const validPassword = bcrypt.compareSync(
            password,
            result[0].password
          )
          if (!validPassword) {
            return res.status(400).json({
              ok: false,
              msg: 'Password incorrecto'
            })
          }

          // Generar JWT
          const token = await generarJWT(result[0].idusers, result[0].name)
          return res.status(201).json({
            ok: true,
            uid: result[0].idusers,
            name: result[0].name,
            password,
            token
          })
        }
      }
    )
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    })
  }
}

const revalidarToken = async (req, res = response) => {
  const { idusers, name } = req
  // Generar JWT
  const token = await generarJWT(idusers, name)

  return res.json({
    ok: true,
    name,
    idusers,
    token
  })
}

module.exports = {
  createUser,
  loginUsuario,
  revalidarToken,
  getUsers
}
