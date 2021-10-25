const mongoose = require("mongoose");

module.exports.dbConnect = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		await mongoose.connect(process.env.DB_URI, connectionParams);
		console.log("Connected to DB");
	} catch (error) {
		// TODO: ADD A LOGGER TO LOG THE CONNECTION ERROR
		console.error(error.message);
	}
};
