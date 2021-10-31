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
};
