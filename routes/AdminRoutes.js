const express = require('express');
const { protect, admin } = require('../middleware/authMiddleware.js');
const { createAdmin, getAllAdmins, getAdminById, editAdmin, deleteAdmin } = require('../controllers/adminController.js');

const router = express.Router();

router.post('/add',  createAdmin);

router.get('/', protect, admin, getAllAdmins);

router.get('/:id', protect, admin, getAdminById);

router.put('/:id', protect, admin, editAdmin);

router.delete('/:id', protect, admin, deleteAdmin);

module.exports = router;