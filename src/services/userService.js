const { User } = require("../models");

const getCurrentUser = (id) => {
  return User.findById(id);
};

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, {
    new: true,
  });
};

module.exports = {
  getCurrentUser,
  updateUser,
};
