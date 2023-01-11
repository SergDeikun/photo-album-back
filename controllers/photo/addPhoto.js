const { RequestError } = require("../../helpers");
const { Album } = require("../../models");
const service = require("../../services/photoService");
const uploadPhoto = require("../../middlewares/cloudinary");

const addPhoto = async (req, res, next) => {
  try {
    const { id: albumId } = req.params;
    let photo = null;

    if (!albumId) {
      throw RequestError(404, "Not found");
    }

    if (req.file) {
      const file = req.file.buffer;
      const uploadingPhoto = await uploadPhoto(file, "photo");
      photo = uploadingPhoto.secure_url;
    } else {
      photo = albumId.photoURL;
    }

    const newPhoto = await service.addPhoto({
      ...req.body,
      albumId,
      photoURL: photo,
    });

    await Album.findByIdAndUpdate(
      { _id: albumId },
      { $push: { photo: newPhoto } },
      {
        new: true,
      }
    );

    res.json(newPhoto);
  } catch (error) {
    next(error);
  }
};

module.exports = addPhoto;
