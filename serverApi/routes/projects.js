"use srrict";
const express = require("express");
const router = express.Router({ mergeParams: true, caseSensitive: false });
const {
  getAllProjects,
  getOneProject,
  createProject,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/projects");

router.get("/projects", getAllProjects);
router.post("/projects", createProject);
router.patch("/projects/:id", updateProjectById);
router.delete("/projects/:id", deleteProjectById)

module.exports = router;
