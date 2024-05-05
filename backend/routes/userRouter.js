const express = require('express');
const router = express.Router();
const {registerController} = require('../controllers/userController');

router.post('/register', registerController);

module.exports = router;