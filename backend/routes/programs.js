const express = require('express')
const {
    getPrograms,
    getProgram,
    createProgram,
    deleteProgram,
    updateProgram
} = require('../controllers/programController')

const Program = require('../models/ProgramModel')

const router = express.Router()

router.get('/', getPrograms)

router.get('/:id', getProgram)

router.post('/', createProgram)

router.delete('/:id', deleteProgram)

router.patch('/:id', updateProgram)

module.exports = router