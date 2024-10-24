const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getFaculties = async (req, res) => {
  try {
    const faculties = await prisma.faculty.findMany({
      include: { department: true },
    });
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch faculties" });
  }
};

const getFacultyById = async (req, res) => {
  const { id } = req.params;
  try {
    const faculty = await prisma.faculty.findUnique({
      where: { id: +id },
      include: { department: true },
    });
    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }
    res.json(faculty);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch faculty" });
  }
};

const createFaculty = async (req, res) => {
  try {
    const { name, bio, email, contactInfo, departmentId } = req.body;
    const newFaculty = await prisma.faculty.create({
      data: { name, bio, email, contactInfo, departmentId },
    });
    res.status(201).json(newFaculty);
  } catch (error) {
    res.status(500).json({ error: "Failed to create faculty" });
  }
};

const updateFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    const { name, bio, email, contactInfo, departmentId } = req.body;
    const updatedFaculty = await prisma.faculty.update({
      where: { id: +id },
      data: { name, bio, email, contactInfo, departmentId },
    });
    res.json(updatedFaculty);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to update faculty" });
  }
};

const deleteFaculty = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.faculty.delete({
      where: { id: +id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete faculty" });
  }
};

module.exports = {
  getFaculties,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty,
};
