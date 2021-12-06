const con = require('../conexion/conexion')

anularDisciplina = (req, res) => {
  let { id } = req.query

  con.query(
    `UPDATE appgimnasio_disciplina SET Estado = 0 WHERE id = ${id};`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'La disciplina se anulo correctamente',code: 1})
    }
  )
}

registrarDisciplina = (req,res)=>{
    let {cliente,disciplina,periodo,profesor,horario} = req.query || req.body;

    con.query(
      `INSERT INTO appgimnasio_disciplina(cliente,Disciplina,Periodo,Profesor,Horario,Estado) VALUES('${cliente}','${disciplina}','${periodo}','${profesor}','${horario}',1)`,
      function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'Se registro disciplina correctamente',code: 1})
      }
    )
}

listarDisciplina = (req, res) => {

  con.query(
    `SELECT *FROM appgimnasio_disciplina WHERE Estado = 1`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:`lista de disciplinas`,code: 1,disciplinas: result})
    }
  )
}

module.exports = {
  anularDisciplina,
  registrarDisciplina,
  listarDisciplina
}
