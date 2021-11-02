const User = require("./userModel");
const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const { UserService } = require("./userService");

//USER SignUp LOGIC
const userSignUp = async (req, res) => {
	try {
		const { user, token } = await UserService.userSignUp(req, res);
		const result = { message: "user created successfully!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	}
}
//USERLOGIN LOGIC
const userLogin = async (req, res) => {
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
// ADMIN REGISTER LOGIC
const adminSignUp = async (req, res) => {
	return UserService.adminRegister
};
//ADMINLOGIN LOGIC
const adminLogin = async (req, res) => {
	try {
		const { admin, token } = await UserService.userLogin(req, res);

		res.setHeader("Authorization", `Bearer ${token}`);
		return res.status(200).json({
			data: {
				token: token,
				first_name: admin.firstName,
				last_name: admin.lastName,
			},
			message: "login successful!",
		});
	} catch (err) {
		console.error(err);
		return res.status(403).json({ message: err.message });
	}
};
//UPDATE USER LOGIC
const updateUser = async (req, res) => {
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
const deleteUser = async (req, res) => {
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

// const test = async (req, res) => {
// 	//console.log('working')
// 	bodyValidate(req, res);
// 	return res.status(200).json({
// 		message: "working",
// 	});
// };
module.exports = {
	adminLogin,
	userLogin,
	updateUser,
	adminSignUp,
	deleteUser,
	userSignUp,
	//test,
};

// module.exports.UserController = UserController;
