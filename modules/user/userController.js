const User = require("./userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwtSecretKey = process.env.JWT_SECRET;
const { generateJwt, comparePassword, UserService } = require("./userService");

const UserController = {};


// TODO: TIE ALL FUNCTIONS BELOW TO THE USER CONTROLLER 

//USER SignUp LOGIC
const userSignUp = async (req, res) => {
	return UserService.userSignUp
}

//USERLOGIN LOGIC
const userLogin = async (req, res) => {
	return UserService.userLogin
};

// ADMIN REGISTER LOGIC
const adminSignUp = async (req, res) => {
	return UserService.adminRegister
};

//ADMINLOGIN LOGIC
const adminLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const admin = await User.findOne({
			email,
		});
		const loginUser = jwt.sign(
			{
				user: {
					admin_id: admin._id,
					roles: admin.roles,
				},
			},
			jwtSecretKey,
			{
				expiresIn: process.env.JWT_EXP,
			}
		);

		res.setHeader("Authorization", `Bearer ${loginUser}`);
		return res.status(200).json({
			data: {
				token: loginUser,
				first_name: admin.firstName,
				last_name: admin.lastName,
			},
			message: "login successful!",
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message });
	}
};

//UPDATE USER LOGIC
const updateUser = async (req, res) => {
	return UserService.updateUser
};

//delete user
const deleteUser = async (req, res) => {
	return UserService.deleteUser
}

const test = async (req, res) => {
	//console.log('working')
	bodyValidate(req, res);
	return res.status(200).json({
		message: "working",
	});
};

module.exports = {
	adminLogin,
	userLogin,
	updateUser,
	adminSignUp,
	deleteUser,
	userSignUp,
	test,
};

// module.exports.UserController = UserController;
