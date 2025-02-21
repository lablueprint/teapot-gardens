const mongoose = require('mongoose')

const Schema = mongoose.Schema

/*
upcomingEvents(array of EventIds)
pastEvents(array of EventIds)
followList(array of integers bc of userId)
description(string)
*/

const eventSchema = new Schema({
    name: {
        type: String
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
    location: {
        type: String
    },
    attendeeList: {
        type: []
    },
    eventDescription: {
        type: String
    },
    hostDescription: {
        type: String
    },
    XP: {
        type: Number
    },
    pictures: {
        type: []
    },
    admin: {
        type: Number
    }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)

// call the model like Program.find()