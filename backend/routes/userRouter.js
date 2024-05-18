const express = require('express');
const router = express.Router();
const {registerUser, viewProfile, getMatches, login, authCheck, editUserProfile, updateUserSkills, updateUserInterests} = require('../controllers/userController');

router.post('/profile', authCheck, viewProfile)
router.get('/matches', authCheck, getMatches)
router.put('/profile-update', authCheck, editUserProfile)
router.put('/:userId/skills-update', authCheck, updateUserSkills)
router.put('/:userId/interests-update', authCheck, updateUserInterests);


router.post('/login', login)
router.post('/register', registerUser)


module.exports = router; 