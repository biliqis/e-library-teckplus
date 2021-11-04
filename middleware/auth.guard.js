const jwt = require("jsonwebtoken");
const User = require("../modules/user/userModel");

const requireAuth = async (req, res, next) => {
		
	try {
		const auth = req.headers["authorization"];
		if (auth) {
			let token = auth.split("Bearer")[1].trim();
			const decoded = jwt.verify(token, process.env.JWT_SECRET);
			console.log(decoded, "just finish splitting the token ---------");
			const currentUser = await User.findById(req.params.id)
			if (!currentUser) {
				return res.status(401).json({ message: "logged out" });
			}
			next();
		} else res.send({ message: "invalidToken!" });
	} catch (error) {
		res.send({ message: "invalidToken!" });
	}
};

// check current user
const checkUser = async (req, res, next) => {
	const token = req.cookies.jwt;
	if (token) {
		jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
			if (err) {
				res.locals.user = null;
				next();
			} else {
				let user = await User.findById(decodedToken.id);
				res.locals.user = user;
				next();
			}
		});
	} else {
		res.locals.user = null;
		next();
	}
};
module.exports = { requireAuth, checkUser };


