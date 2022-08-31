const express = require('express')
const embarcacionCtrl = require('../controllers/embarcacion');

const router = express.Router();

router.get('/', embarcacionCtrl.get);

module.exports = router;