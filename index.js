require("dotenv").config();
const {dbConnect} = require('./db');
const express = require("express");


const app = express(); 
//connection();
app.use(express.json());

app.use('/library',require('./routes/userRoutes'))

dbConnect()


const port = process.env.PORT||8080;
app.listen(port, ()=> {
  console.log(`now listening for requests on port ${port}...`);
});
