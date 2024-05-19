const User = require('../models/userModel');
const mongoose = require('mongoose');

const getPotentialMatches = async(req, res) => {
    try{ 
        const currentUser = req.user
        const currentUserInterests = currentUser.interests;

      // Find users who have skills matching the current user's interests
        const potentialMatchesBySkills = await mongoose.model('User').find({
        skills: { $in: currentUserInterests }
        }).populate('skills');
        console.log(potentialMatchesBySkills);
        return res.status(200).send('success')
    } catch (error) {
        throw error;
    }
}

module.exports = getPotentialMatches;