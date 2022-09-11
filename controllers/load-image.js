
const AWS = require('aws-sdk');
const con = require('../conexion/conexion');
const uid =  require('uid');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});


const load = async (req, res) => {

  const { file} = req
  const {lance_id} = req.body

  const typeImage = file.originalname.split('.')[1];

  const resS3 = await s3.upload({
  Body: file.buffer,
  Bucket: "oceanapp",
  Key: `${uid.uid(8)}.${typeImage}`,
  ContentType: file.mimetype
  })
  .promise();

  const url = resS3.Location;

  const response = await new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO lance_imagen(lance_id, url) VALUES(${lance_id}, '${url}')`,
      function (err, result, field) {
        if (err) reject(err)
        resolve({message:'Se registro correctamente',code: 1})
      });

  })
   return res.status(200).json(response)
}

const galeriaFotos = (req,res)=> {
  const {lance_id} = req.query
  con.query(
    `SELECT * FROM lance_imagen WHERE lance_id = ${lance_id} ORDER BY id DESC`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  )
}



module.exports = {
  load,
  galeriaFotos
}
