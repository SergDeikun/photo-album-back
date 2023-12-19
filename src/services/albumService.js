const { Album } = require("../models");

const addAlbum = (data) => {
  return Album.create(data);
};

const updateAlbum = (id, data) => {
  return Album.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const getAlbum = (id) => {
  return Album.findById(id);
};

const removeAlbum = (id) => {
  return Album.findByIdAndRemove(id);
};

module.exports = {
  addAlbum,
  updateAlbum,
  getAlbum,
  removeAlbum,
};
