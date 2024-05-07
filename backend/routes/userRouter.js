const express = require('express');
const router = express.Router();
const {registerController, viewProfile} = require('../controllers/userController');

router.post('/register', registerController)
router.get('/profile', viewProfile)


module.exports = router;