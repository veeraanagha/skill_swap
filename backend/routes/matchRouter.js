const express = require('express')
const router = express.Router()
const getPotentialMatches = require('../controllers/matchController');
const authCheck = require('../middlewares/authCheck');

router.get('/getmatches', authCheck, getPotentialMatches)

module.exports = router;