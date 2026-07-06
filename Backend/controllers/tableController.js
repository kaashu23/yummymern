const Table = require('../models/Table');

// @desc    Get all tables
// @route   GET /api/tables
// @access  Public (or Private depending on needs)
const getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort({ tableNumber: 1 });
    res.json(tables);
  } catch (error) {
    next(error);
  }
};

// @desc    Add a table
// @route   POST /api/tables
// @access  Private/Admin
const createTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity, location, isActive } = req.body;

    const tableExists = await Table.findOne({ tableNumber });
    if (tableExists) {
      return res.status(400).json({ message: 'Table number already exists' });
    }

    const table = await Table.create({
      tableNumber,
      capacity,
      location,
      isActive
    });

    res.status(201).json(table);
  } catch (error) {
    next(error);
  }
};

// @desc    Update a table
// @route   PUT /api/tables/:id
// @access  Private/Admin
const updateTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json(table);
  } catch (error) {
    next(error);
  }
};

// @desc    Remove a table
// @route   DELETE /api/tables/:id
// @access  Private/Admin
const deleteTable = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndDelete(req.params.id);

    if (!table) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json({ message: 'Table removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTables,
  createTable,
  updateTable,
  deleteTable
};
