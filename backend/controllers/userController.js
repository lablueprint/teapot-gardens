const jwt = require('jsonwebtoken');
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
        console.log(req.body)
        const user = await User.create(req.body)
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.status(200).json({userId: user._id, token})
    } catch (error) {
        res.status(400).json({error: error.message})

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

    let updatePayload;
 
    if (req.body.notifications) {
        updatePayload = {
            $push: { notifications: req.body.notifications },
        };
    } else {
        updatePayload = { ...req.body };
    }

    const user = await User.findOneAndUpdate({ _id: id }, updatePayload, {
        new: true,
    });
    
    if (!user) {
        return res.status(404).json({error: "User not found"})
    }
    res.status(200).json(user)
}

// update user's events
const updateUserEvents = async (req, res) => {
    const { userId, eventId } = req.body;
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     return res.status(404).json({ error: "Invalid User ID" });
    // }

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { attendingEvents: eventId } }, 
            {new: true}
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser, 
    updateUserEvents
}