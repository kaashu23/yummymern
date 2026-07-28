const express = require('express');
const {
  getTables,
  createTable,
  updateTable,
  deleteTable
} = require('../controllers/tableController');

const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();

router.route('/')
  .get(getTables)
  .post(adminMiddleware, createTable);

router.route('/:id')
  .put(adminMiddleware, updateTable)
  .delete(adminMiddleware, deleteTable);

module.exports = router;
