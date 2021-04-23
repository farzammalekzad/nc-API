const mongoose = require('mongoose');
const User = require('./user');

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
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Nc = mongoose.model('Nc', ncSchema);

module.exports = Nc;
