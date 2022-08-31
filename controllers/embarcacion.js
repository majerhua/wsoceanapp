const con = require('../conexion/conexion')

const get = (req, res) => {
  
  con.query(
    `SELECT *FROM embarcacion ORDER BY id DESC`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  )
}

module.exports = {
  get
}
