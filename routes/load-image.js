const express = require('express')
const loadImageCtrl = require('../controllers/load-image');

const router = express.Router();

router.post('/', loadImageCtrl.load);

module.exports = router;