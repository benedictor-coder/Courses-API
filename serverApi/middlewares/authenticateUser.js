const requiredAuthentication = (...users) => {
  return (req, res, next) => {
    if (!users.includes(req.user.id)) {
      res.status(403).send("Not authorized to access site");
      return next(
        Error.captureStackTrace(
          403,
          "This user is not allowed to access this page/route"
        )
      );
    }
    next();
  };
};

module.exports = requiredAuthentication;
