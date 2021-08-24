const loadUser = () => {
  let user = req.params.id;
  let loginState;
  if (user) {
    loginState = true;
  } else {
    loginState = false;
  }
};

module.exports = loadUser;
