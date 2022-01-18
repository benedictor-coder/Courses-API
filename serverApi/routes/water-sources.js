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
        .withMessage("Water source can not be less than 3 characters long."),
      check("source")
        .isString()
        .trim()
        .withMessage("Water source can not be a number."),
      check("source_type")
        .isString()
        .trim()
        .withMessage(
          "The type of water source can not be less than 3 characters long."
        ),
      check("region").isString().trim(),
      check("cost").isNumeric().trim().escape().toInt(),
      check("approval").isString().trim(),
      check("county").isString().trim(),
      check("sub_county").isString().trim(),
      check("date").isDate(),
      check("ward").isString().trim(),
      check("location").isString().trim(),
      check("water_level").isString().trim(),
      check("ph").isString().trim(),
    ],
    createWaterSource
  );

router.get("/source/:id", getWaterSourceWithId);
router.delete("/source/:id", deleteWaterSourceWithId);
router.patch("/source/:id", updateWaterSource); //patch is used for partial update

module.exports = router;
