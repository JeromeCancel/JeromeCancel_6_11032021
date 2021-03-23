// VARIABLES FOR REQUIEREMENTS //
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const verifyPassword = require('../middlewares/password');

const rateLimit = require("express-rate-limit");

// CONFIGURE THE RATE-LIMIT //
const limiter = rateLimit({
    windowMs: 3 * 60 * 1000, // 3 minutes
    max: 3, // limit each IP to 3 requests per windowMs
    message: "too much abusive request, wait 3 minutes",
});

// CREATE ROUTES FOR AUTENTIFICATION, ADD verifyPassword FOR SIGNUP AND limiter TO THE LOGIN ROUTE //
router.post('/signup', verifyPassword, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

// EXPORT ROUTES //
module.exports = router;