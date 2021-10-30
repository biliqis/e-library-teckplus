const jwt = require("jsonwebtoken");
const jwtSecretKey = process.env.JWT_SECRET;
const expiresIn = process.env.JWT_EXP
const bcrypt = require('bcryptjs')

module.exports.generateJwt = (userObj) => {
    return jwt.sign(
        userObj,
        jwtSecretKey,
        {
            expiresIn: process.env.JWT_EXP
        }

    )
}


module.exports.comparePassword = async (password, password2) => {
    return bcrypt.compare(password, password2)
}


