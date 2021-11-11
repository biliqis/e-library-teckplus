const { required } = require("joi");
const Joi = require("joi");

module.exports.createBookValidator = Joi.object().keys({
	bookTitle: Joi.string().required().error(new Error("Book is required")),
	authorName: Joi.string().required().error(new Error("Author's name is required")),
    //phoneNumber: Joi.string().required().error(new Error("Phone number is required")),
	sex: Joi.string().required().error(new Error("Author's sex is required")),
    country: Joi.string().required().error(new Error("Country is required")),
	isbnNumber: Joi.number().required().error(new Error("Book number is required")),
	noOfCopies: Joi.string().required().error(new Error("Number of copies is required")),
	publishDate: Joi.date().required().error(new Error("Publish date address")),
	address: Joi.string().required().error(new Error("Address is required")).error(new Error("address is required")),
	pricePerBook: Joi.number().required().error(new Error("price per book is required")),
	
});

module.exports.editUserValidator = Joi.object().keys({
	bookTitle: Joi.string().required().error(new Error("Book is required")),
	authorName: Joi.string().required().error(new Error("Author's name is required")),
    //phoneNumber: Joi.string().required().error(new Error("Phone number is required")),
	sex: Joi.string().required().error(new Error("Author's sex is required")),
    country: Joi.string().required().error(new Error("Country ID is required")),
	isbnNumber: Joi.number().required().error(new Error("Book number is required")),
	noOfCopies: Joi.string().required().error(new Error("Number of copies is required")),
	publishDate: Joi.date().required().error(new Error("Publish date address")),
	address: Joi.string().required().error(new Error("Address is required")).error(new Error("address is required")),
	pricePerBook: Joi.number().required().error(new Error("price per book is required")),
});