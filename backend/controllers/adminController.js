const User = require('../models/userModel')
const Skill = require('../models/skillModel')

const showAllUsers = async (req, res) => {
    try{
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch(err) {
        res.status(400).json({error:err.message})
    }
}

const showAllSkills = async (req, res) => {
    try{
        const allSkills = await Skill.find()
        res.status(200).json(allSkills)
    } catch(err) {
        res.status(400).json({error:err.message})
    }
}

const addUser = async (req, res) => {
    try{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({error:err.message})
        console.log(err)
    }
}


const addSkill = async (req, res) => {
    try{
        const newUser = await Skill.create(req.body)
        res.status(201).json(newUser)
    } catch(err) {
        res.status(400).json({error:err.message})
        console.log(err)
    }
}

module.exports = {showAllSkills, showAllUsers, addUser, addSkill}