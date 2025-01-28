const Program = require('../models/ProgramModel')
const mongoose = require('mongoose')
const { getEvent } = require('./eventController')

// get all programs
const getPrograms = async (req, res) => {
    const programs = await Program.find({}).sort({createdAt: -1})
    res.status(200).json(programs)
}

// get a single program
const getProgram = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Program not found"})
    }
    const program = await Program.findById(id)
    if (!program) {
        return res.status(404).json({error: "Program not found"})
    }
    res.status(200).json(program)
}

// get program's past events
const getPastEvents = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Program not found"})
    }
    const program = await Program.findById(id)
    if (!program) {
        return res.status(404).json({error: "Program not found"})
    }

    const pastEvents = program.pastEvents;
    res.status(200).json(pastEvents)
}

// const getEvent = async(req, res) => {
//     const { id } = req.params

//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "Program not found"})
//     }
//     const program = await Program.findById(id)
//     if (!program) {
//         return res.status(404).json({error: "Program not found"})
//     }

//     const pastEvents = program.pastEvents;
//     res.status(200).json(pastEvents)
// }

// create a new program
const createProgram = async (req, res) => {
    const {upcomingEvents, pastEvents, followList, description} = req.body

    // add doc to db
    try{
        const program = await Program.create({upcomingEvents, pastEvents, followList, description})
        res.status(200).json(program)
    } catch (error) {
        res.status(400).json({error: error.essage})

    }
}

// delete a program
const deleteProgram = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Program not found"})
    }
    const program = await Program.findOneAndDelete({_id: id})
    
    if (!program) {
        return res.status(404).json({error: "Program not found"})
    }
    res.status(200).json(program)

}

// update a program
const updateProgram = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Program not found"})
    }
    const program = await Program.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!program) {
        return res.status(404).json({error: "Program not found"})
    }
    res.status(200).json(program)
}

module.exports = {
    getPrograms,
    getProgram,
    getPastEvents,
    getEvent,
    createProgram,
    deleteProgram,
    updateProgram
}