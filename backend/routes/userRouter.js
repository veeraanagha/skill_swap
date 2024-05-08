const express = require('express');
const router = express.Router();
const {registerController, viewProfile, getMatches} = require('../controllers/userController');

router.get('/profile', viewProfile)
router.get('/matches', getMatches)

router.post('/register', registerController)


module.exports = router;