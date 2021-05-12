const mongoose = require('mongoose');

const serverSchema = new mongoose.Schema({
    serverName: {
        type: String,
        required: true,
        trim: true
    },
    serverAddress: {
        type: String,
        required: true,
        trim: true
    }
});

const Server = mongoose.model('Server', serverSchema);

module.exports = Server;
