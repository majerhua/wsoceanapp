const express = require('express')
const embarcacionCtrl = require('../controllers/embarcacion');

const router = express.Router();

router.post('/', embarcacionCtrl.register);

module.exports = router;