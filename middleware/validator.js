const User = require("../models/userModel");

module.exports.signUpValidator = async (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;
	if (!(firstName || lastName || email || password)) {
		res.status(400).send("All input is required");
	}

	const checkUser = await User.findOne({ email });
	if (checkUser) {
		return res.status(409).send("An account with this email already exists.");
	}
	next();
};
