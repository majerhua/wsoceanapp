const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

const userCtrl = require('./controllers/user')
const reservaCtrl = require('./controllers/reserva')
const disciplinaCtrl = require('./controllers/disciplina')
const upload = require('./libs/storage')
app.use('/public', express.static(`${__dirname}/storage/imgs`))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})



app.post('/api/usuario/login', userCtrl.validateUser);

app.post('/api/reserva/anular', reservaCtrl.anularReserva);
app.post('/api/reserva/registrar', reservaCtrl.registrarReserva);
app.get('/api/reserva/listar', reservaCtrl.listarReserva);

app.post('/api/disciplina/anular', disciplinaCtrl.anularDisciplina);
app.post('/api/disciplina/registrar', disciplinaCtrl.registrarDisciplina);
app.get('/api/disciplina/listar', disciplinaCtrl.listarDisciplina);

app.post('/api/imagen/registrar',
  upload.single('image'),
  userCtrl.registerFile
)

app.listen(port, () => {
  console.log(`Api rest  en http://localhost:${port}`)
})
