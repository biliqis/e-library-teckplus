
const { body, params, query } = require('express-validator');
const { deleteUser } = require('./userController');

class userValidation {
//LOGIN VALIDATION
    static login() {
        return [
            body('email')
                .isString()
                .notEmpty()
                .withMessage('Email is required')
                .isEmail()
                .withMessage('Must be a valid email address'),
            body('password')
                .isLength({ min: 5 })
            .withMessage('Password is required')
                .isString()
                .notEmpty(),
                
        ]
    }

    //SIGN-UP VALIDATION
    static SignUp() {
        return [
            body('firstName')
                .isString()
                .notEmpty()
                .withMessage('required'),
            body('lastName')
                .isString()
                .notEmpty()
                .withMessage('required'),
            body('phonenumber')
                .isString()
                .notEmpty()
                .withMessage('required'),
            body('password')
                .isString()
                .isLength({ min: 5 })
                .withMessage('must be at least 5 chars long')
                .notEmpty(),
            body('email')
                .isString()
                .notEmpty()
                .withMessage('required'),

        ]

    }
    //UPDATE USER VALIDATION

    static updateUser() {
        return [
            body('firstName')
                .isString()
                .notEmpty()
                .withMessage('optional'),

            body('lastName')
                .isString()
                .notEmpty()
                .withMessage('optional'),

            body('phonenumber')
                .isString()
                .notEmpty()
                .withMessage('optional'),


            body('password')
                .isString()
                .notEmpty()
                .isLength({ min: 8 })
                .withMessage('optional'),


            body('email')
                .isString()
                .notEmpty()
                .withMessage('optional'),

            body('age')
                .isString()
                .notEmpty()
                .withMessage('optional'),


        ]

    }

    static deleteUser() {
        return [
            query('user_id')
            
        ]
    }


}





module.exports = userValidation;

