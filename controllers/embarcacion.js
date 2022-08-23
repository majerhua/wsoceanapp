const con = require('../conexion/conexion')

const register = (req, res) => {
  let { 
    embarcacion,
    matricula,
    puertoZarpe,
    fechaZarpe,
    horaZarpe,
    puertoArribo,
    objetivo,
    comentario } = req.query
  
  con.query(
    `INSERT INTO embarcacion(embarcacion, matricula, puertoZarpe, fechaZarpe, horaZarpe, puertoArribo, objetivo, comentario) VALUES('${embarcacion}', '${matricula}', '${puertoZarpe}', '${fechaZarpe}', '${horaZarpe}', '${puertoArribo}', '${objetivo}', '${comentario}')`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'Se registro correctamente',code: 1})
    }
  )
}

module.exports = {
  register
}
