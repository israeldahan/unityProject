const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    userid: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    timestamp: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Customer', DataSchema);
