const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    First_Name: String,
    Last_Name: String,
    email: String,
    Phone_number: String,
    message: String
}, { 
    timestamps:true,
    collection: 'enquiries' // Set the collection name explicitly here
});

module.exports = mongoose.model('enquiries', enquirySchema);
