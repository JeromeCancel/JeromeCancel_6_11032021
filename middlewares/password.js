// VARIABLES FOR REQUIEREMENTS //
const passSchema = require("../models/password");

// LOGIC FOR THE PASSWORD VALIDATION //
module.exports = (req, res, next) => {
    if(!passSchema.validate(req.body.password)) {
        return res.status(400).json({
            error: "The password need to have at least 8 characters (min 1 in uppercase and no space) !"
        })
    } else { 
        next(); 
    }
};