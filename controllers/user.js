const con = require('../conexion/conexion')

const validateUser = (req, res) => {
  let { username, password } = req.query
  username = username.toLowerCase()
  password = password.toLowerCase()
  
  con.query(
    `SELECT *FROM appgimnasio_cliente WHERE username = '${username}' AND password = '${password}'`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        if(result && result.length > 0) return res.status(200).json({message:'El usuario existe',code: 1,nombre: result[0].NombreCompleto,idUsuario:result[0].id})
        return res.status(200).json({message:'El usuario no existe',code: 0})
    }
  )
}

const registerFile = (req,res)=>{

  let { idUsuario } = req.body

  console.log("ID =>",idUsuario)

  let url = `https://wsappgimnasio.herokuapp.com/public/${req.file.filename}`
  con.query(
    `UPDATE  appgimnasio_cliente SET url = '${url}' WHERE id = ${idUsuario}`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'Se actualizo imagen correctamente',code: 1})
    }
  )
}

module.exports = {
  validateUser,
  registerFile
}
