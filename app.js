const express = require('express')

const zarpe = require('./routes/zarpe');
const lance = require('./routes/lance');
const embarcacion = require('./routes/embarcacion');
const user = require('./routes/user');

const app = express()

const multer = require('multer');

const storage = multer.memoryStorage({
  destination: function(req, file, callback) {
    callback(null, '');
  }
})

const loadImageCtrl = require('./controllers/load-image');

const upload = multer({storage}).single('image');

const port = process.env.PORT || 4000

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
});



app.use('/api/user', user);
app.use('/api/embarcacion', embarcacion);
app.use('/api/zarpe', zarpe);
app.use('/api/lance', lance);
app.post('/api/load-image',upload,loadImageCtrl.load);
app.get('/api/galeria-fotos',upload,loadImageCtrl.galeriaFotos);
app.delete('/api/delete-image',upload,loadImageCtrl.deleteFotos);
app.get('/api/galeria-fotos-all',upload,loadImageCtrl.galeriaFotosAll);
app.post('/api/process-photos',loadImageCtrl.processPhotos);
app.post('/api/histogram',loadImageCtrl.reportHistogram);
app.post('/api/line-time',loadImageCtrl.reportLineTime);
app.post('/api/especies-identificadas',loadImageCtrl.reportEspeciesIndificadas);

app.listen(port, () => {
  console.log(`Api rest  en http://localhost:${port}`)
});
