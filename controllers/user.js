const con = require('../conexion/conexion')

const validateUser = (req, res) => {
  let { username, password } = req.query
  username = username.toLowerCase()
  password = password.toLowerCase()
  
  return new Promise((resolve, reject) =>{
    con.query(
      `SELECT *FROM user WHERE username = '${username}' AND password = '${password}'`,
      function (err, result, field) {
          if (err) reject(err);
          if(result && result.length > 0){
            res.status(200).json({message:'El usuario existe',code: 1, rol: result[0].rol, username: result[0].username})
            resolve(res);
          }else {
            res.status(200).json({message:'El usuario no existe',code: 0}) 
            resolve(res)
          }
      }
    )
  })
}

const get = (req, res) => {
  
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT *from user`,
      function (err, result, field) {
        if (err) {
          res.status(500).send({ message: err.message, code: 0 });
          reject(err);
        } else {
          res.status(200).json(result);
          resolve(res)
        }
      }
    );
  })
}

const register = (req, res) => {

  let { username,
        dni,
        nombre,
        apellidos,
        password,
        rol} = req.body


  return new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO user(username,dni,nombre,apellidos,password,rol) VALUES('${username}','${dni}','${nombre}','${apellidos}','${password}','${rol}')`,
      function (err, result, field) {
        if (err){
          res.status(500).send({ message: err.message, code: 0 })
          reject(res);
        } else {
          res.status(200).json({message:'Se registro correctamente',code: 1})
          resolve(res);
        } 
      }
    );
  })
}


module.exports = {
  validateUser,
  get,
  register
}
