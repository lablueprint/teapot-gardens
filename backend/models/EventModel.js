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
        type: [String]
    },
    eventDescription: {
        type: String
    },
    hostDescription: {
        type: String
    },
    XP: {
        type: Number,
    },
    pictures: {
        type: [String]
    },
    likes: { 
        type: Number,
        default: 0
    },
    likedBy: {
       type: [String],
       default: []
    },
    admin: {
        type: Number
    }, 
    eventID: { 
        type: String, 
        unique: true,
        default: function() {
            return new mongoose.Types.ObjectId().toString();
        }
    }
}, { timestamps: true })

module.exports = mongoose.model('Event', eventSchema)
