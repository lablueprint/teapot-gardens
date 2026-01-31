const Event = require('../models/EventModel')
const User = require("../models/UserModel");
const mongoose = require('mongoose')
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// get all events
const getEvents = async (req, res) => {
  const events = await Event.find({}).sort({createdAt: -1})
  res.status(200).json(events)
}

// get a single Event
const getEvent = async(req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "event not found" })
  }

  const event = await Event.findById(id)
  if (!event) {
    return res.status(404).json({ error: "event not found" })
  }

  res.status(200).json(event)
}

// create a new Event
const createEvent = async (req, res) => {
  try {
    console.log('req.body', req.body)
    const event = await Event.create(req.body) 
    res.status(200).json(event)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a event
const deleteEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "event not found" })
  }

  // ▼  Use Event (the Mongoose model), not event
  const event = await Event.findOneAndDelete({ _id: id })
  
  if (!event) {
    return res.status(404).json({ error: "event not found" })
  }

  res.status(200).json(event)
}

// update a event
const updateEvent = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error: "event not found" })
  }

  // ▼  Use Event (the Mongoose model), not event
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true } // Return the updated document
  )
  
  if (!updatedEvent) {
    return res.status(404).json({ error: "event not found" })
  }

  res.status(200).json(updatedEvent)
}

const updateEventUsers = async (req, res) => {
  const { eventId, userId } = req.body;
  try {
    const event = await Event.findByIdAndUpdate(
      eventId,
      { $addToSet: { attendeeList: userId } },
      { new: true }
    )

    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    res.status(200).json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAttendees = async (req, res) => {
  const { id } = req.params

  try {
    const event = await Event.findById(id)
    if (!event) {
      return res.status(404).json({ error: "Event not found" })
    }

    // event.attendeeList is presumably an array of user IDs
    res.status(200).json(event.attendeeList)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const getAttendeeStats = async (req, res) => {
    console.log("Params received:", req.params);

    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(404).json({ error: "Event not found" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        console.log("Raw attendeeList from database:", event.attendeeList);

        if (!Array.isArray(event.attendeeList) || event.attendeeList.length === 0) {
            return res.status(200).json({ userStatsList: [] });
        }

        // Query user data from the 'users' collection
        const users = await User.find({ _id: { $in: event.attendeeList } });

        const userStatsList = users.map(user => ({
            incomeLevel: Number.isInteger(user.incomeLevel) ? user.incomeLevel : 0,
            isNewAttendee: Array.isArray(user.attendedEvents) && user.attendedEvents.length === 0,
            genderIdentification: typeof user.genderIdentification === "string" ? user.genderIdentification : "Unknown",
            race: typeof user.race === "string" ? user.race : "Unknown",
        }));

        console.log("Final userStatsList:", userStatsList);
        res.status(200).json({ userStatsList });

    } catch (error) {
        console.error("Error retrieving event:", error);
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

// Export event attendee data as CSV
const exportEventData = async (req, res) => {
    const { eventId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(eventId)) {
        return res.status(404).json({ error: "Event not found" });
    }

    try {
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ error: "Event not found" });
        }

        // Get all attendees (both registered and attended)
        const allAttendeeIds = [...new Set([...event.attendeeList])];

        if (allAttendeeIds.length === 0) {
            return res.status(200).json({ message: "No attendees to export" });
        }

        const users = await User.find({ _id: { $in: allAttendeeIds } });

        // Prepare CSV data
        const csvData = users.map(user => ({
            name: user.name || 'N/A',
            email: user.email || 'N/A',
            username: user.username || 'N/A',
            attended: user.attendedEvents.includes(eventId) ? 'Yes' : 'No',
            registered: user.attendingEvents.includes(eventId) ? 'Yes' : 'No',
            gender: user.genderIdentification || 'Unknown',
            race: user.race || 'Unknown',
            age: user.age || 'Unknown',
            incomeLevel: user.incomeLevel || 0,
            tamagotchiXP: user.tamagatchiXP || 0,
            isNewAttendee: user.attendedEvents.length === 0 ? 'Yes' : 'No',
        }));

        // Instead of writing to file, return CSV as string
        const csvWriter = createCsvWriter({
            path: `/tmp/event_${eventId}_export.csv`,
            header: [
                { id: 'name', title: 'Name' },
                { id: 'email', title: 'Email' },
                { id: 'username', title: 'Username' },
                { id: 'attended', title: 'Attended' },
                { id: 'registered', title: 'Registered' },
                { id: 'gender', title: 'Gender' },
                { id: 'race', title: 'Race/Ethnicity' },
                { id: 'age', title: 'Age' },
                { id: 'incomeLevel', title: 'Income Level' },
                { id: 'tamagotchiXP', title: 'Total XP' },
                { id: 'isNewAttendee', title: 'First Time Attendee' },
            ]
        });

        await csvWriter.writeRecords(csvData);

        // Send file for download
        res.download(`/tmp/event_${eventId}_export.csv`, `event_${event.name || eventId}_attendees.csv`, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Error downloading file' });
            }
            // Clean up temp file
            const fs = require('fs');
            fs.unlink(`/tmp/event_${eventId}_export.csv`, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting temp file:', unlinkErr);
            });
        });

    } catch (error) {
        console.error("Error exporting event data:", error);
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
    likeEvent,
    getAttendeeStats,
    exportEventData
}
