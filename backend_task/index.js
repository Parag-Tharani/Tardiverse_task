const express = require("express");
const cors = require("cors");
const connectDatabase = require("./database");
const { authRouter } = require("./routes/user");
const { bookRouter } = require("./routes/books");


const app = express();

app.use(express.json())
app.use(cors())

app.get("/", (req,res) => res.send("Welcome to my Books Store"))
app.use(authRouter)
app.use(bookRouter)

connectDatabase()
.then(() => {
    app.listen(8080, () => {
        console.log("Database Initialized at http://localhost:8080")
    })
})
.catch((err) => console.log("Error Connecting Database"))