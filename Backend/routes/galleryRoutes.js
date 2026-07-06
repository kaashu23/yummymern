const express = require('express');
const multer = require('multer');
const {
  getGalleryImages,
  createGalleryImage,
  deleteGalleryImage
} = require('../controllers/galleryController');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getGalleryImages)
  .post(adminMiddleware, upload.single('image'), createGalleryImage);

router.route('/:id')
  .delete(adminMiddleware, deleteGalleryImage);

module.exports = router;
