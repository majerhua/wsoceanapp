const express = require('express')
const lanceCtrl = require('../controllers/lance');

const router = express.Router();

router.post('/', lanceCtrl.register);

module.exports = router;