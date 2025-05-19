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
const checkUserEmailandPass = async(req, res) => {
    const { email1, password } = req.body;
    try {
        // Use findOne to get a single document, not an array
        const user = await User.findOne({ email: email1 });
        
        // Check if user exists
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password"});
        }
        
        try {
            // Use the Promise-based version we implemented
            const isMatch = await user.comparePassword(password);
            
            if(!isMatch) {
                return res.status(401).json({ error: "Invalid email or password"});
            }
            
            // Success case - return minimal user info needed
            res.status(200).json({
                _id: user._id,
                email: user.email
            });
        } catch (err) {
            console.error("Password comparison error:", err);
            res.status(500).json({ error: "Server error occurred" });
        }
    } catch(error) {
        console.error("Login error:", error);
        // Never expose credentials in error responses
        res.status(500).json({ error: "Server error occurred" });
    }
}
// const checkUserEmailandPass = async(req, res) => {
//     const { email, password } = req.body
//     try {
//         const user = await User.find({ email: email });
//         if (!user) {
//             return res.status(400).json({ error: "invalid email or password"})
//         }
//         const isMatch = (password === user.password)

//         if(!isMatch) {
//             return res.status(404).json({error: "invalid email or password", user: user})
//         }
//         res.status(200).json({
//             _id: user._id,
//             email: user.email,

//         });
//     } catch(error) {
//         res.status(500).json({error: error.message, email: email, password:password});
//     }
// }
// create a new user
// const createUser = async (req, res) => {
//     console.log("create a user")
//     // add doc to db
//     try{
//         console.log(req.body)
//         const user = await User.create(req.body)
//         res.status(200).json(user)
//     } catch (error) {
//         process.stdout.write(error, "test")
//         res.status(400).json({error: error.message})

//     }
// }
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
        console.log("Error creating user:", error)
        
        // Check if it's a validation error
        if (error.name === 'ValidationError') {
            // Format validation errors
            const errors = {};
            for (let field in error.errors) {
                errors[field] = error.errors[field].message;
            }
            
            return res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: errors
            });
        }
        
        // Handle MongoDB duplicate key error (just in case)
        if (error.code === 11000) {
            const field = Object.keys(error.keyPattern)[0];
            return res.status(400).json({
                success: false,
                message: `${field} already exists`,
                errors: { [field]: `${field} already exists` }
            });
        }

        res.status(400).json({
            success: false, 
            message: error.message
        })
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
            $set: {tamagatchiLevel: req.body.tamagatchiLevel}
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
    updateUserEvents,
    checkUserEmailandPass
}