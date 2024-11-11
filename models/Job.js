const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({

    jobRole: { type: String, required: true,},
    reqId:{type: String, required: true,},
    country:{type: String, required: true,},
    location:{type: String, required: true,},
    post_date:{type:String,required:true},
    deadline_date:{type:String},
    status:{type:Boolean}


  

}, {
    timestamps: true
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
