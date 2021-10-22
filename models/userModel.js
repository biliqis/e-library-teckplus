const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
let emailRegexVal = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },

    last_name: {
        type: String,
        required: true
    },


    email: {
        type: String,
        unique: true,
        validate: {
            validator: function (v) {
                return emailRegexVal.test(v);
            },
            message: (mail) => `${mail.value} is not a valid email address !`,
        },
        required: [true, "Please enter your email address"]
    },

    password: {
        type: String,
        required: [true, "Please enter your password"]
    },


    phonenumber: {
        type: String,
        unique: true,
        required: [true, "Please enter your phonenumber"]
    },

    registrationDate: {
        type: Number
    },

    gender: {
        type: String,
        default: "female",
        required: true
    },

    occupation: {
        type: String,
    },
    roles: {
        type: String,
        enum: ["ADMIN", "USER"]

    },
    age: {
        type: String
    },

    address: {
        type: String

    },

    registrationDate: {
        type: Date,
        default: Date.now

    }

})

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY)
//     return token;
// }

module.exports = mongoose.model('Users', userSchema)