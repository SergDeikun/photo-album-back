const { RequestError } = require("../../helpers");
const { Album } = require("../../models");

const service = require("../../services/photoService");

const removePhoto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await service.removePhoto(id);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    await Album.findByIdAndUpdate(
      { _id: id },
      { $push: { photo: result } },
      // { $pull: { photo: id } },

      {
        new: true,
      }
    );

    res.json({ message: "photo deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = removePhoto;
