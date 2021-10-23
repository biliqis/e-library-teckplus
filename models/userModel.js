const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let emailRegexVal =
	/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/; //REFACTOR: move validation away from here... do so for all other fields
const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},

	lastName: {
		type: String,
		required: true,
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
		required: [true, "Please enter your email address"],
	},

	password: {
		type: String,
		required: [true, "Please enter your password"],
	},

	phonenumber: {
		type: String,
		unique: true,
		required: [true, "Please enter your phoneNumber"],
	},

	registrationDate: {
		type: Number,
	},

	gender: {
		type: String,
		default: "female",
		required: true,
	},

	occupation: {
		type: String,
	},

	roles: {
		type: String,
		enum: ["ADMIN", "USER"],
	},
	age: {
		type: String,
	},

	address: {
		type: String,
	},

	registrationDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Users", userSchema);
