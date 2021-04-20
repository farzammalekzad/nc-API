const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const connectDB = require('./config/db');

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


// Set public Folder (set Static)
app.use(express.static(path.join(__dirname, 'public')));

// Set Routes
app.use('/nc',require('./routes/ncRoutes'));


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`NC Report server running on ${process.env.NODE_ENV} mode at port ${PORT}`);
})
