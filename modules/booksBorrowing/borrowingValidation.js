const Joi = require("joi");
module.exports.bookBorrowingValidator = Joi.object().keys({
    bookTitles: Joi.array().required().error(new Error("Book title  is required")),
    numberOfBooksToBeBorrowed:Joi.number().required().error(new Error("number of Books to be Borrowed is required")),
   // noOfDays: Joi.number().required().error(new Error("numbers  of days is required")),
    borrowDate : Joi.date().required().error(new Error("borrow date is required")),
    returnDate: Joi.date().required().error(new Error("return date is required")),
    
})