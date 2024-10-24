const jwt = require("jsonwebtoken");
const prisma = require("../../prisma");
const JWT_SECRET = process.env.JWT_SECRET;
const express = require("express");
const router = express.Router();

function createToken(id) {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
}

router.use(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.slice(7);
  if (!token) return next();
  console.log(token);
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUniqueOrThrow({ where: { id } });
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
});

function authenticateToken(req, res, next) {
  if (req.user) {
    next();
  } else {
    next({ status: 401, message: "You must be logged in." });
  }
}

module.exports = {
  authenticateToken,
  createToken,
  router,
};
