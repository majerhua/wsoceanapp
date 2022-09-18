const express = require('express')
const lanceCtrl = require('../controllers/lance');

const router = express.Router();

router.post('/', lanceCtrl.register);
router.get('/getByZarpeId', lanceCtrl.getByZarpeId);

module.exports = router;