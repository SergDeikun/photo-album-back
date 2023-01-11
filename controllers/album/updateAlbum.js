const { RequestError } = require("../../helpers");
const uploadBackground = require("../../middlewares/cloudinary");
const service = require("../../services/albumService");

// const service = require("../../services/fotoAlbum");

const updateAlbum = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
    const { id } = req.params;
    const { name } = req.body;
    let background = null;

    if (!userId) {
      throw RequestError(404, "Not found");
    }

    if (req.file) {
      const file = req.file.buffer;
      const backgroundImg = await uploadBackground(file, "backgroundAlbum");
      background = backgroundImg.secure_url;
    } else {
      background = userId.backgroundURL;
    }

    const result = await service.updateAlbum(id, {
      name,
      backgroundURL: background,
    });

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = updateAlbum;
