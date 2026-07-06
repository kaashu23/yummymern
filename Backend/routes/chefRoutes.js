const express = require('express');
const multer = require('multer');
const {
  getChefs,
  createChef,
  updateChef,
  deleteChef
} = require('../controllers/chefController');
const { adminMiddleware } = require('../middleware/adminMiddleware');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.route('/')
  .get(getChefs)
  .post(adminMiddleware, upload.single('photo'), createChef);

router.route('/:id')
  .put(adminMiddleware, upload.single('photo'), updateChef)
  .delete(adminMiddleware, deleteChef);

module.exports = router;
