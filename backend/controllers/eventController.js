const Event = require('../models/EventModel')
const mongoose = require('mongoose')

// get all events
const getEvents = async (req, res) => {
    const events = await Event.find({}).sort({createdAt: -1})
    res.status(200).json(events)
}

// get a single Event
const getEvent = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "event not found"})
    }
    const event = await Event.findById(id)
    if (!event) {
        return res.status(404).json({error: "event not found"})
    }
    res.status(200).json(event)
}

// create a new Event
const createEvent = async (req, res) => {
    const {name, time, date, location, attendeeList, eventDescription, hostDescription, XP, pictures, admin} = req.body

    // add doc to db
    try{
        const event = await Event.create({name, time, date, location, attendeeList, eventDescription, hostDescription, XP, pictures, admin})
        res.status(200).json(event)
    } catch (error) {
        res.status(400).json({error: error.essage})

    }
}

// delete a event
const deleteEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "event not found"})
    }
    const event = await event.findOneAndDelete({_id: id})
    
    if (!event) {
        return res.status(404).json({error: "event not found"})
    }
    res.status(200).json(event)

}

// update a event
const updateEvent = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "event not found"})
    }
    const event = await event.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!event) {
        return res.status(404).json({error: "event not found"})
    }
    res.status(200).json(event)
}

const updateEventUsers = async (req, res) => {
    const { eventId, userId } = req.body;
    console.log(eventId, userId);
    try {
        console.log('updating events')
        const event = await Event.findByIdAndUpdate(
            eventId,
            { $addToSet: { attendeeList: userId } },
            { new: true }
        )

        if (!event) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(event)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getAttendees = async (req, res) => {
    const { id } = req.params

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        const count = event.attendeeList;
        res.status(200).json(count);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// const likeEvent = async (req, res) => {
//     const { id } = req.params;
//     const { likeChange } = req.body; // Expecting 1 or -1

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//         return res.status(404).json({ error: "Event not found" });
//     }

//     if (typeof likeChange !== "number") {
//         return res.status(400).json({ error: "Invalid likeChange value" });
//     }

//     try {
//         const event = await Event.findByIdAndUpdate(
//             id,
//             { $inc: { likes: likeChange } },
//             { new: true }
//         );

//         if (!event) {
//             return res.status(404).json({ error: "Event not found" });
//         }
//         res.status(200).json({ message: "Like updated", likes: event.likes });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const likeEvent = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; // User ID is required to track individual likes

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Event not found" });
    }

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        let updatedEvent;
        if (event.likedBy.includes(userId)) {
            // Unlike the event
            updatedEvent = await Event.findByIdAndUpdate(
                id,
                {
                    $pull: { likedBy: userId },
                    $inc: { likes: -1 }
                },
                { new: true }
            );
        } else {
            // Like the event
            updatedEvent = await Event.findByIdAndUpdate(
                id,
                {
                    $addToSet: { likedBy: userId },
                    $inc: { likes: 1 }
                },
                { new: true }
            );
        }

        res.status(200).json({ message: "Like updated", likes: updatedEvent.likes, likedBy: updatedEvent.likedBy });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = {
    getEvents,
    getEvent,
    createEvent,
    deleteEvent,
    updateEvent,
    updateEventUsers,
    getAttendees,
    likeEvent
}