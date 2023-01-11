const { User } = require("../models");

const addUser = ({ name, email, password }) => {
  return User.create({ name, email, password });
};

const findUser = (email) => {
  return User.findOne({ email });
};

const loginUser = (id, token) => {
  return User.findByIdAndUpdate(id, { token });
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
  addUser,
  findUser,
  loginUser,
  updateUser,
  logoutUser,
};
