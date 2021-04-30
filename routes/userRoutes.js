const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../model/user');
const userSchema = require('../security/userSecure');
const authenticate = require('../config/passport');
//const cors = require('../config/cors');

const routes = express.Router();

routes.route('/register')
    .post( async (req, res, next) => {
       try {
           await userSchema.validate(req.body);
           const user = await User.findOne({email: req.body.email});
           if (user) {
               res.statusCode = 403;
               res.setHeader('Content-Type', 'application/json');
               res.json({message: 'ایمیل تکراری می باشد', success: false});
               return;
           }
           const hasedPass = await bcrypt.hash(req.body.password, 10);
           req.body.password = hasedPass;
           await User.create(req.body)
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json({message: 'نام کاربری ایجاد شد', success: true});

       } catch (err) {
           res.statusCode = 403;
           res.setHeader('Content-Type', 'application/json');
           console.log(err);
           res.json({message: 'اطلاعات ورودی صحیح نمی باشد لطفا مجددا بررسی بفرمایید', success: false});
       }
    });

routes.get('/logout', (req, res, next) => {
    req.logout();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, message: 'خروج موفقیت آمیز بود'});
})

routes.post( '/login', passport.authenticate('local'), (req, res, next) => {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, message: 'شما با موفقیت وارد شدید' , userId: req.user._id, fullname: req.user.fullname, email: req.user.email, admin: req.user.admin});
});

routes.get('/checkJWTtoken', (req, res, next) => {
    passport.authenticate('jwt', {session: false}, (err, user, info) => {
        if (err)
            return next(err);

        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            return res.json({status: 'JWT invalid!', success: false, err: info});
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            return res.json({status: 'JWT valid!', success: true, user: user});

        }
    }) (req, res);
});

module.exports = routes;
