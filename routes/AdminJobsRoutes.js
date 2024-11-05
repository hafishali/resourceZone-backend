const express = require('express');
const router = express.Router();
const jobController = require('../controllers/AdminJobController.js');
const { protect, admin } = require('../middleware/authMiddleware.js');


router.post('/add', protect, admin, jobController.addJob);

router.get('/jobs', jobController.getAllJobs);

router.get('/jobs/:id', jobController.getJob);

router.patch('/jobs/edit/:id', protect, admin, jobController.editJob);

router.delete('/jobs/delete/:id', protect, admin, jobController.deleteJob);


module.exports = router;
