const { v4: uuidv4 } = require("uuid");
// const { findByIdAndUpdate } = require("../models/Users");
const Course = require("../models/Users");

let courses = [];

const getUsers = async (req, res, next) => {
  await Course.find()
    .then((results) => {
      if (results.length > 0) {
        res.send(results);

        res.status(200).json({
          message: "Success retrieving data from the database.",
          success: true,
          count: results.length,
          data: results,
        });
      }
    })
    .catch((error) => {
      if (error) {
        res.status(404).json({
          title: "No data found",
          success: false,
          count: results.length,
          data: [{}],
        });

        next(error);
      }
    });
};

const createUser = async (req, res, next) => {
  try {
    const course = req.body;

    const courseId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const courseWithId = new Course({ id: courseId, ...course });

    courses.push(courseWithId);

    const newCourse = await Course.create(courseWithId);

    res.status(200).json({
      message: `New course with the id ${courseWithId.id} was added to the database`,
      success: true,
      data: newCourse,
    });
  } catch (error) {
    if (error) {
      res.status(400).json({
        title: "ERROR",
        success: false,
        message: "Could not creat course in the database",
      });
    }
    console.error("There was an error creating data to the database.", error);
  } finally {
    return next();
  }
};

const getUserWithId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const foundCourse = await Course.findById(req.params.id);

    if (foundCourse) {
      res.status(200).json({
        message: "Course found",
        success: true,
        course: foundCourse,
      });
    }
  } catch (error) {
    res.status(404).json({
      title: "No course with id found",
      sucess: false,
      course: {},
    });
  }
  next(error);
};

const deleteUserWithId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(req.params.id);
    console.log(id);

    coursesList = courses.filter((course) => course.id !== id);
    console.log(coursesList);

    if (coursesList && !course) {
      return next("There no such course with the Id provided.", 404);
    }
    await course.remove();

    res.send(`Course with the id ${id} deleted from the database`);
  } catch (error) {
    next(error);
  }
};

const updateUserInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    let { course, duration, tuition, approval, school, department } = req.body;

    let theCourse = await Course.findById(req.params.id);
    theCourse = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    theCourse.save();

    res.status(200).json({
      message: "Course has been updated successfully",
      success: true,
      newIfo: theCourse,
    });
  } catch (error) {
    res.status(404).json({
      title: "Could not update course with the id",
      success: false,
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  getUserWithId,
  deleteUserWithId,
  updateUserInfo,
};
