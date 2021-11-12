const Joi = require("joi");

module.exports.bookBorrowingValidator = Joi.object().keys({
    bookTitles: Joi.string().required().error(new Error("Book title  is required")),
    numberOfBooksToBeBorrowed: Joi.number().required().error(new Error("number of Books to be Borrowed is required")),
    borrowDate: Joi.date().required().error(new Error("borrow date is required")),
    returnDate: Joi.date().required().error(new Error("return date is required")),
    numberOfDays: Joi.number().required().error(new Error("number of Books to be Borrowed is required")),
    
})