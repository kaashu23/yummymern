const express = require('express');
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(adminMiddleware, createCategory);

router.route('/:id')
  .get(getCategory)
  .put(adminMiddleware, updateCategory)
  .delete(adminMiddleware, deleteCategory);

module.exports = router;
