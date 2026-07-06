const GalleryImage = require('../models/GalleryImage');
const imagekit = require('../config/imagekit');

// @desc    Get gallery images
// @route   GET /api/gallery
// @access  Public
const getGalleryImages = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category) {
      query.category = category;
    }
    const images = await GalleryImage.find(query).sort('-createdAt');
    res.json(images);
  } catch (error) {
    next(error);
  }
};

// @desc    Upload gallery image
// @route   POST /api/gallery
// @access  Private/Admin
const createGalleryImage = async (req, res, next) => {
  try {
    const { caption, category } = req.body;
    let imageUrl = '';

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const folderName = category ? category.toLowerCase() : 'uncategorized';
    const result = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: `/yummy/gallery/${folderName}`
    });
    
    imageUrl = result.url;

    const galleryImage = await GalleryImage.create({
      image: imageUrl,
      caption,
      category
    });

    res.status(201).json(galleryImage);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete gallery image
// @route   DELETE /api/gallery/:id
// @access  Private/Admin
const deleteGalleryImage = async (req, res, next) => {
  try {
    const galleryImage = await GalleryImage.findByIdAndDelete(req.params.id);
    if (!galleryImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.json({ message: 'Image removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage
};
