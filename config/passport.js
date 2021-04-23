const passport = require('passport');
const {Strategy} = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const User = require('../model/user');
const dotEnv = require('dotenv');

//config ENV
dotEnv.config({path: './config/config.env'});


let jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET ;

passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, {
                    message: "کاربری با این ایمیل ثبت نشده",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user); //req.user
            } else {
                return done(null, false, {
                    message: "نام کاربری یا کلمه عبور صحیح نمی باشد",
                });
            }
        } catch (err) {
            console.log(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

exports.getToken = (user) => {
    return jwt.sign(user, secretKey, {expiresIn: 20000});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        User.findOne({_id: jwt_payload._id}, (err, user) => {
            if (err) {
                return done(null, false, {message: "نام کاربری یا کلمه عبور صحیح نمی باشد"});
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false , {message: "نام کاربری یا کلمه عبور صحیح نمی باشد"});
            }
        });
    }));

exports.verifyUser = passport.authenticate('jwt', {session: false});
