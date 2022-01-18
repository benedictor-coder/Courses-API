const errorHandler = (err, req, res, next) => {
  return res.status(500).json({
    msg: "There was an error",
    error: err,
  });
};
module.exports = errorHandler;
