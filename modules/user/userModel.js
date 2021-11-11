const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
	},

	lastName: {
		type: String,
	},

	email: {
		type: String,
	},

	password: {
		type: String,
	},

	phonenumber: {
		type: String,
	},
	gender: {
		type: String,
		enum: ["male", "female"]
	},

	occupation: {
		type: String,
	},

	roles: {

		type: String,

		enum: ["admin", "user"]
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

// fire a mongoose hook to hash passwords before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

module.exports = mongoose.model("Users", userSchema);
