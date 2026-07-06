const express = require('express');
const multer = require('multer');
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');

const router = express.Router();

// Multer config for parsing multipart/form-data and keeping file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.route('/')
  .get(getMenuItems)
  .post(upload.single('image'), createMenuItem); // TODO: Add adminMiddleware

router.route('/:id')
  .get(getMenuItemById)
  .put(upload.single('image'), updateMenuItem) // TODO: Add adminMiddleware
  .delete(deleteMenuItem); // TODO: Add adminMiddleware

module.exports = router;
