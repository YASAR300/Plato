const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');

// Public auth endpoints
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Protected auth endpoint
router.get('/me', verifyToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
