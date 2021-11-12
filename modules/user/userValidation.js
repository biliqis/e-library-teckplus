
// const { body, params, query } = require('express-validator');
// const { deleteUser } = require('./userController');

// class userValidation {
//     //LOGIN VALIDATION
//     static login() {
//         return [
//             body('email')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('Email is required')
//                 .isEmail()
//                 .withMessage('Must be a valid email address'),


//             body('password')
//                 .isLength({ min: 5 })
//                 .withMessage('Password is required')
//                 .isString()
//                 .notEmpty(),

//         ]
//     }

//     //SIGN-UP VALIDATION
//     static SignUp() {
//         return [
//             body('firstName')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('firstName is required'),
//             body('lastName')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('lastName is required'),
//             body('phonenumber')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('phonenumber is required'),
//             body('password')
//                 .isString()
//                 .isLength({ min: 5 })
//                 .withMessage('must be at least 5 chars long')
//                 .notEmpty(),
                

//             body('email')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('email is required'),
                

//                 body('roles')
//                 .isIn(["admin", "user"])
//                 .isString()
//                 .notEmpty()
//                 .withMessage('required'),

//         ]
//     }
//     //UPDATE USER VALIDATION

//     static updateUser() {
//         return [
//             body('firstName')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('optional'),

//             body('lastName')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('optional'),

//             body('phonenumber')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('optional'),


//             body('password')
//                 .isString()
//                 .notEmpty()
//                 .isLength({ min: 8 })
//                 .withMessage('optional'),


//             body('email')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('optional'),

//             body('age')
//                 .isString()
//                 .notEmpty()
//                 .withMessage('optional'),
//         ]

//     }

//     static deleteUser() {
//         return [
//             query('user_id')
//         ]
//     }
// }
// module.exports = userValidation;



  
const Joi = require("joi");

const UserValidator = {};

UserValidator.createUserValidator = Joi.object().keys({
	username: Joi.string().alphanum().trim().required().messages({
		'string.base': `"username" should be a type of 'text'`,
		'any.required': `"username" is a required field`,
	}),

	firstName: Joi.string().trim().required().messages({
		'string.base': `"firstName" should be a type of 'text'`,
		'any.required': `"firstName" is a required field`,
	}),

	lastName: Joi.string().trim().required().messages({
		'string.base': `"lastName" should be a type of 'text'`,
		'any.required': `"lastName" is a required field`,
	}),

	role: Joi.string().trim().required().valid("admin", "user").messages({
		'string.base': `"role" should be a type of 'text'`,
		'any.required': `"role" is a required field`,
	}),

	phoneNumber: Joi.string().trim().required().messages({
		'string.base': `"phoneNumber" should be a type of 'text'`,
		'any.required': `"phoneNumber" is a required field`,
	}),

	email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
		'string.base': `"email" should be a type of 'email'`,
		'any.required': `"email" is a required field`,
	}),

	address: Joi.string().trim().required().messages({
		'string.base': `"address" should be a type of 'text'`,
		'any.required': `"address" is a required field`,
	}),

	password: Joi.string().trim().required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'any.required': `"password" is a required field`,
	}),

});

UserValidator.loginUserValidator = Joi.object().keys({
	username: Joi.string().trim().optional().messages({
		'string.base': `"username" should be a type of 'text'`,
		'any.required': `"username" is a required field`,
	}),

	email: Joi.string().trim().optional().messages({
		'string.base': `"username" should be a type of 'text'`,
		'any.required': `"username" is a required field`,
	}),

	password: Joi.string().trim().required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'any.required': `"password" is a required field`,
	}),
});

UserValidator.editUserValidator = Joi.object().keys({
	username: Joi.string().trim().required().messages({
		'string.base': `"username" should be a type of 'text'`,
		'any.required': `"username" is a required field`,
	}),

	firstName: Joi.string().trim().required().messages({
		'string.base': `"firstName" should be a type of 'text'`,
		'any.required': `"firstName" is a required field`,
	}),

	lastName: Joi.string().trim().required().messages({
		'string.base': `"lastName" should be a type of 'text'`,
		'any.required': `"lastName" is a required field`,
	}),

	role: Joi.string().trim().required().valid("admin", "user").messages({
		'string.base': `"role" should be a type of 'text'`,
		'any.required': `"role" is a required field`,
	}),

	phoneNumber: Joi.string().trim().required().messages({
		'string.base': `"phoneNumber" should be a type of 'text'`,
		'any.required': `"phoneNumber" is a required field`,
	}),

	email: Joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
		'string.base': `"email" should be a type of 'email'`,
		'any.required': `"email" is a required field`,
	}),

	address: Joi.string().trim().required().messages({
		'string.base': `"address" should be a type of 'text'`,
		'any.required': `"address" is a required field`,
	}),
	
	password: Joi.string().trim().required().messages({
		'string.base': `"password" should be a type of 'text'`,
		'any.required': `"password" is a required field`,
	}),
});

module.exports = { UserValidator }

