const Skill = require('../models/skillModel');

const getAllSkills = async (req, res) => {
    try {
        const allSkills = await Skill.find()
        res.status(200).json(allSkills)
    } catch (err) {
        res.status(400).json({ error: err.message })
    }
}

module.exports = { getAllSkills }