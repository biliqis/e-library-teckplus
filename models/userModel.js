const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	phonenumber: {
		type: String,
		unique: true,
		required: true, 
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
		//REFACTOR: change to role
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

// fire a mongoose hook to hash passwords before doc saved to db
userSchema.pre("save", async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

module.exports = mongoose.model("Users", userSchema);
