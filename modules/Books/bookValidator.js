const Joi = require("joi");

booksValidator = {};


booksValidator.createBookValidator = Joi.object().keys({
	bookTitle: Joi.string().required().error(new Error("Book is required")),
	authorName: Joi.string().required().error(new Error("Author's name is required")),
	isbnNumber: Joi.number().required().error(new Error("Book number is required")),
	noOfCopies: Joi.number().required().error(new Error("Number of copies is required")),
//publishDate: Joi.date().required().error(new Error("Publish date address")),
	pricePerBook: Joi.number().required().error(new Error("price per book is required")),
	isAvailable:Joi.boolean().required().error(new Error("isAvailable field is required")),
	description:Joi.string().required().error(new Error("description field is required")),
	
	availableCopies: Joi.number().default(Joi.ref('noOfCopies')).min(0).optional().messages({
		"string.base": `"No of copies" should be of type 'number'`,
		"string.empty": `"Phone number" cannot be an empty field`,
	  }),
});

borrowedCopies: Joi.number().default(0).min(0).optional().messages({
    "string.base": `"Borrowed copies" should be of type 'number'`,
    "string.empty": `"Borrowed copies" cannot be an empty field`,
  }),

booksValidator.editUserValidator = Joi.object().keys({
	bookTitle: Joi.string().required().error(new Error("Book is required")),
	authorName: Joi.string().required().error(new Error("Author's name is required")),
	isbnNumber: Joi.number().required().error(new Error("Book number is required")),
	noOfCopies: Joi.string().required().error(new Error("Number of copies is required")),
	publishDate: Joi.date().required().error(new Error("Publish date address")),
	pricePerBook: Joi.number().required().error(new Error("price per book is required")),
	description:Joi.string().required().error(new Error("description field is required")),
	isAvailable:Joi.boolean().required().error(new Error("isAvailable field is required")),
});

module.exports = {booksValidator}


