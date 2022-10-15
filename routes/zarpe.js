const express = require('express')
const zarpeCtrl = require('../controllers/zarpe');

const router = express.Router();

router.post('/', zarpeCtrl.register);
router.get('/', zarpeCtrl.get);
router.post('/close', zarpeCtrl.close);

module.exports = router;