const express = require('express');
const { loginUser, createUser, getUserById } = require('../controllers/userController');
const { body } = require('express-validator');
const authenticateToken = require('../middleware/authMiddleware');
const validateInputs = require('../middleware/validationMiddleware');

const router = express.Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateInputs,
  loginUser
);

router.post(
  '/register',
  authenticateToken,
  [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validateInputs,
  createUser
);

router.get('/:id', authenticateToken, getUserById);

module.exports = router;
