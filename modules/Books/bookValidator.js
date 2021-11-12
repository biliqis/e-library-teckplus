const { required } = require("joi");
const Joi = require("joi");

module.exports.createBookValidator = Joi.object().keys({
	bookTitle: Joi.string().required().error(new Error("Book is required")),
	authorName: Joi.string().required().error(new Error("Author's name is required")),
	numberOfBooksInStore:Joi.number().required().error(new Error("book store is required")),
	isbnNumber: Joi.number().required().error(new Error("Book number is required")),
	noOfCopies: Joi.string().required().error(new Error("Number of copies is required")),
	publishDate: Joi.date().required().error(new Error("Publish date address")),
	pricePerBook: Joi.number().required().error(new Error("price per book is required")),
	
});

module.exports.editUserValidator = Joi.object().keys({
	bookTitle: Joi.string().required().error(new Error("Book is required")),
	authorName: Joi.string().required().error(new Error("Author's name is required")),
	isbnNumber: Joi.number().required().error(new Error("Book number is required")),
	noOfCopies: Joi.string().required().error(new Error("Number of copies is required")),
	publishDate: Joi.date().required().error(new Error("Publish date address")),
	pricePerBook: Joi.number().required().error(new Error("price per book is required")),
});


