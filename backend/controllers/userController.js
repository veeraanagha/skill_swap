const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Skill = require('../models/skillModel');
const authCheck = require('../middlewares/authCheck');
const jwt = require('jsonwebtoken');
const tokenize = require('../utils/tokenizer');
const { generateUsername } = require("unique-username-generator");   // https://www.npmjs.com/package/unique-username-generator


async function getUniqueUsername() {
    let username, condition
    do {
        username = generateUsername("", 0, 15)
        condition = await User.findOne({ username })
    } while (condition)
    return username
}


const login = async (req, res) => {
    try{
        const userExists = await User.findOne({ email: req.body.email })
        if(!userExists){
            return res.status(401).send("User does not exist")
        }
        const passwordMatches = await bcrypt.compare(req.body.password, userExists.password)
        if(!passwordMatches){
            return res.status(401).send("wrong password or email address")
        }
        const expiresInMs = 3600000 * 1  // 1 hr = 3600000 ms
        if (userExists && passwordMatches) {
            const token = tokenize(userExists.username, userExists.email, expiresInMs)
            res.cookie('token', token, { httpOnly: true, maxAge: expiresInMs })
            // console.log(`token : ${token}`)
            console.log("\nUser logged in successfully.\n")
            return res.status(200).json({token})
        }else {
            return res.status(400).json("Invalid user  OR  wrong username-password ")
         }
    } catch(e){
        return res.status(500).send(e);   
    }   
}



const registerUser = async (req, res) => {
    const username = await getUniqueUsername()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    try {
        if (
            req.body.fname && req.body.fname.length < 20 &&
            req.body.lname && req.body.lname.length < 20 &&
            req.body.email && emailRegex.test(req.body.email) &&
            req.body.password && req.body.password.length > 6 && req.body.password.length < 20
        ) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const newUser = await User.create({
                ...req.body,
                password: hashedPassword,
                username: username
            })
            console.log("User created !!")
            res.status(200).json("User created !")
        }
        else {
            console.log("\nRejected user creation, input criteria not followed !\n")
            return res.status(401).send({ message: "Rejected user creation, input criteria not followed !" })
        }
    } catch (err) {
        res.status(400).json({ error: err.message })
    }

}


// fetch a profile using ID or username
const viewProfile = async (req, res) => {
    try {
        // Fetching list of skills
        const allSkills = await Skill.find()

        let query = ""

        if (req.body._id) {
            query = { _id: req.body._id };
        } else if (req.body.username) {
            query = { username: req.body.username };
        }

        let thisUser
        if(query)
        thisUser = await User.findOne(query);


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
        res.status(200).json(profile)
    } catch (err) {
        console.log("\nFailed to fetch user details !\n")
        res.status(400).json({ error: err.message })
    }
}


// outputs lists of matchs (fullname + id)
const getMatches = async (req, res) => {
    try {
        const thisUser = await User.findOne({ _id: req.body._id })

        const matchList = await Promise.all(thisUser.matches.map(id => User.findOne({ _id: id })))
        const matches = matchList.map(match => {
            return {
                name: `${match.fname} ${match.lname}`,
                id: match._id
            }
        })
        console.log(matches)

        if  (matches.length > 0) {
            res.status(200).json(matches);
        } else {
            res.status(200).json("No matches yet :(");
        }
    } catch (err) {
        console.log("\nError finding matches !\n")
        res.status(400).json({ error: err.message })
    }
}

const editUserProfile = async(req, res) => {
    const {fname, lname, email, username, bio} = req.body;
    const userId = req.user._id;
    try{
        const updatedUser = await User.findByIdAndUpdate(userId, { fname, lname, username, bio, email }, { new: true });

        return res.status(200).json({ message: 'Profile updated successfully'});
    } catch(e){
        return res.status(500).send(e);
    }
} 

module.exports = {registerUser, viewProfile, getMatches, login, authCheck, editUserProfile}

