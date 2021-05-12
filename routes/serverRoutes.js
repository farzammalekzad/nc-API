const express = require('express');

const Server = require('../model/server');
const authenticate = require('../config/passport');

const routes = express.Router();

routes.get('/', (req, res, next) => {
    Server.find()
        .then((servers) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(servers);
        }).catch((err) => {
            console.log(err);
    })
});

routes.post( '/', authenticate.verifyUser, (req, res, next) => {
    Server.create(req.body)
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(data);
        }).catch((err) => {
        console.log(err);
    });
});

routes.get('/:serverId', (req, res, next) => {
    Server.findById(req.params.serverId)
        .then((server) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(server);
        }).catch((err) => {
        console.log(err);
    });
});

routes.delete( '/:serverId', authenticate.verifyUser, (req, res, next) => {
    Server.findByIdAndRemove(req.params.serverId)
        .then((data) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({status: 'success'});
            }
        ).catch(err => {
            console.log(err);
    });
});




module.exports = routes;
