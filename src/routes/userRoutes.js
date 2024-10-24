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
  authenticateToken,
} = require("../middleware/authMiddleware");
const validateInputs = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateInputs,
  loginUser
);
router.post("/register", async (req, res, next) => {
  const { email, password, } = req.body;


  try {
    const user = await prisma.user.register(email, password);
    const token = createToken(user.id);
    res.status(201).json({ token });
  } catch (e) {
    next(e);
  }
});
router.get("/:id", authenticateToken, getUserById);

module.exports = router;
