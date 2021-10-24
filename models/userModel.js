const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
let emailRegexVal =
	/^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/; //REFACTOR: move validation away from here
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
			message: (mail) => `${mail.value} is not a valid email address !`, //REFACTOR: move validation away from here
		},
		required: [true, "Please enter your email address"], //REFACTOR: move validation away from here
	},

	password: {
		type: String,
		required: [true, "Please enter your password"], //REFACTOR: move validation away from here
	},

	phonenumber: {
		type: String,
		unique: true,
		required: [true, "Please enter your phoneNumber"], //REFACTOR: move validation away from here
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
