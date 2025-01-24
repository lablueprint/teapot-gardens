const mongoose = require('mongoose')

const Schema = mongoose.Schema

/*
admin(bool),
userId(int),
name(string),
email(string),
password(string),
dob(string),
username(string),
tamagatchiType(string),
tamagatchiXP(int),
followedPrograms(array),
attendedEvents(array),
attendingEvents(array)
*/

const userSchema = new Schema({
    admin: {
        type: Boolean
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    password:{
        type: String
    },
    dob: {
        type: String
    },
    username: {
        type: String
    },
    tamagatchiType: {
        default: "",
        type: String
    },
    tamagatchiXP: {
        default: 0,
        type: Number
    },
    followedPrograms: {
        type: [String]
    },
    attendedEvents: {
        type: [String]
    },
    attendingEvents: {
        type: [String]
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)