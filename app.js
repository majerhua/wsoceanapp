const express = require('express')
const app = express()
const port = process.env.PORT || 4000

app.use(express.json({ limit: '20mb' }))
app.use(express.urlencoded({ extended: false, limit: '20mb' }))

const userCtrl = require('./controllers/user')
const contactCtrl = require('./controllers/contact')

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
app.post('/api/usuario/register', userCtrl.registerUser);

app.post('/api/contact/delete', userCtrl.deleteContact);
app.post('/api/contact/register', userCtrl.registerContact);


app.listen(port, () => {
  console.log(`Api rest corriendo en http://localhost:${port}`)
})
