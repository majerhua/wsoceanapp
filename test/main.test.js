const httpMocks = require('node-mocks-http');
const embarcacionCtrl = require('../controllers/embarcacion');
const userCtrl = require('../controllers/user');
const zarpeCtrl = require('../controllers/zarpe');
const lanceCtrl = require('../controllers/lance');



test('Validar el listado de embarcaciones', async () => {
  const response = httpMocks.createResponse();
  const result = await embarcacionCtrl.get({},response);
  const data = result._getJSONData()
  expect(data.length > -1).toBeTruthy();
});

test('Validar si un usuario se ha registrado correctamente', async () => {

  const response = httpMocks.createResponse();
  const request  = httpMocks.createRequest({
    query: {
      username: 'carlos',
      password: '123'
    }
  });

  const result = await userCtrl.validateUser(request,response);
  const data = result._getJSONData()
  expect(data.code).toBe(1);
});

test('Validar el registro de usuarios', async () => {

  const response = httpMocks.createResponse();
  const request  = httpMocks.createRequest({
    body: {
      username: 'carlos',
      dni: '75723309',
      nombre: 'carlos javier',
      apellidos: 'majerhua nuñez',
      password: '123',
      rol: 'ADMINISTRADOR'
    }
  });

  const result = await userCtrl.register(request,response);
  const data = result._getJSONData()
  expect(data.code).toBe(1);
});

test('Validar el listado de usuarios', async () => {

  const response = httpMocks.createResponse();

  const result = await userCtrl.get({},response);
  const data = result._getJSONData()
  expect(data.length > -1).toBeTruthy();
});


test('Validar el registro del zarpe', async () => {

  const response = httpMocks.createResponse();
  const request  = httpMocks.createRequest({
    query: {
      embarcacion_id: 1,
      puertoZarpe: 'CALLAO',
      fechaZarpe: '2020-10-11',
      horaZarpe: '10:10',
      puertoArribo: 'CALLAO',
      objetivo: 'JUREL/CABALLA',
      comentario: 'TEST'
    }
  });

  const result = await zarpeCtrl.register(request,response);
  const data = result._getJSONData()
  expect(data.code).toBe(1);
});

test('Validar la busqueda de un zarpe por id', async () => {

  const response = httpMocks.createResponse();
  const request  = httpMocks.createRequest({
    query: {
      zarpe_id: 1
    }
  });

  const result = await zarpeCtrl.get(request,response);
  const data = result._getJSONData()
  expect(data.length > 0).toBeTruthy();
});

test('Validar el registro del lance', async () => {

  const response = httpMocks.createResponse();
  const request  = httpMocks.createRequest({
    query: {
      numeroLance: 1,
      fechaLance: '2020-10-10',
      horaLance: '10:10',
      latitud: '100.10',
      longitud: '101.20',
      rumbo: 'rumbo test',
      zarpe_id: 1
    }
  });

  const result = await lanceCtrl.register(request,response);
  const data = result._getJSONData()
  expect(data.code).toBe(1);
});
