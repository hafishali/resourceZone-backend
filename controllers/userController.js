const userdts = require('../models/userModel'); // Ensure this is correctly referenced
const userEnquiry=require('../models/userEnquiryModel')
const nodemailer = require('nodemailer');
const path = require('path');

require('dotenv').config();  


// Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure:true,
    host:'smtp.gmail.com',
    port:465,
    auth: {
        user:process.env.GMAIL,  
        pass:process.env.APP_PASSWORD 
    }
});
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
        const mailOptions = {
            from: `${email}`,
            to:process.env.GMAIL,  // Replace with the recipient's email address
            subject: `New Job Application -${Name}`,
            text: `You have a new job application:
                   Name: ${Name}
                   Email: ${email}
                   Job Position: ${job_position}
                   Message: ${message}`,
            attachments: [
                {
                    filename: path.basename(resume),
                    path: resume
                }
            ]
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send response after both saving and emailing
        return res.status(201).json({ message: 'Job created successfully and email sent', job: userWithoutTimestamps });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Failed to create job or send email', details: error.message });
    }
};
exports.addEnquiries = async (req, res) => {
    try {
        const { message, Phone_number, email, Last_Name,First_Name } = req.body;


        const newUser = new userEnquiry({
            First_Name,
            Last_Name,
            email,
            Phone_number,
            message
        });

        await newUser.save();
        const { createdAt, updatedAt, ...userWithoutTimestamps } = newUser.toObject();
        const mailOptions = {
            from: `${email}`,
            to: `${process.env.GMAIL}`,  // Replace with the recipient's email address
            subject: `New User Enquiry -${First_Name}`,
            text: `You have a User Enquiry:
                   Name: ${First_Name} ${Last_Name}
                   Email: ${email}
                   Phone Number: ${Phone_number}
                   Message: ${message}`,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        // Send response after both saving and emailing
        return res.status(201).json({ message: 'Job created successfully and email sent', job: userWithoutTimestamps });

    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: 'Failed to create job or send email', details: error.message });
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
exports.getAllEnquiries= async (req, res) => { 
    try {
        const allEnquiry= await userEnquiry.find().select('-createdAt -updatedAt');
        return res.status(200).json(allEnquiry);
    } catch (error) {
        return res.status(500).json({ error: 'Failed to retrieve users enquiry', details: error.message });
    }
};


