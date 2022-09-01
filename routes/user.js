const express = require('express')
const userCtrl = require('../controllers/user');

const router = express.Router();

router.post('/login', userCtrl.validateUser);
router.get('/get', userCtrl.get);
router.post('/register', userCtrl.register);

module.exports = router;