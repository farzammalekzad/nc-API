const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    console.log('server.js');
})




module.exports = routes;
