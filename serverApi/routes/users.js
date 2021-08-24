const express = require("express");
const { check } = require("express-validator");
const cors = require("cors");
const {
  createUser,
  deleteUserWithId,
  getUsers,
  getUserWithId,
  updateUserInfo,
} = require("../controllers/users.js");
const router = express.Router({ mergeParams: true, caseSensitive: false });

router
  .route("/")
  .get(getUsers)
  .post(
    [
      check("course")
        .isLength({ min: 3 })
        .withMessage("Course can not be less than 3 xters long."),
      check("course")
        .isString()
        .trim()
        .withMessage("Course can not be a number."),
      check("duration").isString().trim(),
      check("tuition").isNumeric().trim().escape().toInt(),
      check("approval").isString().trim(),
      check("school").isString().trim(),
      check("department").isString().trim(),
      check("date").isDate(),
      check("intake").isString().trim(),
      check("campus").isString().trim(),
    ],
    createUser
  );

router
  .route("/:id")
  .get(getUserWithId)
  .delete(deleteUserWithId)
  .patch(updateUserInfo); //patch is used for partial update

module.exports = router;
