const express = require('express');
const router = express.Router();
const {registerUser, viewProfile, getMatches, login} = require('../controllers/userController');

router.get('/profile', viewProfile)
router.get('/matches', getMatches)
router.get('/login', login)

router.post('/register', registerUser)


module.exports = router;