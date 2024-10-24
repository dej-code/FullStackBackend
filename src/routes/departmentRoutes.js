const express = require("express");
const {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../controllers/departmentController");
const { authenticateToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getDepartments);
router.get("/:id", getDepartmentById);
router.post("/", authenticateToken, createDepartment);
router.put("/:id", authenticateToken, updateDepartment);
router.delete("/:id", authenticateToken, deleteDepartment);

module.exports = router;
