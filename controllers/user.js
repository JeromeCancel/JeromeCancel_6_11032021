// VARIABLES FOR REQUIEREMENTS //
const bcrypt = require("bcrypt");
const User = require("../models/User");

const maskData = require('maskdata');
const jwt = require('jsonwebtoken');

const emailMaskOptions = {
  maskWith: "*",
  unmaskedStartCharactersBeforeAt: 1,
  unmaskedEndCharactersAfterAt: 1,
  maskAtTheRate: false,
};


// LOGIC ROUTE FOR SIGNUP //
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: maskData.maskEmail2(req.body.email, emailMaskOptions),
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'User created !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};

// LOGIC ROUTE FOR LOGIN //
exports.login = (req, res, next) => {
    User.findOne({ email: maskData.maskEmail2(req.body.email, emailMaskOptions)})
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'User not found !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Incorrect password !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};