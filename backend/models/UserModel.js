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
    userId: {
        type: Number
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
        type: String
    },
    tamagatchiXP: {
        type: Number
    },
    followedPrograms: {
        type: [Number]
    },
    attendedEvents: {
        type: [Number]
    },
    attendingEvents: {
        type: [Number]
    }

}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)
