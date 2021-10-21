const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express(); 
app.use(cookieParser())
require("dotenv").config();
console.log(process.env.PORT)
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use('/user', require('./routes/userRoutes'));
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewURLParser: true,
    });
    console.log("Connected to DB");
  } catch (err) {
    console.error(err.message);
  }
};

connectDB();
app.listen(PORT, () => {
  console.log(`now listening for requests on port ${PORT}`);
});

