const con = require('../conexion/conexion')

anularReserva = (req, res) => {
  let { id } = req.query

  con.query(
    `UPDATE appgimnasio_reserva SET Estado = 0 WHERE id = ${id};`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'La reserva se anulo correctamente',code: 1})
    }
  )
}

registrarReserva = (req,res)=>{
    let {cliente,servicio,fecha,turno,hora} = req.query || req.body;

    con.query(
      `INSERT INTO appgimnasio_reserva(cliente,servicio,fecha,turno,hora,estado) VALUES('${cliente}','${servicio}','${fecha}','${turno}','${hora}',1)`,
      function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:'Se registro reserva correctamente',code: 1})
      }
    )
}

listarReserva = (req, res) => {

  con.query(
    `SELECT *FROM appgimnasio_reserva WHERE Estado = 1`,
    function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        return res.status(200).json({message:`lista de reservas`,code: 1,reservas: result})
    }
  )
}

module.exports = {
  anularReserva,
  registrarReserva,
  listarReserva
}
