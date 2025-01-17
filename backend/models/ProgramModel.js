const mongoose = require('mongoose')

const Schema = mongoose.Schema

/*
upcomingEvents(array of EventIds)
pastEvents(array of EventIds)
followList(array of integers bc of userId)
description(string)
*/

const programSchema = new Schema({
    upcomingEvents: {
        type: [Number]
    },
    pastEvents: {
        type: [Number]
    },
    followList: {
        type: [Number]
    },
    description: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Program', programSchema)

// call the model like Program.find()