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

// UserService.create = (user) => {
// 	// do 101 things before saving here
// 	const model = new UserModel(user);
// 	return model.save();
// };

//helper function to find a single user before logging in
UserService.findSingle = (email) => {
	return UserModel.findOne({email:email})
}

//helper function to check if an account already exists
UserService.findSingleById = (id) => {
	return UserModel.findById(id)
}

UserService.updateUser = async (req,res) => {
	try {
		const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {
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
}

UserService.deleteUser = async (req, res)=>{
	const id = req.params.id;
	try {
		const deleteUser = await User.findByIdAndDelete(id);
		return res.status(200).json({message: "user deleted successfully",data: deleteUser,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send(error.message);
	}
};


UserService.userSignUp = async (req,res) => {
	bodyValidate(req, res);
	try {
		//if(checkEmail.phonenumber  )
		const { firstName } = req.body;
		const user = await UserModel.create({ ...req.body, roles: "USER" });
		const token = UserService.generateJwt({ user_id: user._id, firstName });
		// const token = jwt.sign({ user_id: user._id, firstName }, jwtSecretKey, {
		// 	expiresIn: process.env.JWT_EXP,
		// })
		const result = { message: "user created successfully!", user, token };
		return res.status(201).json(result);
	} catch (err) {
		console.error(err);
		return res.status(500).send(err.message);
	}
};

UserService.userLogin = async (req,res) => {
	bodyValidate(req, res);
	try {
		const user = await UserModel.findOne({email:req.body.email})
		const token = UserService.generateJwt({ user_id: user._id, firstName: req.user.firstName });
		return res.status(200).json({
			user: req.user,
			token,
			message: "login successful!",
		});
	} catch (err) {
		// console.error(err);
		return res.status(500).json({ message: err.message });
	}
}  


UserService.adminRegister = async (req,res) => {
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
		
	}


module.exports.UserService = UserService;
