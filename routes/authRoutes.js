const express = require('express');
const { validateToken, loginAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/login', loginAdmin);

router.post('/validateToken', validateToken);

module.exports = router;
