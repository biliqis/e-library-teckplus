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


//helper function to find a single user before logging in
UserService.findSingle = (email) => {
	return UserModel.findOne({ email: email })
}

//helper function to check if an account already exists
UserService.findSingleById = (id) => {
	return UserModel.findById(id)
}

UserService.updateUser = async (req, res) => {
	return UserModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});
}

UserService.deleteUser = async (req, res) => {
	const id = req.params.id;
	return UserModel.findByIdAndDelete(id);
};


UserService.userSignUp = async (req, res) => {
	const { firstName } = req.body;
	console.log(req.body)
	const user = await UserModel.create({ ...req.body });
	const token = UserService.generateJwt({ user_id: user._id, firstName });
	return { user, token };

};


UserService.userLogin = async (req, res) => {
	const user = await UserModel.findOne({ email: req.body.email, })
	const token = UserService.generateJwt({ user_id: user._id, firstName: req.user.firstName });

	return { user, token }
}


UserService.adminRegister = async (req, res) => {
	let { role } = req.body;
	const admin = await User.create({ ...req.body });
	// let roles = admin.roles
	const token = jwt.sign({ admin_id: admin._id, roles }, jwtSecretKey, {
		expiresIn: process.env.JWT_EXP,
	});
	return { token, admin }

}


module.exports.UserService = UserService;
