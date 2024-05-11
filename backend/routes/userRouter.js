const express = require('express');
const router = express.Router();
const {registerUser, viewProfile, getMatches} = require('../controllers/userController');

router.get('/profile', viewProfile)
router.get('/matches', getMatches)

router.post('/register', registerUser)


module.exports = router;