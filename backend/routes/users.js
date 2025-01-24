const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser, 
    updateUserEvents,
} = require('../controllers/userController')

const User = require('../models/UserModel')

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

router.patch('/updateEvents', updateUserEvents)

module.exports = router