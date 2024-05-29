const express = require('express');
const router = express.Router();
const {getAllSkills} = require('../controllers/utilController');
const {authCheck, showProfileWithUsername} = require('../controllers/userController')

router.get('/skills', getAllSkills)

router.get('/:id', authCheck, showProfileWithUsername)

module.exports = router;