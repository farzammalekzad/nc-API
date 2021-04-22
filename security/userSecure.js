const Yup = require('yup');



const userSchema = Yup.object().shape({
    fullname: Yup.string().required().min(6).max(255),
    email: Yup.string().email().required(),
    password: Yup.string().required().min(4).max(255),
    confirmPassword: Yup.string().required().oneOf([Yup.ref('password'), null]).max(255),
    createdAt: Yup.date().max(255)
});

module.exports = userSchema;

