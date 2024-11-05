const userdts = require('../models/userModel'); // Ensure this is correctly referenced

exports.addUserData = async (req, res) => {
    try {
        const { message, job_position, email, Name } = req.body;

        const resume = req.file ? req.file.path : null;
        if (!resume) {
            return res.status(400).json({ error: 'CV file is required and must be a PDF.' });
        }

        const newUser = new userdts({
            Name,
            email,
            job_position,
            cv: resume,
            message
        });

        await newUser.save();
        const { createdAt, updatedAt, ...userWithoutTimestamps } = newUser.toObject();
        return res.status(201).json({ message: 'Job created successfully', job: userWithoutTimestamps });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to create job', details: error.message });
    }
};

exports.getAlluserData = async (req, res) => { 
    try {
        const allUsers = await userdts.find().select('-createdAt -updatedAt');
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve users', details: error.message });
    }
};
