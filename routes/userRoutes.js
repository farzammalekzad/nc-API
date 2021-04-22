const express = require('express');
const bcrypt = require('bcryptjs');

const User = require('../model/user');
const userSchema = require('../security/userSecure');

const routes = express.Router();

routes.route('/register')
    .post(async (req, res, next) => {
       try {
           const {fullname, email, password} = req.body;
           await userSchema.validate(req.body);
           const user = await User.findOne({email: req.body.email});
           if (user) {
               res.statusCode = 403;
               res.setHeader('Content-Type', 'application/json');
               res.json('ایمیل تکراری می باشد');
               return;
           }
           const hasedPass = await bcrypt.hash(req.body.password, 10);
           req.body.password = hasedPass;
           await User.create(req.body)
           res.statusCode = 200;
           res.setHeader('Content-Type', 'application/json');
           res.json(true);

       } catch (err) {
           res.statusCode = 403;
           res.setHeader('Content-Type', 'application/json');
           console.log(err);
           res.json('اطلاعات ورودی صحیح نمی باشد لطفا مجددا بررسی بفرمایید');
       }
    });





module.exports = routes;
