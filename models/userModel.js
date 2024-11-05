const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name: String,
    email: String,
    job_position: String,
    cv: String,
    message: String
}, { 
    timestamps:true,
    collection: 'users' // Set the collection name explicitly here
});

module.exports = mongoose.model('User', userSchema);
