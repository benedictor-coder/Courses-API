"use strict";
const { v4: uuidv4 } = require("uuid");
const asyncWrapper = require("../utils/asyncWrapper");
const Analysis = require("../models/Analysis");

// Create analysis data
const createAnalysis = asyncWrapper(async (req, res, next) => {
  const analysis = req.body;
  const analysisId = uuidv4();

  const newAnalysis = new Analysis({ id: analysisId, ...analysis });
  const createNewAnalysis = await Analysis.create(newAnalysis);

  res.status(201).json({
    message: `New analysis with id: ${analysisId} has been created.`,
    success: true,
    data: createNewAnalysis,
  });
});

// Get analysis data
const getAnalyses = asyncWrapper(async (req, res, next) => {
  const analyses = await Analysis.find().select("-__v");

  res.send(analyses);
  res.status(200).json({
    message: "Success getting analyses",
    data: analyses,
  });
});

module.exports = {
  createAnalysis,
  getAnalyses,
};
