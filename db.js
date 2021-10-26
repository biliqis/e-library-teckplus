const mongoose = require("mongoose");
//added the loglevel library
const logger = require("loglevel");

//resole and reject
module.exports.dbConnect = async () => {
	try {
		const connectionParams = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};
		await mongoose.connect(process.env.DB_URI, connectionParams);
		console.log("Connected to DB");
	} catch (error) {
		logger.warn("an error occurred while connecting to the database")
		logger.error(error.message)
		// TODO: ADD A LOGGER TO LOG THE CONNECTION ERROR
		console.error(error.message);
	}
};
