"use strict";
const { v4: uuidv4 } = require("uuid");
const Project = require("../models/Projects");

const getAllProjects = async (req, res, next) => {
  const projects = await Project.find().select(["-__v", "+_id"]);
  try {
    projects.length > 0
      ? res.send(projects)
      : res.status(200).json({
          message: "Success retrieving data from the database.",
          success: true,
          count: projects.length,
          data: projects,
        });
  } catch (error) {
    error
      ? res.status(400).json({
          title: "No data found",
          success: false,
          count: projects.length,
          data: [{}],
        })
      : next();
  }
};

const getOneProject = async (req, res, next) => {};

const createProject = async (req, res, next) => {
  try {
    const newProject = req.body;
    const projectId = uuidv4();
    const projectWithId = new Project({ id: projectId, ...newProject });
    const project = await Project.create(projectWithId);

    res.status(200).json({
      success: true,
      message: "Project created successfully",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};

const updateProjectById = async (req, res, next) => {
  const { id: projectId } = req.params;

  try {
    const project = await Project.findOneAndUpdate(
      { _id: projectId },
      {
        $set: {
          name_of_contractor: req.body.name_of_contractor,
          contracting_company: req.body.contracting_company,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    project.save();

    res.status(200).json({
      msg: "Update success",
      success: true,
      data: project,
    });
  } catch (err) {
    console.log("FAILED TO UPDATE.", err);
  }
};

const deleteProjectById = async (req, res, next) => {
  const { id: projectId } = req.params;

  try {
    const delete_project = await Project.findByIdAndDelete({ _id: projectId });
    console.log(projectId);
  } catch (error) {
    res.status(404).json({
      message: "Project with the ID not found",
      success: false,
      project: {},
    });
  }
};

module.exports = {
  getAllProjects,
  getOneProject,
  createProject,
  updateProjectById,
  deleteProjectById,
};
