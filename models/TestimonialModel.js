const mongoose = require('mongoose')

const testmonialSchema = new mongoose.Schema({
    Name: { type: String, require: [true, 'Name is required'] },
    company: { type: String },
    image: { type: String },
    description: { type: String, require: [true, 'Description is required'] },

},
    { timestamps: true })

module.exports =Testimonials=mongoose.model('Testimonials',testmonialSchema)

