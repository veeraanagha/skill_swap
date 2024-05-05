require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const authRouter = require('./routes/authRouter');
const homeRouter = require('./routes/homeRouter');
const PORT = process.env.PORT;

connectDB();

app.use(express.json())

app.listen(PORT, ()=> {
    console.log("server is running on ", PORT);
})

app.use('/user', authRouter)

app.use('/home', homeRouter)