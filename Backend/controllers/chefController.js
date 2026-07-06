const Chef = require('../models/Chef');
const imagekit = require('../config/imagekit');

// @desc    Get all chefs
// @route   GET /api/chefs
// @access  Public
const getChefs = async (req, res, next) => {
  try {
    const chefs = await Chef.find();
    res.json(chefs);
  } catch (error) {
    next(error);
  }
};

// @desc    Add chef
// @route   POST /api/chefs
// @access  Private/Admin
const createChef = async (req, res, next) => {
  try {
    const { name, role, bio, instagram, linkedin } = req.body;
    let photoUrl = '';

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/yummy/chefs'
      });
      photoUrl = result.url;
    }

    const chef = await Chef.create({
      name,
      role,
      bio,
      socials: { instagram, linkedin },
      photo: photoUrl
    });

    res.status(201).json(chef);
  } catch (error) {
    next(error);
  }
};

// @desc    Update chef
// @route   PUT /api/chefs/:id
// @access  Private/Admin
const updateChef = async (req, res, next) => {
  try {
    const chef = await Chef.findById(req.params.id);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }

    const { name, role, bio, instagram, linkedin } = req.body;
    
    if (name) chef.name = name;
    if (role) chef.role = role;
    if (bio) chef.bio = bio;
    if (instagram !== undefined) chef.socials.instagram = instagram;
    if (linkedin !== undefined) chef.socials.linkedin = linkedin;

    if (req.file) {
      const result = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: '/yummy/chefs'
      });
      chef.photo = result.url;
    }

    await chef.save();
    res.json(chef);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete chef
// @route   DELETE /api/chefs/:id
// @access  Private/Admin
const deleteChef = async (req, res, next) => {
  try {
    const chef = await Chef.findByIdAndDelete(req.params.id);
    if (!chef) {
      return res.status(404).json({ message: 'Chef not found' });
    }
    res.json({ message: 'Chef removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getChefs,
  createChef,
  updateChef,
  deleteChef
};
