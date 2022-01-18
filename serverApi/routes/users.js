"use srrict";
const express = require("express");
const { check } = require("express-validator");

const {
  loginUser,
  deleteUserWithId,
  getUsers,
  getUserWithId,
  updateUserInfo,
  lockUnlockUser,
} = require("../controllers/users.js");
const router = express.Router({ mergeParams: true, caseSensitive: false });

router.get("/users", getUsers);
router.post("/login", loginUser);

// router
//   .route("/:id")
router.get("/user/:id", getUserWithId);
router.get("/user/status/:id", lockUnlockUser);
router.delete("/user/:id", deleteUserWithId);
router.patch("/users/:id", updateUserInfo); //patch is used for partial update

module.exports = router;
