const express = require('express');
const {
  getTables,
  createTable,
  updateTable,
  deleteTable
} = require('../controllers/tableController');

const router = express.Router();

router.route('/')
  .get(getTables)
  .post(createTable); // TODO: Add adminMiddleware

router.route('/:id')
  .put(updateTable) // TODO: Add adminMiddleware
  .delete(deleteTable); // TODO: Add adminMiddleware

module.exports = router;
