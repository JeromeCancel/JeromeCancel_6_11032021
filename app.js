// VARIABLES FOR REQUIEREMENTS //
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require("helmet");
const nocache = require("nocache");
const cookieSession = require("cookie-session");


require('dotenv').config();

const userRoutes = require('./routes/user');
const sauceRoutes = require("./routes/sauce");

const path = require('path');

// VARIABLE FOR MONGOOSE + CONNECTION AT THE DATABASE //
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_URI}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connection at MongoDB successful !'))
  .catch(() => console.log('Connection at MongoDB failed !'));

const app = express();

// METHOD CALL FOR HELMET //
app.use(helmet());

// METHOD MANAGEMNT CORS //
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// METHOD CALL FOR COOKIE-SESSION //
app.use(
  cookieSession({
    name: "session",
    secret: "s3CuR3T3",
    cookie: {
      secure: true,
      httpOnly: true,
      domain: "http://localhost:3000/",
    },
  })
);

// METHOD CALL FOR NOCACHE //
app.use(nocache());

// METHOD CALL FOR BODYPARSER //
app.use(bodyParser.json());

// METHOD CALL FOR ALL ROUTES //
app.use('/api/auth', userRoutes);
app.use("/api/sauces", sauceRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// EXPORT APP //
module.exports = app;