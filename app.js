const path = require('path');

const express = require('express');
const passport = require('passport');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors');

const connectDB = require('./config/db');

require('./config/passport');

//config ENV
dotEnv.config({path: './config/config.env'});

//config Database
connectDB();



const app = express()


//Logging Config (morgan)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//BodyParser config
app.use(bodyParser.json());

//View Engine
app.set('view engine', 'ejs');
app.set('views', 'views');

//session Config
app.use(
    session({
        secret: process.env.SECRET,
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
    })
);

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());

//CORS Policy
app.use(cors());

// Set public Folder (set Static)
app.use(express.static(path.join(__dirname, 'public')));

// Set Routes
app.use('/', require('./routes/index'));
app.use('/server', require('./routes/serverRoutes'));
app.use('/user', require('./routes/userRoutes'));
app.use('/nc',require('./routes/ncRoutes'));
app.use('/upload', require('./routes/imageRoutes'));


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`NC Report server running on ${process.env.NODE_ENV} mode at port ${PORT}`);
})
