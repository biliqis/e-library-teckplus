const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXP;
const bcrypt = require("bcryptjs");

const UserModel = require("./userModel");

const UserService = {};

UserService.generateJwt = (userObj) => {
	return jwt.sign(userObj, jwtSecretKey, {
		expiresIn: process.env.JWT_EXP,
	});
};

UserService.comparePassword = async (password, password2) => {
	return bcrypt.compare(password, password2);
};

UserService.countDocuments = (user) => {
	return UserModel.countDocuments(user).then((count) => count > 0);
};

UserService.create = (user) => {
	// do 101 things before saving here
	const model = new UserModel(user);
	return model.save();
};

module.exports.UserService = UserService;
