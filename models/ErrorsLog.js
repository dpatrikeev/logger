const mongoose = require('mongoose');

const errorsLogSchema = new mongoose.Schema({
    user: String,
    error: String,
    date: Date,
});

module.exports = mongoose.model('ErrorsLog', errorsLogSchema);
