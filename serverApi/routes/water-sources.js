"use srrict";
const express = require("express");
const { check } = require("express-validator");
const cors = require("cors");
const {
  getAllWaterSources,
  createWaterSource,
  getWaterSourceWithId,
  deleteWaterSourceWithId,
  updateWaterSource,
} = require("../controllers/water-sources.js");
const router = express.Router({ mergeParams: true, caseSensitive: false });

router
  .route("/")
  .get(getAllWaterSources)
  .post(
    [
      check("source")
        .isLength({ min: 3 })
        .withMessage("Course can not be less than 3 xters long."),
      check("source")
        .isString()
        .trim()
        .withMessage("Course can not be a number."),
      check("region").isString().trim(),
      check("cost").isNumeric().trim().escape().toInt(),
      check("approval").isString().trim(),
      check("county").isString().trim(),
      check("sub_county").isString().trim(),
      check("date").isDate(),
      check("ward").isString().trim(),
      check("location").isString().trim(),
    ],
    createWaterSource
  );

router
  .route("/:id")
  .get(getWaterSourceWithId)
  .delete(deleteWaterSourceWithId)
  .patch(updateWaterSource); //patch is used for partial update

module.exports = router;
