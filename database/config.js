const mysql = require('mysql2/promise')
const { connection } = require('./conection')

const dbConnection = async () => {
  try {
    const dbConnect = await connection
    console.log('DB Online')
    return connection
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de inicializar BD')
  }
}

module.exports = {
  dbConnection
}
