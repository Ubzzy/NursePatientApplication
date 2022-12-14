const User = require("../models/User");
const jwt = require("jsonwebtoken");
module.exports.authorization = async function (req, res, next) {
    
    try {
        if (req.headers.authorization) {
            let token = req.headers.authorization.split(" ")[1];
            let val = jwt.decode(token, {});
            
            const user = await User.findById(val._id).exec();
            if (!user) {
                return res.status(500).send("User does not exists.");
            }
            req.user = user;
            next();
        } else {
            next();
            // return res.status(500).send("Not authorized!");
        }
    } catch (e) {
        console.log(e)
        return res.status(400).send("Not authorized!");
    }

};