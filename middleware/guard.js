module.exports.useGuard = (guard) => {
	return async (req, res, next) => {
		try {
			await guard(req);
			
		} catch (e) {
			// TODO: CUSTOMIZE TO YOUR NEED LATER
			console.error(e.message)
			return res.status(400).json({ message: e.message });
		}
		next()
	};
};
