const httpMocks = require('node-mocks-http');
const embarcacionCtrl = require('../controllers/embarcacion');

const response = httpMocks.createResponse();

test('Validate the vessel query', async () => {
  const result = await embarcacionCtrl.get({},response);
  const data = result._getJSONData()
  expect(data.length > -1).toBeTruthy();
});