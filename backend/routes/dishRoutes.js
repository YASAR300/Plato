const express = require('express');
const router = express.Router();
const { getAllDishes, togglePublished } = require('../controllers/dishController');
const { verifyToken } = require('../middleware/authMiddleware');

// All dish routes are protected
router.get('/', verifyToken, getAllDishes);
router.patch('/:dishId/toggle', verifyToken, togglePublished);

module.exports = router;
