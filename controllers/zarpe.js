const con = require('../conexion/conexion')

const register = (req, res) => {
  let { 
    embarcacion_id,
    puertoZarpe,
    fechaZarpe,
    horaZarpe,
    puertoArribo,
    objetivo,
    comentario } = req.query
  
  con.query(
    `INSERT INTO zarpe(embarcacion_id, puertoZarpe, fechaZarpe, horaZarpe, puertoArribo, objetivo, comentario) VALUES('${embarcacion_id}', '${puertoZarpe}', '${fechaZarpe}', '${horaZarpe}', '${puertoArribo}', '${objetivo}', '${comentario}')`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'Se registro correctamente',code: 1, id: result.insertId});
        
    }
  )
}


const get = (req, res) => {
  let {
    zarpe_id
  } = req.query;
  con.query(
    `SELECT z.id, e.nombre nombre, e.matricula  FROM zarpe z INNER JOIN embarcacion e ON e.id = z.embarcacion_id WHERE z.id = ${zarpe_id}`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  )
}

module.exports = {
  register,
  get
}
