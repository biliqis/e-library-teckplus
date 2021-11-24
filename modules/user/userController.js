const User = require("./userModel");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const { UserService } = require("./userService");
const { Error } = require("mongoose");

const UserController = {};


UserController.userSignUp = async (req, res,next) => {
	try {
		const { user, token } = await UserService.userSignUp(req, res);
		console.log(user, token)
		const result = { message: "user created successfully!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).json({ message: err.message })
		// return errorFunction(res,err.message,500)
	}
}
//USERLOGIN LOGIC
UserController.userLogin = async (req, res) => {
	try {
		// const { email, password } = req.body
		const { user, token } = await UserService.userLogin(req, res);
		const result = { message: "login sucessful!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err)
		return res.status(500).json(err.message)
	}
};
//UPDATE USER LOGIC
UserController.updateUser = async (req, res) => {
	try {
		const updatedUser = await UserService.updateUser(req, res)
		return res.status(200).json({
			message: "user updated successfully",
			data: updatedUser,
		});
	} catch (error) {
		console.error(error);
		res.status(500).send(error.message);
	}
};

//delete user
UserController.deleteUser = async (req, res) => {
	try {
		const data = await UserService.deleteUser(req, res)
		return res.status(200).json({
			message: "user deleted successfully", data: data.user
		});

	} catch (error) {
		console.error(error);
		return res.status(403).send(error.message);
	}
}
//logout user

UserController.logOutUser = async (req, res) => {
	try {
		return await UserService.logOutUser(req,res)
		// const auth = await req.headers["authorization"];
		// return res.status(200).send({ message: "log out successful"})
	} catch (error) {
		console.error(error)
		return res.status(403).send(error.message)
	}
}
module.exports = UserController
