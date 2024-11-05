const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin.js');

const protect = async (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const id = decoded.user ? decoded.user.id : decoded.id;
            let user = await Admin.findById(id).select('-password');
            if (!user) {
                user = await Employee.findById(id).select('-password');
            }

            if (!user) {
                return res.status(404).json({ message: 'User not found / Unauthorized Access' });
            }
            req.user = user;
            next();
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Session expired, please log in again' });
            } else {
                return res.status(401).json({ message: 'Not authorized, token failed' });
            }
        }
    } else {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Login a user
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Admin.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid Credentials, Email not found' });
        }

        const isPasswordCorrect = await user.matchPassword(password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid Credentials, Password Not Matched' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role === 'admin',
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Validate token
const validateToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ isValid: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ decoded });
    } catch (error) {
        res.status(401).json({ isValid: false });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Not authorized as admin' });
    }
};

module.exports = {
    protect,
    loginAdmin, 
    validateToken,
    admin,
};
