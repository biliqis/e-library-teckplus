const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//USER REGISTER LOGIC
const userRegister = async (req, res) => {
	//REFACTOR: rename to userRegistration
	try {
		const { first_name, last_name, email, password } = req.body; //REFACTOR use camelCase for variable names... make changes every where necessary
		if (!(first_name || last_name || email || password))
			res.status(400).send("All input is required"); //REFACTOR: only use this for one-liner... please add the closing tag

		const checkUser = await User.findOne({ email });
		if (checkUser) {
			return res.status(409).send("User Already Exist. Please Login");
		}

		//ENCRYPTION OF PASSWORD
		const salt = await bcrypt.genSalt(10);

		const encryptedPassword = await bcrypt.hash(password, salt);
		const jwtSecretKey = process.env.JWT_SECRET;

		const user = await User.create({
			first_name, //REFACTOR: use camelCase
			last_name,
			email,
			password: encryptedPassword,
		});
		const token = await jwt.sign({ user_id: user._id, email }, jwtSecretKey, {
			expiresIn: "24h",
		});
		const result = { ...user.toJSON() };
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
		const user = await User.find({
			email,
		});

		if (!user) return res.status(404).json({ message: "account not found" });
		const comparePassword = bcrypt.compare(password, user.password);
		if (!comparePassword)
			return res.status(400).json({ message: "Invalid email or password" }); //REFACTOR add closing tags
		const loginUser = jwt.sign(
			{
				user: {
					id: user._id,
					first_name: user.first_name,
					last_name: user.last_name,
				},
			},
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXP,
			}
		);
		return res.status(200).json({
			user: {
				token: loginUser,
				first_name: user.first_name,
				last_name: user.last_name,
			},
			message: "login successful!",
		});
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message });
	}
};

//UPDATED USER LOGIC
const updatedUser = async (req, res) => {
	//REFACTOR give function a better name e.g updateUser
	const id = req.params.id;
	try {
		console.log(id);
		const updatedUser = await User.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		return res.status(200).json({
			data: updatedUser,
			message: "Updated user",
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send(error.message);
	}
};

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
	userLogin,
	userRegister,
	updatedUser,
	deleteUser,
};
