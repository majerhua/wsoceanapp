const con = require('../conexion/conexion')

const get = (req, res) => {
  con.query(
    `SELECT z.id, CONCAT(e.nombre,'-',z.id) nombre  FROM zarpe z INNER JOIN embarcacion e ON e.id = z.embarcacion_id`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  )
}

module.exports = {
  get
}
