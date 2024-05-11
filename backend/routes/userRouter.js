const express = require('express');
const router = express.Router();
const {registerUser, viewProfile, getMatches, login, authCheck} = require('../controllers/userController');

router.get('/profile', authCheck, viewProfile)
router.get('/matches', authCheck, getMatches)

router.post('/login', login)
router.post('/register', registerUser)


module.exports = router;