const express = require('express');
const router = express.Router();
const jobController = require('../controllers/AdminJobController.js');
const userController=require('../controllers/userController.js')
const multerconfig = require('../middleware/multerConfig.js')
const { protect, admin } = require('../middleware/authMiddleware.js'); 


router.get('/', jobController.getAllJobs);

router.get('/:id', jobController.getJob);

router.post('/submit',multerconfig.single('cv'),userController.addUserData)

router.get('/get/usersdts',protect,admin,userController.getAlluserData)




module.exports = router;