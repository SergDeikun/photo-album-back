const { User } = require("../models");

const getCurrentUser = (id) => {
  return User.findById(id);
};

module.exports = {
  getCurrentUser,
};
