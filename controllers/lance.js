const con = require('../conexion/conexion')

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
  
  return new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO lance(numeroLance, fechaLance, horaLance, latitud, longitud, rumbo, zarpe_id) VALUES('${numeroLance}', '${fechaLance}', '${horaLance}', '${latitud}', '${longitud}', '${rumbo}', ${zarpe_id})`,
      function (err, result, field) {
          if (err) {
            res.status(500).send({ message: err.message, code: 0 })
            reject(err)
          } else {
            res.status(200).json({message:'Se registro correctamente',code: 1})
            resolve(res)
          }
      }
    )
  })
}

module.exports = {
  register
}
