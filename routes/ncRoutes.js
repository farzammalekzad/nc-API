const express = require('express');

const Nc = require('../model/nc');
const ncSchema = require('../security/checkInput');
const authenticate = require('../config/passport');
const cors = require('../config/cors');

const routes = express.Router();

routes.route('/')

    .get( authenticate.verifyUser, (req, res, next) => {
       if (req.user.admin === true) {
           Nc.find()
               .then((ncs) => {
                   res.statusCode = 200;
                   res.setHeader('Content-Type', 'application/json');
                   res.json(ncs);
               }).catch((err) => {
               console.log(err);
           })
       }
       else {
           Nc.find({user: req.user.id})
               .then((ncs) => {
                   res.statusCode = 200;
                   res.setHeader('Content-Type', 'application/json');
                   res.json(ncs);
               }).catch((err) => {
               console.log(err);
           });
       }
    })
    .post(authenticate.verifyUser,(req, res, next) => {
        ncSchema.validate(req.body).then((resp) => {
            Nc.create({...req.body, user: req.user.id, date: Date.now()})
                .then((newNc) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(newNc);
                }).catch((err) => {
                console.log(err);
            })
            }).catch((err) => {
            console.log(err);
            res.statusCode = 403;
            res.setHeader('Content-Type', 'application/json');
            res.json({message: 'داده های ورودی مجددا بررسی و ارسال شود', status: 'failed'});
        });
    })
    .put( (req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    })
    .delete((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
    });
routes.route('/:ncId')

    .get(authenticate.verifyUser, (req, res, next) => {
        Nc.findById(req.params.ncId)
            .populate('user')
            .then((nc) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({nc, username: nc.user.fullname});
            }).catch((err) => {
                console.log(err);
        })
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
        })
    .put( (req, res, next) => {
        Nc.findByIdAndUpdate(req.params.ncId, {$set: req.body}, {new: true})
            .then((nc) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(nc);
            }).catch((err) => {
                console.log(err);
        });
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        if (req.user.admin === true) {
            Nc.findByIdAndRemove(req.params.ncId)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({status: 'success'});
                }).catch((err) => {
                console.log(err);
            })
        } else {
            res.statusCode = 403;
            res.json({message: 'مجاز به انجام این عملیات نمی باشید لطفا مجددا امتحان نکنید', status: 'failed'});
        }
    });



module.exports = routes;
