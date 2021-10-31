const User = require("./userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwtSecretKey = process.env.JWT_SECRET;
const { generateJwt, comparePassword, UserService } = require("./userService");

const UserController = {};
const bodyValidate = (req, res) => {
	const result = validationResult(req);

	const hasErrors = !result.isEmpty();

	if (hasErrors) {
		return res.status(422).json({
			error: true,
			statusCode: 422,
			message: "Invalid body request",
			errors: result.array({ onlyFirstError: true }),
		});
	}
};

//USER SignUp LOGIC
UserController.userSignUp = async (req, res) => {
	bodyValidate(req, res);
	try {
		//if(checkEmail.phonenumber  )
		const { firstName } = req.body;
		const user = await UserService.create({ ...req.body, roles: "USER" });
		const token = generateJwt({ user_id: user._id, firstName });
		// const token = jwt.sign({ user_id: user._id, firstName }, jwtSecretKey, {
		// 	expiresIn: process.env.JWT_EXP,
		// });
		const result = { message: "user created successfully!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	}
};

//USERLOGIN LOGIC
const userLogin = async (req, res) => {
	bodyValidate(req, res);
	try {
		const { email, password } = req.body;
		const user = await User.findOne({
			email,
		});

		if (!user) {
			return res.status(400).json({
				status: "failed",
				message: "Invaild email or password",
			});
		}
		let verify = await comparePassword(password, user.password);
		if (!verify) {
			return res.status(400).json({
				status: "failed",
				message: "Invaild email or password",
			});
		}
		console.log(user);
		const token = generateJwt({ user_id: user._id, firstName: user.firstName });
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
		let { roles } = req.body;
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
		// 			const checkUser = await User.findById(id

		// );
		// 				if(!checkUser){
		// 					return res.status(401).send(error.message);

		// 				}
		// 				const validateData = userUpdateVal.validate({...checkUser,...req.body})
		// 				if(validateData.error)
		// 				return res.status(400).json({error:{message:error.message}})

		console.log(id);
		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});

		// console.log(id);
		// const updatedUser = await User.findByIdAndUpdate(id, validateData.value, {
		// 	new: true,
		// });

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
	test,
};

module.exports.UserController = UserController;
