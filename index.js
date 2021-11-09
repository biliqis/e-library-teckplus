require("dotenv").config();
const { dbConnect } = require("./db");
const nodeCron = require("node-cron")
const borrowedBooks = require('./modules/booksBorrowing/borrowingModel')
const { checkReturnDateExceeded } = require('./modules/booksBorrowing/borrowingService')
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


const checkDaysExceeded = async () => {
	try {
		let allBorrowedBooks = await borrowedBooks.find({})
		allBorrowedBooks.forEach(async (borrowed) => {
			// if (checkReturnDateExceeded(Date.now(), borrowed.returnDate)) send a mail
			if (!checkReturnDateExceeded(Date.now(), borrowed.returnDate)) {
				borrowed.returned = true
				borrowed.markModified("returned")
				await borrowed.save()
			}
		})
		console.log("job is running")
		return "job running"
		
	} catch (err) {
		console.error(err)
		throw new Error(err)
	}	

}


async function bootstrap() {
	try {
		await dbConnect();
		nodeCron.schedule("* * * * *",() => checkDaysExceeded())
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


