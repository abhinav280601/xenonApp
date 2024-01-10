const mongoose = require('mongoose');

// Define form detail schema
const formDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    carModelName: {
        type: String,
        required: true,
    },
    expectedPrice: {
        type: String,
        required: true,
    },
}, { timestamps: true });

// Create FormDetail model
const FormDetail = mongoose.model('FormDetail', formDetailSchema);

module.exports = FormDetail;
