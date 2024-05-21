const express = require('express');
const router = express.Router();
const {registerUser, viewProfile, getMatches, login, authCheck, editUserProfile, updateUserSkills, updateUserInterests, logout, getNotifications} = require('../controllers/userController');

router.get('/matches', authCheck, getMatches)
router.get('/notifications', authCheck, getNotifications)

router.put('/profile-update', authCheck, editUserProfile)
router.put('/skills-update', authCheck, updateUserSkills)
router.put('/interests-update', authCheck, updateUserInterests);

router.post('/profile', authCheck, viewProfile)
router.post('/logout', logout)
router.post('/login', login)
router.post('/register', registerUser)


module.exports = router; 