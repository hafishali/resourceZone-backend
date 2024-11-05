const Job = require('../models/Job');

// Add a new job
exports.addJob = async (req, res) => {
    try {

        if (req.body.jobMode) {
            req.body.jobMode = req.body.jobMode.toUpperCase();
        }
        const newJob = new Job(req.body);
        await newJob.save();

        const { createdAt, updatedAt, ...jobWithoutTimestamps } = newJob.toObject();
        res.status(201).json({ message: 'Job created successfully', job: jobWithoutTimestamps });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create job', details: error.message });
    }
};

// Get one job by ID
exports.getJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)
            .select(`-createdAt -updatedAt`);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json( job );
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve job', details: error.message });
    }
};

// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
        const jobs = await Job.find()
            .select(`-createdAt -updatedAt`);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve jobs', details: error.message });
    }
};
// Edit an existing job
exports.editJob = async (req, res) => {
    try {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .select(`-createdAt -updatedAt`);
        if (!updatedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job updated successfully', job: updatedJob });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update job', details: error.message });
    }
};

// Delete a job
exports.deleteJob = async (req, res) => {
    try {
        
        const deletedJob = await Job.findByIdAndDelete(req.params.id)
            .select(`-createdAt -updatedAt`);;
        if (!deletedJob) {
            return res.status(404).json({ error: 'Job not found' });
        }
        res.status(200).json({ message: 'Job deleted successfully', job: deletedJob });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete job', details: error.message });
    }
};

