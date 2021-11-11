require("dotenv").config();
const { dbConnect } = require("./db");

const express = require("express");
const routes = require("./routes");
const logger = require("loglevel")
const morgan = require("morgan")
const app = express();
//connection();
app.use(express.json());
app.use(morgan("dev"))
app.use(routes);
const port = process.env.PORT || 8080;
async function bootstrap() {
	try {
		await dbConnect();

		app.listen(port, () => {
			console.log(`now listening for requests on port ${port}...`);
		});

	} catch (e) {
		logger.warn("an error occurred while starting the server")
		logger.error(e.message)
		process.exit(1);
	}

}
bootstrap();
<<<<<<< HEAD
/***
	TODO: Implement global error handler. make reference to paul's code 
	Implement customer Error class. make reference to paul's code 
 */
//TODO: refactoring
/**
 * 1. use layered architecture
 * 	 - service layer
 *   - models layer
 *   - controller layer
 *   - parameters validation layer
 *   - database validation layer
 *
 *
 * 2. a very simple approach to dependency injection
 *
 * 3. versioning your apis : COMPELTED
 *    - host/v1/endpoint
 *    - host/v2/endpoint2
 *
 * 4. create a bootstrap entry : COMPELTED
 *
 */
=======


>>>>>>> 99f9f7645d011735f7501f8bfa85cf7da588601d
