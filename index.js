require("dotenv").config();
const { dbConnect } = require("./db");
const express = require("express");

const app = express();
//connection();
app.use(express.json());

app.use("/user", require("./routes/userRoutes"));
const port = process.env.PORT || 8080;

async function bootstrap() {
	try {
		// connect to db
		await dbConnect();
		// connection to xyz

		app.listen(port, () => {
			console.log(`now listening for requests on port ${port}...`);
		});
		// listen on app
	} catch (e) {
		// TODO: LOG ERRORS IF THEY OCCUR
		process.exit(1);
	}
}
bootstrap();
