const express = require('express')
const {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser, 
    updateUserEvents,
    checkUserEmailandPass,
    
} = require('../controllers/userController')

const User = require('../models/UserModel')

const router = express.Router()

router.get('/', getUsers)

router.get('/:id', getUser)

router.post('/login', checkUserEmailandPass)

router.post('/', createUser)

router.delete('/:id', deleteUser)

router.patch('/:id', updateUser)

router.patch('/', updateUserEvents)

module.exports = router