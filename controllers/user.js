const con = require('../conexion/conexion')

const validateUser = (req, res) => {
  let { username, password } = req.query
  username = username.toLowerCase()
  password = password.toLowerCase()
  
  con.query(
    `SELECT *FROM user WHERE username = '${username}' AND password = '${password}'`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        if(result && result.length > 0) return res.status(200).json({message:'El usuario existe',code: 1, rol: result[0].rol, username: result[0].username})
        return res.status(200).json({message:'El usuario no existe',code: 0})
    }
  )
}

const get = (req, res) => {
  
  con.query(
    `SELECT *from user`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  );
}

const register = (req, res) => {

  let { username,
        dni,
        nombre,
        apellidos,
        password,
        rol} = req.body

  con.query(
    `INSERT INTO user(username,dni,nombre,apellidos,password,rol) VALUES('${username}','${dni}','${nombre}','${apellidos}','${password}','${rol}')`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json({message:'Se registro correctamente',code: 1})
    }
  );
}


module.exports = {
  validateUser,
  get,
  register
}
