module.exports.useGuard = (guard) => {
	return async (req, res, next) => {
		try {
			await guard(req);
			next()
		} catch (e) {
			// TODO: CUSTOMIZE TO YOUR NEED LATER
			return res.status(400).json({ message: e.message });
		}

	};
};
