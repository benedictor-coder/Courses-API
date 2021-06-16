const express = require('express');
const cors = require('cors');
const {
    createUser,
    deleteUserWithId,
    getUsers,
    getUserWithId,
    updateUserInfo
} = require('../controllers/users.js');
const router = express.Router({ mergeParams: true });

router
    .route('/', cors())
    .get(getUsers)
    .post(createUser)

router
    .route('/:id')
    .get(getUserWithId)
    .delete(deleteUserWithId)
    .patch(updateUserInfo)//patch is used for partial update

module.exports = router;