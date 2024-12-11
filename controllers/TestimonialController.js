const Testimonials = require('../models/TestimonialModel');
const fs = require('fs');
const path = require('path');

// Create Testimonial
exports.createTestimonials = async (req, res) => {
    const { description,company, Name } = req.body;

    let image = null;
    if (req.file) {
        image = req.file.filename;
    }

    try {
        const newTestimonial = new Testimonials({
            Name,
            company,
            image, 
            description,
        });
        await newTestimonial.save();
        res.status(201).json({ message: 'Testimonial Created Successfully', newTestimonial });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
        console.log(error)
        
    }
};

// Get All Testimonials
exports.getAllTestimonials = async (req, res) => {
    try {
        const AllTestimonials = await Testimonials.find();
        res.status(200).json(  AllTestimonials );
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

// Update Testimonial 
exports.updateTestimonials = async (req, res) => {
    const { id } = req.params;
    const { description, company, Name } = req.body;

    // Declare image variable and conditionally assign
    let image;
    if (req.file) {
        image = req.file.filename;
    }

    try {
        // Find the testimonial by ID
        const testimonial = await Testimonials.findById(id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        // Update testimonial fields
        testimonial.Name = Name || testimonial.Name;
        testimonial.company = company || testimonial.company;
        testimonial.description = description || testimonial.description;

       
        if (req.file) {
            // delete the old image
            const oldImagePath = `./documents/${testimonial.image};`
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
            }

            // set the new image filename
            testimonial.image = req.file.filename;
        }
        // Save the updated testimonial
        await testimonial.save();
        res.status(200).json({ message: 'Testimonial Updated Successfully', testimonial });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
        console.log(error)
    }
};




exports.deleteTestimonials = async (req, res) => {
    const { id } = req.params;

    try {
        // Find testimonial by ID
        const testimonial = await Testimonials.findById(id);

        if (!testimonial) {
            return res.status(404).json({ message: 'Testimonial not found' });
        }

        // Delete image from the file system (if it exists)
        if (testimonial.image) {
            const imagePath =`./documents/${testimonial.image};`;
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete testimonial from the database
        const deletedTestimonial=await Testimonials.findByIdAndDelete(id)

        res.status(200).json({ message: 'Testimonial Deleted Successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error });
        console.error(error); // Log the error for debugging purposes
    }
};

