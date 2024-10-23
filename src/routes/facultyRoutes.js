const express = require('express');
const {
  getFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} = require('../controllers/facultyController');

const router = express.Router();

router.get('/', getFaculties);
router.get('/:id', getFacultyById);
router.post('/', createFaculty);
router.put('/:id', updateFaculty);
router.delete('/:id', deleteFaculty);

module.exports = router;
