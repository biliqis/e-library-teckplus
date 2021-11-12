const User = require("./userModel");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const { UserService } = require("./userService");
// const{ errorFunction,handleDuplicateError } = require("../../helper/error")
// const {handleDuplicateError} = require('../../helper/error')

// TODO: TIE ALL FUNCTIONS BELOW TO THE USER CONTROLLER 
const UserController = {};


	UserController.userSignUp = async (req, res)=>{
	try {
		const { user, token } = await UserService.userSignUp(req, res);
		console.log(user,token)
		const result = { message: "user created successfully!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return errorFunction(res,err.message,500)
	}
}
//USERLOGIN LOGIC
UserController.userLogin = async (req, res) => {
	try {
		// const { email, password } = req.body
		 const {user,token} = await UserService.userLogin(req, res);
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
		return res.status(500).send(error.message);
	}
};

//delete user
UserController.deleteUser = async (req, res) => {
	try {
		const deletedUser = UserService.deleteUser(req, res)
		return res.status(200).json({
			message: "user deleted successfully", data: deleteUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(403).send(error.message);
	}
}

module.exports = UserController 
