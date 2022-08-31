const express = require('express')
const zarpeCtrl = require('../controllers/zarpe');

const router = express.Router();

router.post('/', zarpeCtrl.register);

module.exports = router;