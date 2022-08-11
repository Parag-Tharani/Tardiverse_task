const mongoose = require("mongoose");

async function connectDatabase(){
    const dbUri = "mongodb://localhost:27017/Books_store";


    try {
        const response = await mongoose.connect(dbUri)
        console.log("Database Connection Successful")
    } catch (ex) {
        throw ex
    }
}


module.exports = connectDatabase
