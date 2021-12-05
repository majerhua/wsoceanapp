const con = require('../conexion/conexion')

validateUser = (req, res) => {
  let { dni, password } = req.query

  con.query(
    `SELECT *FROM usuario WHERE dni = '${dni}' AND password = '${password}'`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        if(result && result.length > 0) return res.status(200).json({message:'El usuario existe',code: 1})
        return res.status(200).json({message:'El usuario no existe',code: 0})
    }
  )
}

registerUser = (req,res)=>{
    let {nombres,apellidos,dni,celular,correo,direccion,fechaNacimiento,password} = req.query || req.body;
    con.query(
        `INSERT INTO usuario(nombres,apellidos,dni,celular,correo,direccion,fecha_nacimiento,password) VALUES('${nombres}','${apellidos}','${dni}','${celular}','${correo}','${direccion}','${fechaNacimiento}','${password}')`,
        function (err, result, field) {
          if (err) return res.status(500).send({ message: err.message, code: 0 })
          res.status(200).json({message:'Se registro correctamente',code: 1})
        }
      )
}

module.exports = {
  validateUser,
  registerUser
}
