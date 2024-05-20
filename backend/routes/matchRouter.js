const express = require('express')
const router = express.Router()
const {getPotentialMatches, swipeAction} = require('../controllers/matchController');
const authCheck = require('../middlewares/authCheck');

router.get('/getmatches', authCheck, getPotentialMatches)
router.post('/swipe', authCheck, swipeAction)

module.exports = router;