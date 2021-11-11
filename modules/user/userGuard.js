const { validationResult } = require("express-validator");
const userModel = require("./userModel");
const { UserService } = require("./userService");


module.exports.userSignUpGuard = async (req) => {
	// database checks
	const result = await UserService.countDocuments({
		$or: [
			{
				email: req.body.email,
			},
			{
				phonenumber: req.body.phonenumber,
			},
		],
	});
	if (result) {
		throw new Error("Email or Phone number already exist");
	}
	console.log(result)

};

module.exports.bodyValidate = (req, res) => {
	const result = validationResult(req);

	const hasErrors = !result.isEmpty();

	if (hasErrors) {
		throw new Error({
			error: true,
			statusCode: 422,
			message: "Invalid body request",
			errors: result.array({ onlyFirstError: true }),
		})
	}
};

<<<<<<< HEAD
// module.exports.userEmailExists = async (req) => {
// 	try {
// 		const result = await UserService.findOne({
// 			email: req.body.email
// 		})
// 		if (result){
// 			throw new Error("Email already exist!");
// 		}
// 	} catch (err){
// 		console.error(err)
// 		throw new Error(err.message)
// 	}

// }
=======


module.exports.userEmailExists = async (req) => {
	try {
		console.log(req.body.email)
		const result = await UserService.findSingle(
			req.body.email
		)
		if (result) {
			throw new Error("Email already exist!");
		}
	} catch (err) {
		console.error(err)
		throw new Error(err.message)
	}

}

module.exports.userIdExists = async (req) => {
	console.log(req.params.id)
	const result = await userModel.findById(req.params.id)
	if (!result) {
		throw new Error("User with id not found!");
	}
}
>>>>>>> 99f9f7645d011735f7501f8bfa85cf7da588601d

module.exports.userloginGuard = async (req) => {
	const { email, password } = req.body;
	const user = await UserService.findSingle(email);
	if (!user) {
<<<<<<< HEAD
		return "user does not exist!";
=======
		throw new Error("user does not exist!");
>>>>>>> 99f9f7645d011735f7501f8bfa85cf7da588601d
	}
	let verify = await UserService.comparePassword(password, user.password);
	if (!verify) {
		throw new Error("Invaild email or password");
	}
	req.user = user;
<<<<<<< HEAD
};
=======
}
>>>>>>> 99f9f7645d011735f7501f8bfa85cf7da588601d

module.exports.updateUser = async (req) => {
	const { id } = req.params;
	try {
<<<<<<< HEAD
		const checkUser = await UserService.findSingleById(id);
=======
		const checkUser = await UserService.findSingleById(id)
>>>>>>> 99f9f7645d011735f7501f8bfa85cf7da588601d
		if (!checkUser) {
			throw new Error("User with id not found");
		}
	} catch (e) {
		throw new Error(e.message);
	}
<<<<<<< HEAD
};

module.exports.deleteUsers = async (req) => {
	const id = req.params.id;
	const checkUser = await UserService.findSingleById(id);
=======
}
module.exports.deleteUsers = async (req) => {
	const id = req.params.id;
	const checkUser = await UserService.findSingleById(id)
>>>>>>> 99f9f7645d011735f7501f8bfa85cf7da588601d
	if (!checkUser) {
		throw new Error("User with id not found");
	}
};
