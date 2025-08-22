const mongoose = require('mongoose');
require('dotenv').config(); // only if you use .env for MongoDB connection

// Import your Skill model
const Skill = require('./models/skillModel'); // adjust path if needed

// Your skills data
const skillsData = [
  { name: 'JavaScript' },
  { name: 'Python' },
  { name: 'Java' },
  { name: 'C++' },
  { name: 'React' },
  { name: 'Node.js' },
  { name: 'Dancing' },
  { name: 'Cooking' }
];

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/skillswap', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Connected to MongoDB');
  await Skill.deleteMany({});
  await Skill.insertMany(skillsData);
  console.log('Skills seeded successfully');
  mongoose.connection.close();
})
.catch(err => {
  console.error('Error:', err);
});
