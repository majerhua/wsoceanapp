const con = require('../conexion/conexion')

const get = async (req, res) => {
  
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT *FROM embarcacion ORDER BY id DESC`,
      function (err, result, field) {

        if (err) reject(err);
        res.status(200).json(result)
        resolve(res)
      }
    )
  })
}

module.exports = {
  get
}
