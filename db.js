const mongoose = require('mongoose')

const dbConnect = async () => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
        await mongoose.connect(process.env.DB_URI, connectionParams)
        console.log("Connected to DB");
        return "working"
    } catch (error) {
        console.error(error.message)
    }

}
module.exports = { dbConnect }
