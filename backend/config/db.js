const mongoose = require("mongoose");

const connectDB = async() =>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
        console.log(`\n MONGO DB CONNECTED !!`);

    }catch(err){
        console.log(`MONGODB CONNECTION ERROR: ${err}`);
        process.exit(1);
    }
}

module.exports = connectDB;