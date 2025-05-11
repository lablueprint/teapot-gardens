
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

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
            unqiue: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true,
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
        bio: {
            type: String,
            default: "",
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

userSchema.plugin(uniqueValidator, { message: 'Error, {PATH} is already taken.' });


const User = mongoose.model("User", userSchema);
module.exports = User;
