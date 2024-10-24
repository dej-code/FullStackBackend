const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const router = express.Router();

const getDepartments = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: { faculties: true },
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
};

const getDepartmentById = async (req, res) => {
  try {
    const department = await prisma.department.findUnique({
      where: { id: req.params.id },
      include: { faculties: true },
    });
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department" });
  }
};

const createDepartment = async (req, res) => {
  try {
    const { name, description, contactInfo } = req.body;
    const newDepartment = await prisma.department.create({
      data: { name, description, contactInfo },
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create department" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { name, description, contactInfo } = req.body;
    const { id } = req.params;
    const updatedDepartment = await prisma.department.update({
      where: { id: +id },
      data: { name, description, contactInfo },
    });
    res.json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: "Failed to update department" });
  }
};

const deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.department.delete({
      where: { id: +id },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete department" });
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};
