var mysql = require('mysql')
var connection = mysql.createConnection({
  host: 'gimnasio.ck8e6pwiosjz.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'Peru20212021',
  database: 'dbgimnasio',
})

module.exports = connection
