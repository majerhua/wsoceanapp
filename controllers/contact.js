const con = require('../conexion/conexion')

deleteContact = (req, res) => {
  let { id } = req.query

  con.query(
    `DELETE FROM contacto WHERE id = '${id}';`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'El contacto se elimino correctamente',code: 1})
    }
  )
}

registerContact = (req,res)=>{
    let {idUsuario,nombre,celular} = req.query || req.body;

    con.query(
      `SELECT *FROM contacto WHERE id_usuario = ${idUsuario}`,
      function (err, result, field) {
          if (err) return res.status(500).send({ message: err.message, code: 0 })
          if(result && result.length < 3){
            con.query(
              `INSERT INTO contacto(id_usuario,nombre,celular) VALUES('${idUsuario}','${nombre}','${celular}')`,
              function (err, result, field) {
                if (err) return res.status(500).send({ message: err.message, code: 0 })
                return res.status(200).json({message:'Se registro contacto correctamente',code: 1})
              }
            )
          }
          else return res.status(200).json({message:'No se pudo registrar el usuario',code: 0})
      }
    )
}

getContact = (req, res) => {
  let { idUsuario } = req.query

  con.query(
    `SELECT *FROM contacto WHERE id_usuario = '${idUsuario}'`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:`Lista de contactos del usuario con id: ${idUsuario}`,code: 1,contactos: result})
    }
  )
}

module.exports = {
  deleteContact,
  registerContact,
  getContact
}
