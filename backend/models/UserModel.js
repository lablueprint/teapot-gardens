
const mongoose = require("mongoose");
const bcrypt = require('react-native-bcrypt');
const SALT_WORK_FACTOR = 10;

const uniqueValidator = require('mongoose-unique-validator');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        admin: {
            type: Boolean,
            default: false,
        },
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            uniqueCaseInsensitive: true,
        },
        password: {
            type: String,
            required: true,
        },
        dob: {
            type: String,
        },
        username: {
            type: String,
            unique: true,
        },
        bio: {
            type: String,
            default: "",
        },
        tamagatchiType: {
            type: String,
            default: "",
        },
        tamagatchiXP: {
            type: Number,
            default: 0,
        },
        followedPrograms: {
            type: [String],
            default: [],
        },
        attendedEvents: {
            type: [String],
            default: [],
        },
        attendingEvents: {
            type: [String],
            default: [],
        },
        notifications: {
            type: [String], // Note: just adding the bodyText for now but not subject
            default: [],
        },
        race: {
            type: String,
            default: "Unknown",
        },
        incomeLevel: {
            type: Number,
            default: 0,
        },
        age: {
            type: Number,
            default: 0,
        },
        genderIdentification: {
            type: String,
            default: "Unknown",
        }

    }, { timestamps: true })


userSchema.pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function (candidatePassword) {
    const user = this;

    // If callback is provided, use it
    // if (typeof cb === 'function') {
    //     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    //         if (err) return cb(err);
    //         cb(null, isMatch);
    //     });
    //     return;
    // } a

    // Otherwise return a Promise
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
            if (err) return reject(err);
            resolve(isMatch);
        });
    });
};

userSchema.plugin(uniqueValidator, { message: 'Error, {PATH} is already taken.' });


const User = mongoose.model("User", userSchema);
module.exports = User;
