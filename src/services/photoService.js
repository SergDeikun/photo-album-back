const { Photo } = require("../models");

const addPhoto = (data) => {
  return Photo.create(data);
};

const getPhoto = (id) => {
  return Photo.findById(id);
};

const updatePhoto = (id, data) => {
  return Photo.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const removePhoto = (id) => {
  return Photo.findByIdAndRemove(id);
};

module.exports = { addPhoto, getPhoto, updatePhoto, removePhoto };
