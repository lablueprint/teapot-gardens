const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        admin: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        tamagatchiType: {
            type: String,
            default: "",
        },
        tamagatchiXP: {
            type: Number,
            default: 0,
        },
        followedPrograms: {
            type: [String],
            default: [],
        },
        attendedEvents: {
            type: [String],
            default: [],
        },
        attendingEvents: {
            type: [String],
            default: [],
        },
        notifications: {
            type: [String], // Note: just adding the bodyText for now but not subject
            default: [],
        },
        race: {
            type: String,
            default: "Unknown",
        },
        incomeLevel: {
            type: Number,
            default: 0,
        },
        age: {
            type: Number,
            default: 0,
        },
        genderIdentification: {
            type: String,
            default: "Unknown",
        }

}, { timestamps: true })


const User = mongoose.model("User", userSchema);
module.exports = User;
