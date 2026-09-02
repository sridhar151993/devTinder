const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error("Password must be at least 8 characters long");
            }
        }
    },
    age: {
        type: Number,
        min: 18
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    photoUrl: {
        type: String,
        default: "https://www.pngall.com/profile-png/",
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid URL");
            }
            
        }
    },
    about: {
        type: String,
        maxlength: 500,
        default: "This is a default about me section. You can update it later."
    },
    skills: {
        type: [String],
        unique: true
    }
},{timestamps: true});


module.exports = mongoose.model("User", userSchema);