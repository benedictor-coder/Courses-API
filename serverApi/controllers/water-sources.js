"use strict";
const { v4: uuidv4 } = require("uuid");
// const { findByIdAndUpdate } = require("../models/Users");
const WaterSource = require("../models/WaterSources");

let waterSources = [];

const getAllWaterSources = async (req, res, next) => {
  let results = await WaterSource.find();
  try {
    results(
      results.length > 0
        ? res.send(results)
        : res.status(200).json({
            message: "Success retrieving data from the database.",
            success: true,
            count: results.length,
            data: results,
          })
    );
  } catch (error) {
    errorClause(
      error
        ? res.status(400).json({
            title: "No data found",
            success: false,
            count: results.length,
            data: [{}],
          })
        : next()
    );
  }
};

const createWaterSource = async (req, res, next) => {
  try {
    const source = req.body;

    const sourceId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    const waterSourceWithId = new WaterSource({ id: sourceId, ...source });

    waterSources.push(waterSourceWithId);

    const newWaterSource = await WaterSource.create(waterSourceWithId);

    res.status(200).json({
      message: `New water source with the id ${waterSourceWithId.id} was added to the database`,
      success: true,
      data: newWaterSource,
    });
  } catch (error) {
    errorClause(
      error
        ? res.status(400).json({
            title: "ERROR",
            success: false,
            message: "Could not creat water source in the database",
          })
        : null
    );
    console.error(
      "There was an error creating water source data to the database.",
      error
    );
  }
};

const getWaterSourceWithId = async (req, res, next) => {
  try {
    const { _id, source, cost, approval } = req.params;
    // const foundSourse = await WaterSource.findById(req.params.id);
    const foundSourse = await WaterSource.findOne();
    if (foundSourse) {
      results(
        foundSourse
          ? res.status(200).json({
              message: "Water source found",
              success: true,
              waterSource: foundSourse,
            })
          : null
      );
    } else {
      errorClause(
        !foundSourse
          ? res.status(404).json({
              title: "No water source with id found",
              sucess: false,
              waterSource: {},
            })
          : null
      );
    }
  } catch (error) {
    console.error(err, "Could not get source data.");
  }
};

const deleteWaterSourceWithId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const water_source_to_delete = await WaterSource.findById(req.params.id);
    console.log(id);

    //sourcesList = waterSources.filter((source) => source.id !== id);
    // console.log(sourcesList);

    if (!water_source_to_delete) {
      return next("There no such water source with the Id provided.", 404);
    } else {
      await water_source_to_delete.remove();
    }
  } catch (error) {
    errorClause(
      error
        ? res.status(404).json({
            title: "No water source with id found",
            sucess: false,
            waterSource: {},
          })
        : null
    );
  }
};

const updateWaterSource = async (req, res, next) => {
  const { id } = req.params;
  try {
    let {
      _id,
      date,
      source,
      region,
      cost,
      approval,
      county,
      sub_county,
      ward,
      location,
    } = req.body;

    let updateWaterSource = await WaterSource.findById(req.params.id);
    updateWaterSource = await WaterSource.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    updateWaterSource.save();

    results(
      updateWaterSource
        ? res.status(200).json({
            message: "Water source has been updated successfully",
            success: true,
            newIfo: updateWaterSource,
          })
        : null
    );
  } catch (error) {
    errorClause(
      error
        ? res.status(404).json({
            title: "Could not update water source with the id",
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
  getAllWaterSources,
  createWaterSource,
  getWaterSourceWithId,
  deleteWaterSourceWithId,
  updateWaterSource,
};
