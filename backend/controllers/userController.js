const User = require('../models/UserModel')
const mongoose = require('mongoose')

// get all users
const getUsers = async (req, res) => {
    const users = await User.find({}).sort({createdAt: -1})
    res.status(200).json(users)
}

// get a single user
const getUser = async(req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "User not found"})
    }
    const user = await User.findById(id)
    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    res.status(200).json(user)
}

// create a new user
const createUser = async (req, res) => {
    console.log("create a user")
    // add doc to db
    try{
        const user = await User.create(req.body)
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({error: error.essage})

    }
}

// delete a user
const deleteUser = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "User not found"})
    }
    const user = await User.findOneAndDelete({_id: id})
    
    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    res.status(200).json(user)

}

// update a user
const updateUser = async (req, res) => {
    console.log("update user")
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "User not found"})
    }
    const user = await User.findOneAndUpdate({_id: id}, {
        ...req.body
    })
    
    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    res.status(200).json(user)
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
}