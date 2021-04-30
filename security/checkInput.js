const Yup = require('yup');

const ncSchema = Yup.object().shape({
    title: Yup.string().required().min(6).max(255),
    description: Yup.string().max(255),
    location: Yup.string().required().max(255),
    severity: Yup.string().required().max(255),
    sphere: Yup.string().required().max(255),
    reference: Yup.string().required().max(255),
    status: Yup.boolean(),
});




module.exports = ncSchema;
