"use srrict";
const express = require("express");
const { check } = require("express-validator");

const {
  loginUser,
  deleteUserWithId,
  getUsers,
  getUserWithId,
  updateUserInfo,
} = require("../controllers/users.js");
const router = express.Router({ mergeParams: true, caseSensitive: false });

router.get("/users", getUsers);
router.post("/login", loginUser);

// router
//   .route("/:id")
router.get("/user", getUserWithId);
router.delete("/deleteuser", deleteUserWithId);
router.patch("/updateUser", updateUserInfo); //patch is used for partial update

module.exports = router;
