const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecretKey = process.env.JWT_SECRET;

//USER SignUp LOGIC
const userSignUp = async (req, res) => {
	try {
		const { firstName } = req.body;
		const user = await User.create({ ...req.body, roles: "USER" });
		const token = jwt.sign({ user_id: user._id, firstName }, jwtSecretKey, {
			expiresIn: process.env.JWT_EXP,
		});
		const result = { message: "user created successfully!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	}
};

//USERLOGIN LOGIC
const userLogin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			email,
		});
		// console.log(user);
		const token = jwt.sign(
			{
				id: user._id.toString(),
				user: {
					id: user._id.toString(),
					firstName: user.firstName, //REFACTOR: update code to match the model
				},
			},
			jwtSecretKey,
			{
				expiresIn: process.env.JWT_EXP,
			}
		);
		// res.setHeader("Authorization", `Bearer ${loginUser}`);
		return res.status(200).json({
			user,
			token,
			message: "login successful!",
		});
	} catch (err) {
		// console.error(err);
		return res.status(500).json({ message: err.message });
	}
};

// ADMIN REGISTER LOGIC
const adminSignUp = async (req, res) => {
	try {
		let { roles } = req.body
		const admin = await User.create({ ...req.body, roles: "ADMIN" });
		// let roles = admin.roles
		const token = jwt.sign({ admin_id: admin._id, roles }, jwtSecretKey, {
			expiresIn: process.env.JWT_EXP,
		});
		const result = { message: "admin created successfully!", admin, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	}
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
	// const id = req.params.id;
	const { id } = req.params;
	try {
		// console.log(id);
		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json({
			message: "user updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send(error.message);
	}
};

//delete user
const deleteUser = async (req, res) => {
	const id = req.params.id;
	try {
		const deleteUser = await User.findByIdAndDelete(id, req.body);
		return res.status(200).json({
			message: "user deleted successfully",
			data: deleteUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send(error.message);
	}
};

module.exports = {
	adminLogin,
	userLogin,
	userSignUp,
	updateUser,
	adminSignUp,
	deleteUser,
};
