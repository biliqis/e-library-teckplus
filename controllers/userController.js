const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const jwtSecretKey = process.env.JWT_SECRET;

//USER SignUp LOGIC
const userSignUp = async (req, res) => {
	try {
		const { firstName } = req.body;
		const user = await User.create({ ...req.body, role: "USER" });
		const token = jwt.sign({ user_id: user._id, firstName }, jwtSecretKey, {
			//REFACTOR: follow javascript naming convention
			expiresIn: process.env.JWT_EXP,
		});
		const result = { user, token };
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
		if (!user) return res.status(404).json({ message: "account not found" });
		const validPassword = bcrypt.compare(password, user.password);

		if (!validPassword) {
			return res.status(400).json({ message: "Invalid email or password" });
		}
		// console.log(user);
		const token = jwt.sign(
			{
				id: user._id.toString(),
				user: {
					id: user._id.toString(),
					first_name: user.first_name, //REFACTOR: update code to match the model
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
		const {
			firstName,
			lastName,
			email,
			password,
			phoneNumber,
			address,
			roles,
			gender,
			occupation,
		} = req.body;
		if (!(firstName || lastName || email || password))
			res.status(400).send("All input is required");
		const checkAdmin = await User.findOne({ email });
		if (checkAdmin) {
			return res.status(409).send("admin Already Exist. Please Login");
		}

		const admin = await User.create({ ...req.body, roles: "ADMIN" });
		const token = jwt.sign({ admin_id: admin._id, roles }, jwtSecretKey, {
			expiresIn: process.env.JWT_EXP,
		});
		const result = { admin, token };
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
		const admin = await User.find({
			email,
		});

		if (!admin) return res.status(404).json({ message: "account not found" });
		const comparePassword = bcrypt.compare(password, admin.password);
		if (!comparePassword)
			return res.status(400).json({ message: "Invalid email or password" });
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
			Admin: {
				token: loginUser,
				first_name: admin.first_name,
				last_name: admin.last_name,
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
