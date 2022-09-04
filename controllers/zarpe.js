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
  
  return new Promise(function (resolve, reject) {
    con.query(
      `INSERT INTO zarpe(embarcacion_id, puertoZarpe, fechaZarpe, horaZarpe, puertoArribo, objetivo, comentario) VALUES('${embarcacion_id}', '${puertoZarpe}', '${fechaZarpe}', '${horaZarpe}', '${puertoArribo}', '${objetivo}', '${comentario}')`,
      function (err, result, field) {
          if (err) {
            res.status(500).send({ message: err.message, code: 0 });
            reject(res);
          } else {
            res.status(200).json({message:'Se registro correctamente',code: 1, id: result.insertId});
            resolve(res);
          }        
      }
    )
  })
}


const get = (req, res) => {
  let {
    zarpe_id
  } = req.query;

  return new Promise((resolve, reject) => {
    con.query(
      `SELECT z.id, e.nombre nombre, e.matricula  FROM zarpe z INNER JOIN embarcacion e ON e.id = z.embarcacion_id WHERE z.id = ${zarpe_id}`,
      function (err, result, field) {
        if (err) {
          res.status(500).send({ message: err.message, code: 0 })
          reject(res);
        } else {
          res.status(200).json(result)
          resolve(res);
        } 
      }
    )
  })
}

module.exports = {
  register,
  get
}
