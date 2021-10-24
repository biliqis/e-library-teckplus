const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const requireAuth = async (req, res, next) => {

    try {
        const auth = (req.headers["authorization"])
        if (auth) {
            token = auth.split('Bearer')[1].trim()
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decoded)
            const currentUser = await User.findOne({ _id: decoded.id }).select("+password");
            if (!currentUser) {
                return res.status(401).json({ message: "logged out" });
            }
            console.log(token)
            next()
        } else (
            res.send({ "message": "invalidToken!" })
        )
    } catch (error) {
        res.send({ "message": "invalidToken!" })
    }


};

// check current user
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                next();
            } else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
module.exports = { requireAuth, checkUser }



