const express = require('express');
const router = express.Router();
const {getAllSkills} = require('../controllers/utilController');

router.get('/skills', getAllSkills)

module.exports = router;