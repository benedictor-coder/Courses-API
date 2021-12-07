const loadUser = (req, res, next) => {
  let user = req.params.id;
  let loginState;
  if (user) {
    loginState = true;
  } else {
    loginState = false;
  }
};

module.exports = loadUser;
