const express = require('express');

const Nc = require('../model/nc');

const routes = express.Router();

routes.route('/')
    .get((req, res, next) => {
        Nc.find()
            .then((ncs) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ncs);
            }).catch((err) => {
                console.log(err);
        })
    })
    .post((req, res, next) => {
        Nc.create(req.body)
            .then((newNc) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(newNc);
            }).catch((err) => {
                console.log(err);
        })
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید');
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید');
    });
routes.route('/:ncId')
    .get((req, res, next) => {
        Nc.findById(req.params.ncId)
            .then((nc) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(nc);
            }).catch((err) => {
                console.log(err);
        })
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید');
        })
    .put((req, res, next) => {
        Nc.findByIdAndUpdate(req.params.ncId, {$set: req.body}, {new: true})
            .then((nc) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(nc);
            }).catch((err) => {
                console.log(err);
        });
    })
    .delete((req, res, next) => {
        Nc.findByIdAndRemove(req.params.ncId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }).catch((err) => {
                console.log(err);
        })
    });



module.exports = routes;
