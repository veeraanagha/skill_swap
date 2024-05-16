const express = require('express');
const router = express.Router();
const {registerUser, viewProfile, getMatches, login, authCheck, editUserProfile} = require('../controllers/userController');

router.post('/profile', authCheck, viewProfile)
router.get('/matches', authCheck, getMatches)
router.put('/edit', authCheck, editUserProfile)

router.post('/login', login)
router.post('/register', registerUser)


module.exports = router;