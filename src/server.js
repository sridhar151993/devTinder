const express = require('express');
const connectDB = require("./config/database");
require("dotenv").config();
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {
    // const { firstName, lastName, emailId, age, gender } = req.body

    const user = new User(req.body);

    try{
        await user.save();
        res.status(201).json("user saved successfully");
    } catch (error) {
        res.status(500).json({ error: "Failed to save user" }); 
    }

});

connectDB().then(() => {
    console.log("Database connected successfully");
    app.listen(7777,()=>{
    console.log("server is running on port 7777")
})
}).catch((error) => {
    console.error("Error connecting to the database:", error);
})







