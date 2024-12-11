const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/TestimonialController.js');
const multerconfig = require('../middleware/multerConfig.js')
const { protect, admin } = require('../middleware/authMiddleware.js'); 

router.post('/create',protect,admin,multerconfig.single('image'),TestimonialController.createTestimonials)

router.get('/view',TestimonialController.getAllTestimonials)

router.patch('/update/:id',protect,admin,multerconfig.single('image'),TestimonialController.updateTestimonials)

router.delete('/delete/:id',protect,admin,TestimonialController.deleteTestimonials)

module.exports=router