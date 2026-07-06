const express = require('express');
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(createCategory); // TODO: Add adminMiddleware

router.route('/:id')
  .put(updateCategory) // TODO: Add adminMiddleware
  .delete(deleteCategory); // TODO: Add adminMiddleware

module.exports = router;
