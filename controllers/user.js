const con = require('../conexion/conexion')

validateUser = (req, res) => {
  let { username, password } = req.query
  username = username.toLowerCase()
  password = password.toLowerCase()
  
  con.query(
    `SELECT *FROM appgimnasio_cliente WHERE username = '${username}' AND password = '${password}'`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        if(result && result.length > 0) return res.status(200).json({message:'El usuario existe',code: 1,nombre: result[0].NombreCompleto})
        return res.status(200).json({message:'El usuario no existe',code: 0})
    }
  )
}


module.exports = {
  validateUser
}
