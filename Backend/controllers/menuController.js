const MenuItem = require('../models/MenuItem');
const imagekit = require('../config/imagekit');

// @desc    Get all menu items (search, filter, sort)
// @route   GET /api/menu
// @access  Public
const getMenuItems = async (req, res, next) => {
  try {
    const { search, category, sort, veg } = req.query;
    
    let query = {};
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Veg filter
    if (veg === 'true') {
      query.isVeg = true;
    }

    let mongooseQuery = MenuItem.find(query).populate('category', 'name slug');

    // Sort
    if (sort) {
      const sortArr = sort.split(',');
      const sortBy = sortArr.join(' ');
      mongooseQuery = mongooseQuery.sort(sortBy);
    } else {
      mongooseQuery = mongooseQuery.sort('-createdAt');
    }

    const items = await mongooseQuery;
    res.json(items);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single menu item detail
// @route   GET /api/menu/:id
// @access  Public
const getMenuItemById = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id)
      .populate('category', 'name slug')
      .populate('ratings');
      
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    res.json(item);
  } catch (error) {
    next(error);
  }
};

// @desc    Create menu item + ImageKit upload
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, category, categoryName, isAvailable, isVeg, isChefSpecial } = req.body;
    
    const menuItemData = {
      name,
      description,
      price,
      category,
      isAvailable: isAvailable === 'true' || isAvailable === true,
      isVeg: isVeg === 'true' || isVeg === true,
      isChefSpecial: isChefSpecial === 'true' || isChefSpecial === true,
      images: []
    };

    if (req.file) {
      const folderName = categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : 'uncategorized';
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `/yummy/menu/${folderName}`
      });
      menuItemData.images.push(result.url);
    }

    const item = await MenuItem.create(menuItemData);
    res.status(201).json(item);
  } catch (error) {
    next(error);
  }
};

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }

    const { name, description, price, category, categoryName, isAvailable, isVeg, isChefSpecial } = req.body;
    
    if (name) item.name = name;
    if (description !== undefined) item.description = description;
    if (price) item.price = price;
    if (category) item.category = category;
    if (isAvailable !== undefined) item.isAvailable = isAvailable === 'true' || isAvailable === true;
    if (isVeg !== undefined) item.isVeg = isVeg === 'true' || isVeg === true;
    if (isChefSpecial !== undefined) item.isChefSpecial = isChefSpecial === 'true' || isChefSpecial === true;

    if (req.file) {
      const folderName = categoryName ? categoryName.toLowerCase().replace(/\s+/g, '-') : 'uncategorized';
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: `/yummy/menu/${folderName}`
      });
      // For now, replacing images array or pushing to it. Let's replace the first image or add to it.
      // Assuming we just add it to images list
      item.images.push(result.url);
    }

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    res.json({ message: 'Menu item removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
};
