const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    mimetype: String,
    size: Number,
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
