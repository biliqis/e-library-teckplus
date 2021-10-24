const jwt = require('jsonwebtoken');
const User = require('../models/userModel')
const requireAuth = async (req, res, next) => {
    //const token = req.headers.jwt;

    // // check json web token exists & is verified
    // if (token) {
    //     jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    //         if (err) {
    //             console.error(err.message);
    //             res.send({ "message": err.message, "error": "unauthorized!" })
    //         } else {
    //             console.log(decodedToken);
    //             res.send({ "message": decodedToken })
    //             next();
    //         }
    //     });
    // } else {
    //    
    // }
try {
    const auth = (req.headers["authorization"])
    if (auth) {
        token = auth.split('Bearer')[1].trim()
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded)
        const currentUser = await User.findOne({ _id: decoded.id }).select("+password");
        if (!currentUser) {
            return res.status(401).json({ message: "User has been logged out" });
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

// const requireAdminAuth = (req, res, next) => {
//     const token = req.headers.jwt;

//     // check json web token exists 
//     if (token) {
//         jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
//             if (err) {
//                 console.error(err.message);
//                 res.send({ "message": err.message, "error": "unauthorized!" })
//             } else {
//                 console.log(decodedToken);
//                 // check if the decoded token has a roles property i.e is an admin
//                 let checkAdmin = await User.findOne({ userType: decodedToken.roles })
//                 if (!checkAdmin === "ADMIN") return res.status(401).send({ message: "you are unauthorized to view this resource" })
//                 res.send({ "message": decodedToken })
//                 next();
//             }
//         });
//     } else {
//         res.send({ "message": "invalidToken!" })
//     }
// };

