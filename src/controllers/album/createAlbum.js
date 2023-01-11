const { User } = require("../../models");
const { RequestError } = require("../../helpers");
const service = require("../../services/albumService");
const uploadBackground = require("../../middlewares/cloudinary");

const createAlbum = async (req, res, next) => {
  try {
    const { _id: userId } = req.user;
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

    const newAlbum = await service.addAlbum({
      ...req.body,
      userId,
      backgroundURL: background,
    });

    // TODO: замінити на service
    await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { myAlbums: newAlbum } },
      {
        new: true,
      }
    );

    res.json(newAlbum);
  } catch (error) {
    next(error);
  }
};

module.exports = createAlbum;
