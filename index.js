require("dotenv").config();
const { dbConnect } = require("./db");
const express = require("express");
const routes = require("./routes");
const logger = require("loglevel")
const morgan = require("morgan")
const cron =require ('node-cron')
const bodyParser = require('body-parser')
const bookModel = require ("./modules/Books/bookModel")


const app = express();
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());

const checkStock = async () => {
	const allBooks = await bookModel.find({})
	allBooks.forEach(async (book) => {
		if (book.noOfCopies === 0){
			book.isAvailable = false
		}
		await book.markModified("isAvailable")
		await book.save()
		
	});
	console.log("cron is running")
	return "book task is running"
}

cron.schedule('* * * * *', () => checkStock())

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