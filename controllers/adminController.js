const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

const createAdmin = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const lowerEmail = email.toLowerCase();
        const existingEmail = await Admin.findOne({ email: lowerEmail });
        if (existingEmail) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const existingUsername = await Admin.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        const newAdmin = new Admin({
            username,
            password: password,
            email: lowerEmail,
        })

        await newAdmin.save();

        const adminResponse = newAdmin.toObject();
        delete adminResponse.password;
        delete adminResponse.createdAt;
        delete adminResponse.updatedAt;

        res.status(201).json(adminResponse);
    } catch (error) {
        res.status(400).json({ message: 'Error creating admin: ' + error.message });
    }
};

// Get all admins
const getAllAdmins = async (req, res) => {
    try {
        const admins = await Admin.find().select('-password -createdAt -updatedAt');
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admins: ' + error.message });
    }
};

// Get a single admin by ID
const getAdminById = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findById(id).select('-password -createdAt -updatedAt');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching admin: ' + error.message });
    }
};

// Edit an existing admin
const editAdmin = async (req, res) => {
    const { id } = req.params;
    const { username, email, password } = req.body;

    try {
        const updateData = {};

        if (username) updateData.username = username;
        if (email) updateData.email = email.toLowerCase();
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }


        const admin = await Admin.findByIdAndUpdate(id, updateData, { new: true }).select('-password -createdAt -updatedAt');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin edited successfully', Admin: admin });
    } catch (error) {
        res.status(400).json({ message: 'Error updating admin: ' + error.message });
    }
};

const deleteAdmin = async (req, res) => {
    const { id } = req.params;

    try {
        const admin = await Admin.findByIdAndDelete(id).select('-password -createdAt -updatedAt');
        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully', Admin: admin });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin: ' + error.message });
    }
};

module.exports = {
    createAdmin,
    getAllAdmins,
    getAdminById,
    editAdmin,
    deleteAdmin
}
