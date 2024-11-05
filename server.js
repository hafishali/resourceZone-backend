const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
const adminRoutes = require('./routes/AdminRoutes.js');
const AdminJobsRoutes = require('./routes/AdminJobsRoutes.js');
const UserJobs = require('./routes/UserJobsRoutes.js');

const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

// adminRoutes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/admin-jobs', AdminJobsRoutes);

app.use('/documents',express.static('./documents'))

// userRoutes
app.use('/user-jobs', UserJobs);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
