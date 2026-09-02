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
        res.status(400).json({ error: error }); 
    }

});

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});


app.delete("/user/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        await User.findByIdAndDelete(userId);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete user" });
    }
});


app.patch("/user/:userId", async (req, res) => {
    const userId = req.params.userId;
    const updatedData = req.body;
    
    const allowedUpdates = ["password", "age", "gender", "photoUrl", "about", "skills"];

    const isValidUpdate = Object.keys(updatedData).every((key) => allowedUpdates.includes(key));
    if (!isValidUpdate) {
        return res.status(400).json({ error: "Invalid update fields" });
    }
    
    if (updatedData.skills) {

    // Maximum 10 skills
    if (updatedData.skills.length > 10) {
        return res.status(400).json({
            error: "Skills array cannot exceed 10 skills"
        });
    }

    // Check duplicate skills
    const uniqueSkills = new Set(updatedData.skills);

    if (uniqueSkills.size !== updatedData.skills.length) {
        return res.status(400).json({
            error: "Skills cannot contain duplicates"
        });
    }
}

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updatedData, 
            {returnDocument : "after",runValidators:true });
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json("User updated successfully");
    } catch (error) {
        res.status(500).json({ error: error.message });
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







