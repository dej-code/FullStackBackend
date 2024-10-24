const express = require("express");
const prisma = require("../../prisma/index");

const {
  loginUser,
  createUser,
  getUserById,
} = require("../controllers/userController");
const { body } = require("express-validator");
const {
  createToken,
} = require("../middleware/authMiddleware");
const validateInputs = require("../middleware/validationMiddleware");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.login(email, password);
    const token = createToken(user.id);
    res.json({ token });
  } catch (e) {
    next(e);
  }
});

router.post("/register", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.register(email, password);
    const token = createToken(user.id);
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
