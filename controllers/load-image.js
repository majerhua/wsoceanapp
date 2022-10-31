
const AWS = require('aws-sdk');
const con = require('../conexion/conexion');
const uid =  require('uid');
const imageToBase64 = require('image-to-base64');
const axios = require('axios')


const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});


const load = async (req, res) => {

  const { file} = req
  const {lance_id} = req.body
  const {user_id} = req.body

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
      `INSERT INTO lance_imagen(lance_id, url, user_id) VALUES(${lance_id}, '${url}', ${user_id})`,
      function (err, result, field) {
        if (err) reject({ message: err.message, code: 0 })
        const id = result.insertId;
      con.query(
        `SELECT * FROM lance_imagen WHERE id = ${id}`,
          function (err, result, field) {
         if (err) reject({ message: err.message, code: 0 })
          resolve({message:'Se registro correctamente',code: 1,data: result[0]})
        })
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


const galeriaFotosAll = (req,res)=> {
  const {user_id} = req.query;
  con.query(
    `SELECT * FROM lance_imagen WHERE user_id = ${user_id} ORDER BY id DESC`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json(result)
    }
  )
}

const deleteFotos = (req,res)=> {
  const {id} = req.query
  con.query(
    `DELETE FROM lance_imagen WHERE id = ${id}`,
    function (err, result, field) {
      if (err) return res.status(500).send({ message: err.message, code: 0 })
      return res.status(200).json({message:'Se elimino correctamente',code: 1})
    }
  )
}

const processPhotos = async(req,res) => {
  const {ids} = req.query
  const arrId = ids.split(',');

  try{

    const arr = [];

    for(let i=0; i<arrId.length; i++) { 
      let obj =await queryProcessPhoto(arrId[i]);
      arr.push(obj);
      console.log(obj);
    }

    let arrNumLance = new Set();

    for(let i=0; i<arr.length; i++) { 
      arrNumLance.add(arr[i].numeroLance);
    }

    const arrResponse = [];

    for(numLance of arrNumLance.values()) {
      let arrEspecies = arr.filter(element => element.numeroLance === numLance);
      let pelicanos = 0;
      let lobosMarinos = 0;
      
      for(let i = 0; i < arrEspecies.length; i++) {
        pelicanos += arrEspecies[i].pelicanos;
        lobosMarinos += arrEspecies[i].loboMarinos;
      }

      arrResponse.push({
        numeroLance: numLance,
        cantidadFotos: arrEspecies.length,
        pelicanos,
        lobosMarinos
      })
    }

    return res.status(200).json(arrResponse);
  }catch(ex){
    console.log(ex);
    return res.status(200).json({
      loboMarinos: 0,
      pelicanos: 0
    });
  }
}

const queryProcessPhoto = (id) => {
  return new Promise((resolve, reject) => {
    let numeroLance = 0;
    con.query(
      `SELECT l.numeroLance, li.url FROM lance_imagen li
      INNER JOIN lance l ON l.id = li.lance_id
      WHERE li.id = ${id}`,
      function (err, result, field) {
        if (err) return res.status(500).send({ message: err.message, code: 0 })
        const imageUrl = result[0].url
        numeroLance = parseInt(result[0].numeroLance)
        imageToBase64(imageUrl)
        .then(
            (response) => {
              const imgBase64 = `data:image/jpeg;base64,${response}`;
              axios.post('https://hf.space/embed/hexenbiest/OceanApp/+/api/predict', {
                data: [
                  "640",
                  0.5,
                  0.5,
                  imgBase64
                ]
              })
              .then(function (response) {
                const data = response.data.data[1].data;
  
                if(data.length > 1) {
                  const lobosMarinos = data[0];
                  const pelicanos = data[1];
                  resolve({
                    loboMarinos: lobosMarinos[0] ? parseInt(lobosMarinos[0]) : 0,
                    pelicanos: pelicanos[0] ? parseInt(pelicanos[0]) : 0,
                    numeroLance 
                  });
                }else {
                  resolve({
                    loboMarinos: 0,
                    pelicanos: 0,
                    numeroLance
                  });
                }
              })
              .catch(function (error) {
                resolve({
                    loboMarinos: 0,
                    pelicanos: 0,
                    numeroLance
                });
              });
            }
        )
        .catch(
            (error) => {
              resolve({
                loboMarinos: 0,
                pelicanos: 0,
                numeroLance
            });
            }
        )
      }
    );
  });
}

module.exports = {
  load,
  galeriaFotos,
  deleteFotos,
  galeriaFotosAll,
  processPhotos
}
