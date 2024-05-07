const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Skill = require('../models/skillModel');
const jwt = require('jsonwebtoken');

//function to register user
const registerController = (req, res)=> {
   
}


// fetch a profile using ID 
const viewProfile = async (req, res) => {
    try {
        // Fetching list of skills
        const allSkills = await Skill.find()
        console.log(allSkills)

        // Finding user by ID
        const thisUser = await User.findOne({ _id: req.body._id })
        
        if (!thisUser) {
            return res.status(404).json({ error: 'User not found' })
        }

        const profile = {
            fname: thisUser.fname,
            lname: thisUser.lname,
            email: thisUser.email,
            skills: thisUser.skills.map(element => allSkills.find(skill => skill._id.equals(element)).name),
            interests: thisUser.interests.map(element => allSkills.find(interest => interest._id.equals(element)).name)
        }
        console.log(profile)
        res.status(200).json(profile)
    } catch(err) {
        console.log("\nFailed to fetch user details !\n")
        res.status(400).json({ error: err.message })
    }
};



module.exports = {registerController, viewProfile}