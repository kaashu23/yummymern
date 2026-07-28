const express = require('express');
const multer = require('multer');
const {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/menuController');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

// Multer config for parsing multipart/form-data and keeping file in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

router.route('/')
  .get(getMenuItems)
  .post(adminMiddleware, upload.single('image'), createMenuItem);

router.route('/:id')
  .get(getMenuItemById)
  .put(adminMiddleware, upload.single('image'), updateMenuItem)
  .delete(adminMiddleware, deleteMenuItem);

module.exports = router;
