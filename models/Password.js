// VARIABLES FOR REQUIEREMENTS //
const passwordValidator = require("password-validator");

// LOGIC FOR PASSWORD SCHEMA //
const passSchema = new passwordValidator();

passSchema
.is().min(8)                                    // Minimum length 8
.is().max(50)                                   // Maximum length 50
.has().uppercase(1)                             // Must have min 1 uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(1)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values
 
// EXPORT PASSWORD SCHEMA //
module.exports = passSchema;