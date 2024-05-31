const express = require('express');
const router = express.Router();
const {getAllSkills, showProfileWithUsername} = require('../controllers/utilController')

router.get('/skills', getAllSkills)

router.get('/:id', showProfileWithUsername)

module.exports = router;