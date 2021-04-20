const mongoose = require('mongoose');

const ncSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    imageUrl: {
        type: String,
        required: false,
        default: ''
    },
    description: {
        type: String,
        required: false
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    severity: {
        type: String,
        required: true
    },
    sphere: {
        type: String,
        required: true
    },
    reference: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Nc = mongoose.model('Nc', ncSchema);

module.exports = Nc;
