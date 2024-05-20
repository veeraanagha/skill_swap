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

const swipeAction = async (req, res) => {
    try {
        const { userId, action } = req.body; // userId of the swiped user, and the action (right or left swipe)
        const currentUser = req.user;

        if (action !== 'right' && action !== 'left') {
            return res.status(400).json({ error: 'Invalid action' });
        }

        const swipedUser = await mongoose.model('User').findById(userId);
        if (!swipedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (action === 'right') {
            // If the current user swiped right, add the swiped user to matchRequests
            currentUser.matchRequests.push(swipedUser._id);
            await currentUser.save();

            // Check if the swiped user also swiped right, if yes, they become a match
            if (swipedUser.matchRequests.includes(currentUser._id)) {
                // Add both users to each other's matches
                currentUser.matches.push(swipedUser._id);
                swipedUser.matches.push(currentUser._id);
                await currentUser.save();
                await swipedUser.save();
            }
        }

        // Handle left swipe (optional)
        // You can add additional logic here if needed, such as updating preferences, etc.

        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error in swipeAction:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = {getPotentialMatches, swipeAction};