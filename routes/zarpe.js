const express = require('express')
const zarpeCtrl = require('../controllers/zarpe');

const router = express.Router();

router.post('/', zarpeCtrl.register);
router.get('/', zarpeCtrl.get);

module.exports = router;