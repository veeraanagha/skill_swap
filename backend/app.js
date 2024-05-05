require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const app = express();
const userRouter = require('./routes/userRouter');
const homeRouter = require('./routes/homeRouter');
const PORT = process.env.PORT;

connectDB();

app.use(express.json())

app.listen(PORT, ()=> {
    console.log("server is running on ", PORT);
})

app.use('/user', userRouter)

app.use('/home', homeRouter)