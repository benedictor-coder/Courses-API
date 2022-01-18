"use strict";
const { v4: uuidv4 } = require("uuid");
const Sample = require("../models/Sampling");
const asyncWrapper = require("../utils/asyncWrapper");

// Create sample data
const createWaterSample = asyncWrapper(async (req, res, next) => {
  const sample = req.body;
  const sampleId = uuidv4();

  const newSample = new Sample({ id: sampleId, ...sample });
  const createNewSample = await Sample.create(newSample);

  res.status(201).json({
    message: `New water sample with id: ${sampleId} has been created`,
    success: true,
    data: createNewSample,
  });
});

// Get all water samples
const getSamples = asyncWrapper(async (req, res, next) => {
  const samples = await Sample.find().select("-__v");

  res.send(samples);
  res.status(200).json({
    message: "Request success",
    data: samples,
  });
});

module.exports = {
  createWaterSample,
  getSamples,
};
