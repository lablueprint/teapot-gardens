const express = require('express')
const {
    getPrograms,
    getProgram,
    getPastEvents,
    createProgram,
    deleteProgram,
    updateProgram
} = require('../controllers/programController')

const Program = require('../models/ProgramModel')

const router = express.Router()

router.get('/', getPrograms)

router.get('/:id', getProgram)

router.get('/past-events/:id', getPastEvents)

router.post('/', createProgram)

router.delete('/:id', deleteProgram)

router.patch('/:id', updateProgram)

module.exports = router