const { User } = require("../models");

const getCurrentUser = (id) => {
  return User.findById(id);
};

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const logoutUser = (id) => {
  return User.findByIdAndUpdate(id, { token: null });
};

module.exports = {
  getCurrentUser,
  updateUser,
  logoutUser,
};
