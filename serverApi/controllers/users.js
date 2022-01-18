"use strict";
const { v4: uuidv4 } = require("uuid");

const Users = require("../models/Users");
const asyncWrapper = require("../utils/asyncWrapper");

let users = [];

const getUsers = asyncWrapper(async (req, res, next) => {
  let users = await Users.find().select(["-username", "-password", "-active"]);

  users.length > 0
    ? res.send(users)
    : res.status(200).json({
        message: "Success retrieving data from the database.",
        success: true,
        count: users.length,
        data: users,
      });
});

const createUser = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = req.body;

  const newUserId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  const userWithID = new Users({ id: newUserId, ...user });

  users.push(userWithID);

  const newUser = await Users.create(userWithID);

  res.status(200).json({
    message: `New course with the id ${userWithID.id} was added to the database`,
    success: true,
    data: newUser,
  });
});

const loginUser = asyncWrapper(async (req, res, next) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return next("Please provide your USERNAME, PASSWORD and ROLE", 400);
  }

  const user = await Users.findOne({
    username: username,
    role: role,
    password: password,
  }).select(["-username", "-password", "-active"]);

  if (!user) {
    return next("INVALID USER. PLEASE CHECK YOUR DETAILS.", 401);
  } else {
    res.send("User successfully logged in");
    console.log("USER LOGIN SUCCESS\n", user);
  }
});

const getUserWithId = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  // const user = await Users.findById(req.params.id).select("-password");
  const user = await Users.findOne({ _id: userId }).select("-password");

  if (!user) {
    return res
      .status(404)
      .json({ message: `No user with the Id ${userId} was found.` });
  } else {
    res.status(200).json({
      message: "User found",
      user: user,
    });
  }
});

const deleteUserWithId = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  const user = await Users.findById({ _id: userId });
  console.log(userId);

  if (!user) {
    return next("There no such user with the Id provided.", 404);
  }
  await user.remove();

  res.send(`User with the id ${id} deleted from the database`);
});

const updateUserInfo = asyncWrapper(async (req, res, next) => {
  const { id: userId } = req.params;
  // let { username, password } = req.body;

  let userToUpdate = await Users.findById(req.params.id);

  userToUpdate = await Users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  userToUpdate.save();

  userToUpdate
    ? res.status(200).json({
        message: "User updated successfuly",
        success: true,
        newUserIfo: userToUpdate,
      })
    : null;
});

//Lock and Unlock user from accessing the system
const lockUnlockUser = async (req, res, next) => {
  const { _id } = req.params;
  const { active } = req.body;

  await Users.findOne(_id, (err, user) => {
    if (err) {
      return next("SERVER ERROR");
    }
    if (user && active) {
      res.send("USER LOCK SUCCESS.");
      user.active = false;
      console.log("User locked.");
      return;
    } else {
      res.send("User does not exist.");
      console.log("User not availble.");
    }
    return;
  });
};

module.exports = {
  getUsers,
  loginUser,
  getUserWithId,
  deleteUserWithId,
  updateUserInfo,
  lockUnlockUser,
};
