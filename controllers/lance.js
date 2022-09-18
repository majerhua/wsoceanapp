const con = require('../conexion/conexion');
const uid =  require('uid');

const register = (req, res) => {
  let { 
    numeroLance,
    fechaLance,
    horaLance,
    latitud,
    longitud,
    rumbo,
    zarpe_id
   } = req.query
  con.query(
    `INSERT INTO lance(numeroLance, fechaLance, horaLance, latitud, longitud, rumbo, zarpe_id, cala_id) VALUES('${numeroLance}', '${fechaLance}', '${horaLance}', '${latitud}', '${longitud}', '${rumbo}', ${zarpe_id}, '${uid.uid(8)}')`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'Se registro correctamente',code: 1, id: result.insertId})
    }
  )
}

const getByZarpeId = (req, res) => {
  
  const {zarpe_id} = req.query;

  con.query(
    `SELECT *FROM lance WHERE = zarpe_id=${zarpe_id}`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  )
} 

module.exports = {
  register,
  getByZarpeId
}
