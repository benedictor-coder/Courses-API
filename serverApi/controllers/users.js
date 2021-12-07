"use strict";
const { v4: uuidv4 } = require("uuid");

const Users = require("../models/Users");

let users = [];

const getUsers = async (req, res, next) => {
  let users = await Users.find();
  try {
    results(
      users.length > 0
        ? res.send(users)
        : res.status(200).json({
            message: "Success retrieving data from the database.",
            success: true,
            count: users.length,
            data: users,
          })
    );
  } catch (error) {
    errorClause(
      error
        ? res.status(400).json({
            title: "No data found",
            success: false,
            count: users.length,
            data: [{}],
          })
        : next()
    );
  }
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
    errorClause(
      error
        ? res.status(400).json({
            title: "ERROR",
            success: false,
            message: "Could not creat course in the database",
          })
        : null
    );
    console.error("There was an error creating data to the database.", error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
      return next("Please provide your USERNAME, PASSWORD and ROLE", 400);
    }
    // await Users.findOne({ username: username, role: role }, (err, user) => {
    //   if (user) {
    //     if (password === user.password) {
    //       console.log("Login Successful", user);
    //     } else {
    //       console.log("WRONG CREDENTIALS");
    //     }
    //   } else {
    //     console.log("PLEASE REGISTER AS A NEW USER.");
    //   }
    // });

    const user = await Users.findOne({
      username: username,
      role: role,
      password: password,
    });

    if (!user) {
      return next("INVALID USER. PLEASE CHECK YOUR DETAILS.", 401);
    } else {
      res.send("user successfully logged in");
      console.log("USER LOGIN SUCCESS", user);
    }
  } catch (err) {
    console.error(err, "\nCOULD NOT GET THIS USER.");
  }
};

const getUserWithId = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const findUser = await Users.findById(req.params.id);

    if (findUser) {
      results(
        findUser
          ? res.status(200).json({
              message: "User found",
              success: true,
              user: findUser,
            })
          : null
      );
      return;
    }
  } catch (error) {
    errorClause(
      error
        ? res.status(404).json({
            title: "No user with id found",
            sucess: false,
            user: {},
          })
        : null
    );
  }
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
    s;
  } catch (error) {
    errorClause(
      error
        ? res.status(404).json({
            title: "No course with id found",
            sucess: false,
            course: {},
          })
        : null
    );
  }
};

const updateUserInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    let { course, duration, tuition, approval, school, department } = req.body;

    let courseToUpdate = await Course.findById(req.params.id);
    courseToUpdate = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    courseToUpdate.save();

    results(
      courseToUpdate
        ? res.status(200).json({
            message: "Course has been updated successfully",
            success: true,
            newIfo: courseToUpdate,
          })
        : null
    );
  } catch (error) {
    errorClause(
      error
        ? res.status(404).json({
            title: "Could not update course with the id",
            success: false,
          })
        : null
    );
  }
};

//cross-check retrieved database feedback
function results(results) {
  if (results) {
    return results;
  }
  return;
}
//catch errors on data retrieval
function errorClause(error) {
  if (error) {
    return error;
  }
  return;
}

module.exports = {
  getUsers,
  loginUser,
  getUserWithId,
  deleteUserWithId,
  updateUserInfo,
};
