const Testimonial = require('../models/Testimonial');
const imagekit = require('../config/imagekit');

// @desc    Get testimonials
// @route   GET /api/testimonials
// @access  Public
const getTestimonials = async (req, res, next) => {
  try {
    const { featured } = req.query;
    let query = {};
    if (featured === 'true') {
      query.isFeatured = true;
    }
    const testimonials = await Testimonial.find(query).sort('-createdAt');
    res.json(testimonials);
  } catch (error) {
    next(error);
  }
};

// @desc    Add testimonial
// @route   POST /api/testimonials
// @access  Private/Admin
const createTestimonial = async (req, res, next) => {
  try {
    const { guestName, rating, quote, isFeatured } = req.body;
    let photoUrl = '';

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/yummy/testimonials'
      });
      photoUrl = result.url;
    }

    const testimonial = await Testimonial.create({
      guestName,
      rating,
      quote,
      isFeatured: isFeatured === 'true' || isFeatured === true,
      photo: photoUrl
    });

    res.status(201).json(testimonial);
  } catch (error) {
    next(error);
  }
};

// @desc    Update testimonial
// @route   PUT /api/testimonials/:id
// @access  Private/Admin
const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }

    const { guestName, rating, quote, isFeatured } = req.body;
    
    if (guestName) testimonial.guestName = guestName;
    if (rating) testimonial.rating = rating;
    if (quote) testimonial.quote = quote;
    if (isFeatured !== undefined) testimonial.isFeatured = isFeatured === 'true' || isFeatured === true;

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/yummy/testimonials'
      });
      testimonial.photo = result.url;
    }

    await testimonial.save();
    res.json(testimonial);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete testimonial
// @route   DELETE /api/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ message: 'Testimonial not found' });
    }
    res.json({ message: 'Testimonial removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
